
const API_BASE = process.env.VITE_API_GATEWAY_URL || 'https://your-api-gateway.com/api';

class AgentService {
  async deployAgents(selectedAgents, config = {}) {
    try {
      console.log('Deploying agents to backend:', selectedAgents);
      
      const response = await fetch(`${API_BASE}/agents/deploy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          agents: selectedAgents,
          config: {
            environment: config.environment || 'production',
            notifications: config.notifications || true,
            integrations: config.integrations || [],
            ...config
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Deployment failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Agent deployment error:', error);
      throw error;
    }
  }

  async getAgentStatus(agentId) {
    try {
      const response = await fetch(`${API_BASE}/agents/${agentId}/status`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get agent status: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get agent status error:', error);
      throw error;
    }
  }

  async configureIntegrations(agentId, integrations) {
    try {
      const response = await fetch(`${API_BASE}/agents/${agentId}/integrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ integrations })
      });

      if (!response.ok) {
        throw new Error(`Integration config failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Integration configuration error:', error);
      throw error;
    }
  }

  async getAgentMetrics(agentId, timeRange = '24h') {
    try {
      const response = await fetch(`${API_BASE}/agents/${agentId}/metrics?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get metrics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get metrics error:', error);
      throw error;
    }
  }

  getAuthToken() {
    return localStorage.getItem('authToken') || 'demo-token';
  }
}

export const agentService = new AgentService();
