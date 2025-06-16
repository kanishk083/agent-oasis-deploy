
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AgentGrid from "@/components/AgentGrid";

const SelectAgents = () => {
  const navigate = useNavigate();
  const [selectedAgents, setSelectedAgents] = useState([]);

  const handleAgentSelect = (agent) => {
    setSelectedAgents(prev => {
      const isSelected = prev.find(a => a.id === agent.id);
      if (isSelected) {
        return prev.filter(a => a.id !== agent.id);
      } else {
        return [...prev, agent];
      }
    });
  };

  const handleDeploy = () => {
    // Store selected agents in localStorage for the success page
    localStorage.setItem('selectedAgents', JSON.stringify(selectedAgents));
    navigate('/deploy-success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-6 hover:bg-white/50 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> AI Agents</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the AI agents that best fit your business needs. You can deploy multiple agents and configure them later.
            </p>
          </div>

          {/* Agent Grid */}
          <AgentGrid
            selectedAgents={selectedAgents}
            onAgentSelect={handleAgentSelect}
          />

          {/* Deploy Button */}
          {selectedAgents.length > 0 && (
            <div className="text-center mt-12 animate-fade-in">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-lg">
                <p className="text-gray-700 mb-4">
                  {selectedAgents.length} agent{selectedAgents.length > 1 ? 's' : ''} selected
                </p>
                <Button
                  onClick={handleDeploy}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Deploy Selected Agents
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectAgents;
