
import { Button } from '../components/ui/button';
import TypingAnimation from "../components/ui/TypingAnimation";
import ChatPreview from '../components/ui/ChatPreview';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-[90vh] bg-transparent">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:mx-36">
          <div className="space-y-8 ">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                <TypingAnimation 
                  text="AI that Listens." 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                />
              </h1>
              <p className="text-xl text-shadow-white leading-relaxed max-w-lg">
                Experience conversations that feel natural, intelligent, and genuinely helpful. 
                Your AI companion is ready to chat about anything, anytime.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
                onClick={()=>navigate("/signup")}
              >
                Start Chatting
              </Button>
            </div>
            
            
          </div>
          
          <div className="relative">
            <div className="absolute inset-0  rounded-3xl blur-3xl opacity-20 animate-spin"></div>
            <div className="relative">
              <ChatPreview />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;