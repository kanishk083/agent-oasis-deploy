
import { useState, useEffect, useRef } from 'react';

export const useAgentStatus = () => {
  const [agentStatuses, setAgentStatuses] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // WebSocket connection for real-time agent status
    const connectWebSocket = () => {
      try {
        ws.current = new WebSocket('wss://your-api-gateway/agents/status');
        
        ws.current.onopen = () => {
          console.log('WebSocket connected for agent status');
          setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log('Agent status update:', data);
          
          setAgentStatuses(prev => ({
            ...prev,
            [data.agentId]: {
              status: data.status,
              progress: data.progress,
              metrics: data.metrics,
              lastUpdated: new Date().toISOString()
            }
          }));
        };

        ws.current.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          // Reconnect after 3 seconds
          setTimeout(connectWebSocket, 3000);
        };

        ws.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        console.error('Failed to connect WebSocket:', error);
      }
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const subscribeToAgent = (agentId) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: 'subscribe',
        agentId: agentId
      }));
    }
  };

  const unsubscribeFromAgent = (agentId) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: 'unsubscribe',
        agentId: agentId
      }));
    }
  };

  return {
    agentStatuses,
    isConnected,
    subscribeToAgent,
    unsubscribeFromAgent
  };
};
