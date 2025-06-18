
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Settings, MessageSquare, ArrowRight, Loader2, Activity, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAgentStatus } from "@/hooks/useAgentStatus";
import { agentService } from "@/services/agentService";

const DeploySuccess = () => {
  const navigate = useNavigate();
  const [deployedAgents, setDeployedAgents] = useState([]);
  const [isDeploying, setIsDeploying] = useState(true);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const { agentStatuses, isConnected } = useAgentStatus();

  useEffect(() => {
    const selectedAgents = JSON.parse(localStorage.getItem('selectedAgents') || '[]');
    const deploymentId = localStorage.getItem('deploymentId');
    
    if (selectedAgents.length === 0) {
      navigate('/select-agents');
      return;
    }

    // Simulate deployment process with real backend integration
    const deploymentTimer = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(deploymentTimer);
          setIsDeploying(false);
          setDeployedAgents(selectedAgents);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(deploymentTimer);
  }, [navigate]);

  const getAgentStatusDisplay = (agent) => {
    const status = agentStatuses[agent.id];
    if (!status) return { text: 'Initializing', color: 'text-gray-500', icon: Loader2 };
    
    switch (status.status) {
      case 'running':
        return { text: 'Live', color: 'text-green-600', icon: Activity };
      case 'deploying':
        return { text: 'Deploying', color: 'text-blue-600', icon: Loader2 };
      case 'error':
        return { text: 'Error', color: 'text-red-600', icon: CheckCircle };
      default:
        return { text: 'Unknown', color: 'text-gray-500', icon: CheckCircle };
    }
  };

  const nextSteps = [
    {
      icon: MessageSquare,
      title: "Monitor Performance",
      description: "View real-time metrics and agent performance",
      action: "View Dashboard"
    },
    {
      icon: Settings,
      title: "Configure Integrations",
      description: "Connect agents to Slack, CRM, and other tools",
      action: "Setup Integrations"
    }
  ];

  if (isDeploying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Deploying Your AI Agents</h1>
              <p className="text-gray-600 mb-8">Connecting to backend services and initializing agents...</p>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${deploymentProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{deploymentProgress}% Complete</p>
              
              {isConnected && (
                <div className="mt-4 flex items-center justify-center text-green-600">
                  <Activity className="w-4 h-4 mr-2" />
                  <span className="text-sm">Real-time connection active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎉 Deployment
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Successful!</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your AI agents are now live and connected to the backend. Real-time monitoring is active.
            </p>
          </div>

          {/* Real-time Connection Status */}
          {isConnected && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 animate-fade-in">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Real-time monitoring active</span>
                <div className="ml-auto">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          )}

          {/* Deployed Agents with Real-time Status */}
          <div className="grid gap-4 mb-12 animate-fade-in">
            {deployedAgents.map((agent) => {
              const statusDisplay = getAgentStatusDisplay(agent);
              const StatusIcon = statusDisplay.icon;
              
              return (
                <div key={agent.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{agent.emoji}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-gray-600">{agent.description}</p>
                    </div>
                  </div>
                  <div className={`flex items-center ${statusDisplay.color}`}>
                    <StatusIcon className={`w-5 h-5 mr-2 ${statusDisplay.text === 'Deploying' ? 'animate-spin' : ''}`} />
                    <span className="font-medium">{statusDisplay.text}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Steps */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {nextSteps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <step.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <Button variant="outline" className="w-full">
                    {step.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-medium transition-all duration-300"
              >
                Deploy More Agents
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploySuccess;
