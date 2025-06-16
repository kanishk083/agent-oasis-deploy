
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

const AgentCard = ({ agent, isSelected, onSelect }) => {
  return (
    <div className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-2 group ${
      isSelected 
        ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 shadow-cyan-500/20' 
        : 'border-white/10 hover:border-white/30'
    }`}>
      
      {/* Glowing background effect for selected cards */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
      )}
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-6 right-6 z-10">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-2 shadow-lg animate-pulse">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
      
      {/* Agent Icon */}
      <div className="text-center mb-8 relative z-10">
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
          {agent.emoji}
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-gray-200 mb-4 group-hover:bg-white/20 transition-all duration-300">
          <Sparkles className="w-3 h-3 mr-2" />
          {agent.category}
        </div>
      </div>

      {/* Agent Info */}
      <div className="text-center mb-8 relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
          {agent.name}
        </h3>
        <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
          {agent.description}
        </p>
      </div>

      {/* Deploy Button */}
      <Button
        onClick={onSelect}
        className={`w-full transition-all duration-300 relative z-10 font-bold py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 ${
          isSelected
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-2 border-cyan-400/30'
            : 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-white/40 backdrop-blur-md'
        }`}
        variant={isSelected ? "default" : "secondary"}
      >
        {isSelected ? (
          <span className="flex items-center justify-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Selected
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Select Agent
          </span>
        )}
      </Button>
    </div>
  );
};

export default AgentCard;
