
import { Button } from "@/components/ui/button";
import { CheckCircle, Activity, Zap, AlertCircle } from "lucide-react";
import { useAgentStatus } from "@/hooks/useAgentStatus";
import { useEffect } from "react";

const AgentCard = ({ agent, isSelected, onSelect }) => {
  const { agentStatuses, subscribeToAgent, unsubscribeFromAgent } = useAgentStatus();
  const agentStatus = agentStatuses[agent.id];

  useEffect(() => {
    if (isSelected) {
      subscribeToAgent(agent.id);
    } else {
      unsubscribeFromAgent(agent.id);
    }

    return () => {
      unsubscribeFromAgent(agent.id);
    };
  }, [isSelected, agent.id, subscribeToAgent, unsubscribeFromAgent]);

  const getStatusIcon = () => {
    if (!agentStatus) return null;
    
    switch (agentStatus.status) {
      case 'running':
        return <Activity className="w-4 h-4 text-green-500 animate-pulse" />;
      case 'deploying':
        return <Zap className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    if (!agentStatus) return null;
    
    return (
      <div className="text-xs text-gray-500 mt-1">
        Status: {agentStatus.status} 
        {agentStatus.progress && ` (${agentStatus.progress}%)`}
      </div>
    );
  };

  return (
    <div className={`relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
      isSelected ? 'border-blue-500 bg-blue-50/50' : 'border-transparent hover:border-gray-200'
    }`}>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <CheckCircle className="w-6 h-6 text-blue-600" />
        </div>
      )}

      {/* Real-time Status Indicator */}
      {agentStatus && (
        <div className="absolute top-4 left-4 flex items-center">
          {getStatusIcon()}
        </div>
      )}
      
      {/* Agent Icon */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">{agent.emoji}</div>
        <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 mb-3">
          {agent.category}
        </div>
      </div>

      {/* Agent Info */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>
        <p className="text-gray-600 leading-relaxed">{agent.description}</p>
        {getStatusText()}
      </div>

      {/* Deploy Button */}
      <Button
        onClick={onSelect}
        className={`w-full transition-all duration-300 ${
          isSelected
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
        }`}
        variant={isSelected ? "default" : "secondary"}
      >
        {isSelected ? 'Selected' : 'Select Agent'}
      </Button>
    </div>
  );
};

export default AgentCard;
