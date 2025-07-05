import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  className?: string;
}

const TypingAnimation = ({ text, className = "" }: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span className={`inline-block w-0.5 h-6 bg-blue-500 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
    </span>
  );
};

export default TypingAnimation;
