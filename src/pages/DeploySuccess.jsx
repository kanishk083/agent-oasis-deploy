
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Home, Settings, ExternalLink, Sparkles, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

const DeploySuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const selectedAgents = location.state?.selectedAgents || [];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (selectedAgents.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">No agents selected</h1>
          <Button onClick={() => navigate('/select-agents')} className="bg-gradient-to-r from-cyan-500 to-purple-500">
            Select Agents
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                ['bg-cyan-400', 'bg-purple-400', 'bg-pink-400', 'bg-yellow-400'][Math.floor(Math.random() * 4)]
              }`}></div>
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-12 shadow-2xl animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>

          {/* Success Message */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              🎉 <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Success!</span>
            </h1>
            <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
              Your AI agents have been deployed successfully and are now ready to serve your business!
            </p>
          </div>

          {/* Deployed Agents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {selectedAgents.map((agent, index) => (
              <div 
                key={agent.id} 
                className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in group"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {agent.emoji}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                  {agent.name}
                </h3>
                <div className="inline-flex items-center px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-sm text-green-300 font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Active
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-white/40 px-8 py-4 text-lg font-bold rounded-2xl backdrop-blur-md transition-all duration-300 group"
            >
              <Home className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </Button>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <Settings className="mr-3 w-5 h-5 group-hover:rotate-90 transition-transform" />
              Manage Agents
            </Button>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <ExternalLink className="mr-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              View Dashboard
            </Button>
          </div>

          {/* Next Steps */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 border border-white/10 shadow-xl animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8 text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">What's Next?</h2>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-3" />
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="group">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Monitor Performance</h3>
                <p className="text-gray-300">Track your agents' performance and optimize their efficiency through our dashboard.</p>
              </div>
              <div className="group">
                <div className="text-2xl mb-3">🔗</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">Connect Integrations</h3>
                <p className="text-gray-300">Link your agents to existing tools and platforms for seamless workflows.</p>
              </div>
              <div className="group">
                <div className="text-2xl mb-3">📈</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">Scale Your Team</h3>
                <p className="text-gray-300">Add more agents as your business grows and automate even more processes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploySuccess;
