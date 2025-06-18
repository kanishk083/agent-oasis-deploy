
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import AgentGrid from "@/components/AgentGrid";
import DeploymentConfig from "@/components/DeploymentConfig";
import { agentService } from "@/services/agentService";

const SelectAgents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [showConfig, setShowConfig] = useState(false);
  const [deploymentConfig, setDeploymentConfig] = useState({
    environment: 'production',
    notifications: true,
    integrations: []
  });
  const [isDeploying, setIsDeploying] = useState(false);

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

  const handleDeploy = async () => {
    if (selectedAgents.length === 0) {
      toast({
        title: "No agents selected",
        description: "Please select at least one agent to deploy.",
        variant: "destructive"
      });
      return;
    }

    setIsDeploying(true);

    try {
      // Deploy agents using the backend service
      const deploymentResult = await agentService.deployAgents(selectedAgents, deploymentConfig);
      
      console.log('Deployment result:', deploymentResult);
      
      // Store deployment info for the success page
      localStorage.setItem('selectedAgents', JSON.stringify(selectedAgents));
      localStorage.setItem('deploymentId', deploymentResult.deploymentId);
      
      toast({
        title: "Deployment initiated",
        description: "Your agents are being deployed. You'll receive real-time updates.",
      });

      navigate('/deploy-success');
    } catch (error) {
      console.error('Deployment error:', error);
      toast({
        title: "Deployment failed",
        description: error.message || "Failed to deploy agents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(false);
    }
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
              Select the AI agents that best fit your business needs. Configure deployment settings and monitor real-time status.
            </p>
          </div>

          {/* Agent Grid */}
          <AgentGrid
            selectedAgents={selectedAgents}
            onAgentSelect={handleAgentSelect}
          />

          {/* Deployment Controls */}
          {selectedAgents.length > 0 && (
            <div className="text-center mt-12 animate-fade-in">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-lg">
                <p className="text-gray-700 mb-4">
                  {selectedAgents.length} agent{selectedAgents.length > 1 ? 's' : ''} selected
                </p>
                
                <div className="flex gap-3 mb-4">
                  <Button
                    onClick={() => setShowConfig(!showConfig)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>

                {showConfig && (
                  <DeploymentConfig
                    config={deploymentConfig}
                    onChange={setDeploymentConfig}
                  />
                )}

                <Button
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isDeploying ? 'Deploying...' : 'Deploy Selected Agents'}
                  {!isDeploying && <ArrowRight className="ml-2 w-5 h-5" />}
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
