
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Settings, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const DeploySuccess = () => {
  const navigate = useNavigate();
  const [deployedAgents, setDeployedAgents] = useState([]);
  const [isDeploying, setIsDeploying] = useState(true);
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  useEffect(() => {
    const selectedAgents = JSON.parse(localStorage.getItem('selectedAgents') || '[]');
    
    if (selectedAgents.length === 0) {
      navigate('/select-agents');
      return;
    }

    // Simulate deployment process
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

  const nextSteps = [
    {
      icon: MessageSquare,
      title: "Connect to Slack",
      description: "Integrate your agents with your team's workspace",
      action: "Connect"
    },
    {
      icon: Settings,
      title: "Configure Settings",
      description: "Customize your agents' behavior and responses",
      action: "Configure"
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
              <p className="text-gray-600 mb-8">Setting up your intelligent assistants...</p>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${deploymentProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{deploymentProgress}% Complete</p>
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
              Your AI agents are now live and ready to assist your team. Here's what was deployed:
            </p>
          </div>

          {/* Deployed Agents */}
          <div className="grid gap-4 mb-12 animate-fade-in">
            {deployedAgents.map((agent, index) => (
              <div key={agent.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{agent.emoji}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-gray-600">{agent.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Live</span>
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Next Steps</h2>
            
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
