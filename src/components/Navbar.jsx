
import { Button } from "@/components/ui/button";
import { Bot, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AgentOasis
            </span>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium hover:scale-105 transform">Features</a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium hover:scale-105 transform">Pricing</a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium hover:scale-105 transform">Docs</a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium hover:scale-105 transform">Support</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-white/10 transition-colors duration-300 border border-white/20 backdrop-blur-sm"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10 bg-white/5 backdrop-blur-lg rounded-b-2xl">
            <div className="flex flex-col space-y-6">
              <a href="#" className="text-gray-200 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300">Features</a>
              <a href="#" className="text-gray-200 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300">Pricing</a>
              <a href="#" className="text-gray-200 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300">Docs</a>
              <a href="#" className="text-gray-200 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300">Support</a>
              <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-white/20">
                <Button variant="ghost" className="justify-start text-gray-200 hover:text-white hover:bg-white/10">Sign In</Button>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
