
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const AgentCard = ({ agent, isSelected, onSelect }) => {
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
