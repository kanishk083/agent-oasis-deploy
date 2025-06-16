
import { Button } from "@/components/ui/button";
import { Bot, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AgentOasis</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Docs</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Support</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/90 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">Docs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">Support</a>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                <Button variant="ghost" className="justify-start">Sign In</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
