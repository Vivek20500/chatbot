import { useState, useEffect } from 'react';
import { Card } from "./card";

const ChatPreview = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Gemini. How can I help you today?", isAi: true, visible: false },
    { id: 2, text: "Can you help me plan a weekend trip?", isAi: false, visible: false },
    { id: 3, text: "I'd love to help! Where are you thinking of going? I can suggest activities, restaurants, and create a personalized itinerary for you.", isAi: true, visible: false }
  ]);

  useEffect(() => {
    messages.forEach((_, index) => {
      setTimeout(() => {
        setMessages(prev => 
          prev.map((msg, i) => 
            i === index ? { ...msg, visible: true } : msg
          )
        );
      }, (index + 1) * 1000);
    });
  }, []);

  return (
    <Card className="max-w-md mx-auto p-6  shadow-md">
      <div className="space-y-4">
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isAi ? 'justify-start' : 'justify-end'} ${
              message.visible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                message.isAi
                  ? 'bg-blue-100 text-gray-800 rounded-tl-md'
                  : 'bg-blue-500 text-white rounded-tr-md'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        <div className="flex items-center gap-2 pt-4 border-t border-blue-100">
          <div className="flex-1 h-10 bg-gray-100 rounded-full flex items-center px-4 text-gray-400 text-sm">
            Type your message...
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatPreview;
