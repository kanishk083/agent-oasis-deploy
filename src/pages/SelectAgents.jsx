
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles, Rocket, Users } from "lucide-react";
import AgentGrid from "@/components/AgentGrid";
import Navbar from "@/components/Navbar";

const SelectAgents = () => {
  const [selectedAgents, setSelectedAgents] = useState([]);
  const navigate = useNavigate();

  const handleAgentSelect = (agent) => {
    setSelectedAgents(prev => {
      const isAlreadySelected = prev.some(a => a.id === agent.id);
      if (isAlreadySelected) {
        return prev.filter(a => a.id !== agent.id);
      }
      return [...prev, agent];
    });
  };

  const handleDeploy = () => {
    if (selectedAgents.length > 0) {
      navigate('/deploy-success', { state: { selectedAgents } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium mb-8 shadow-lg">
            <Users className="w-4 h-4 mr-2" />
            Choose Your AI Team
            <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Select Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose from our collection of specialized AI agents. Each agent is designed to excel at specific tasks and can be deployed instantly.
          </p>

          {/* Selection Counter */}
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white">
            <span className="text-lg font-medium">
              {selectedAgents.length} agent{selectedAgents.length !== 1 ? 's' : ''} selected
            </span>
            {selectedAgents.length > 0 && (
              <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Agent Grid */}
        <div className="mb-16">
          <AgentGrid 
            selectedAgents={selectedAgents} 
            onAgentSelect={handleAgentSelect} 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
            className="border-2 border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white px-8 py-4 text-lg transition-all duration-300 hover:border-white/50 rounded-2xl group"
          >
            <ArrowLeft className="mr-3 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>

          <Button
            onClick={handleDeploy}
            disabled={selectedAgents.length === 0}
            size="lg"
            className={`px-12 py-4 text-xl font-bold transition-all duration-300 transform rounded-2xl shadow-2xl ${
              selectedAgents.length > 0
                ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white hover:scale-105 shadow-cyan-500/25 border-2 border-white/20'
                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed border-2 border-gray-600/30'
            }`}
          >
            <Rocket className="mr-3 w-6 h-6" />
            Deploy {selectedAgents.length} Agent{selectedAgents.length !== 1 ? 's' : ''}
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectAgents;
