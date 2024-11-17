import { useState, useEffect } from 'react';
import AnimatedLink from './AnimatedLink';

const AnimatedText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJ23847204";
  
  useEffect(() => {
    let iteration = 0;
    let interval;

    // Delay the start of animation if specified
    const timeoutId = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(current => 
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              // Preserve spaces and lowercase letters
              if (letter === " ") return " ";
              if (letter === letter.toLowerCase()) {
                return letters[Math.floor(Math.random() * 10)].toLowerCase();
              }
              return letters[Math.floor(Math.random() * 10)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1/3;
      }, 10);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span className="font-mono">{displayText}</span>;
};

const AnimatedHeader = () => {
  return (
    <div className="first-fold">
      <h1>
        <AnimatedText text="Top five books I read this year" />
      </h1>
      <h4>
        <AnimatedText 
          text="Because why the hell not?" 
          delay={1000} // Delay the second animation
        />
      </h4>
      <div className='first-fold-links'>
        <AnimatedLink 
          text="Made By Siddharth" 
          href="https://x.com/sidahuj"
      />
        <AnimatedLink 
          text="My Goodreads" 
          href="https://www.goodreads.com/review/list/100936934?shelf=read"

      />
      </div>
    </div>
  );
};

export default AnimatedHeader;