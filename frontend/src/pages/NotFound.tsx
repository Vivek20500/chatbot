import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[90vh] ">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 404 Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse w-32 h-32 mx-auto"></div>
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white-800">
              Oops! Page not found
            </h1>
            <p className="text-xl text-white-800 leading-relaxed">
              Looks like this page wandered off into the digital void. 
              Even our AI couldn't find it! 🤖
            </p>
            <p className="text-white">
              The page you're looking for at <code className="bg-gray-100 px-2 py-1 rounded text-sm text-black">{location.pathname}</code> doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/'}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Back to Home
              <span className="ml-2">🏠</span>
            </Button>
            
          </div>

        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 right-20 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-pulse delay-500"></div>
    </div>
  );
};

export default NotFound;