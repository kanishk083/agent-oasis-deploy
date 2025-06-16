
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Star, Users, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-400/30 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-indigo-400/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium mb-8 animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <Sparkles className="w-4 h-4 mr-2" />
            Deploy AI Agents in Minutes, Not Months
            <Star className="w-4 h-4 ml-2 text-yellow-400" />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight animate-fade-in">
            Your AI Agent
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse"> 
              Deployment
            </span>
            <span className="block text-5xl md:text-7xl">Platform</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in font-light">
            Transform your business with <span className="font-semibold text-cyan-300">intelligent AI agents</span>. 
            Deploy voice assistants, scheduling bots, and CRM helpers with just 
            <span className="font-bold text-purple-300"> 3-4 clicks</span>. No coding required.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-in">
            <Button 
              onClick={() => navigate('/select-agents')}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white px-12 py-6 text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 border-2 border-white/20 backdrop-blur-sm rounded-2xl group"
            >
              <Rocket className="mr-3 w-6 h-6 group-hover:animate-bounce" />
              Get Your AI Agents
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white px-12 py-6 text-xl transition-all duration-300 hover:border-white/50 rounded-2xl group"
            >
              <Users className="mr-3 w-6 h-6" />
              Watch Demo
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-in">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-4xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform">2M+</div>
              <div className="text-gray-300">AI Agents Deployed</div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-7xl mx-auto animate-fade-in">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-3 border border-white/10 group">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors">Lightning Fast Setup</h3>
            <p className="text-gray-300 leading-relaxed text-lg">Deploy production-ready AI agents in under 5 minutes. Our streamlined process eliminates complexity and gets you running instantly.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:-translate-y-3 border border-white/10 group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-green-300 transition-colors">Enterprise Security</h3>
            <p className="text-gray-300 leading-relaxed text-lg">Bank-level encryption and compliance standards ensure your data and AI agents are always protected with military-grade security.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-3 border border-white/10 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">Smart Integration</h3>
            <p className="text-gray-300 leading-relaxed text-lg">Seamlessly connect with your existing tools - Slack, CRM, calendars, and 500+ other platforms with zero configuration.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
