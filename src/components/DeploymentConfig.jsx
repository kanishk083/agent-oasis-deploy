
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slack, MessageSquare, Mail } from "lucide-react";

const DeploymentConfig = ({ config, onChange }) => {
  const availableIntegrations = [
    { id: 'slack', name: 'Slack', icon: Slack, description: 'Team notifications' },
    { id: 'teams', name: 'MS Teams', icon: MessageSquare, description: 'Team collaboration' },
    { id: 'email', name: 'Email', icon: Mail, description: 'Email notifications' }
  ];

  const updateConfig = (key, value) => {
    onChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleIntegration = (integrationId) => {
    const integrations = config.integrations || [];
    const isEnabled = integrations.includes(integrationId);
    
    if (isEnabled) {
      updateConfig('integrations', integrations.filter(id => id !== integrationId));
    } else {
      updateConfig('integrations', [...integrations, integrationId]);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg mb-4">
      <h3 className="font-semibold text-gray-900">Deployment Configuration</h3>
      
      {/* Environment Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Environment</label>
        <div className="flex gap-2">
          {['development', 'staging', 'production'].map(env => (
            <Button
              key={env}
              variant={config.environment === env ? "default" : "outline"}
              size="sm"
              onClick={() => updateConfig('environment', env)}
              className="capitalize"
            >
              {env}
            </Button>
          ))}
        </div>
      </div>

      {/* Notifications Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Real-time Notifications</label>
          <p className="text-xs text-gray-500">Receive deployment and status updates</p>
        </div>
        <Switch
          checked={config.notifications}
          onCheckedChange={(checked) => updateConfig('notifications', checked)}
        />
      </div>

      {/* Integrations */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Integrations</label>
        <div className="grid grid-cols-1 gap-2">
          {availableIntegrations.map(integration => (
            <div
              key={integration.id}
              className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
                config.integrations?.includes(integration.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleIntegration(integration.id)}
            >
              <div className="flex items-center space-x-2">
                <integration.icon className="w-4 h-4" />
                <div>
                  <span className="text-sm font-medium">{integration.name}</span>
                  <p className="text-xs text-gray-500">{integration.description}</p>
                </div>
              </div>
              {config.integrations?.includes(integration.id) && (
                <Badge variant="secondary" className="text-xs">Enabled</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeploymentConfig;
