import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";

const Head = () => {
  const staggeredFade = (delay) => ({
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.9, 
        delay, 
        ease: "easeOut" 
      }
    },
  });

  // Generate random bubbles
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      // Bubble color variations for professional look
      const bubbleColors = [
        "linear-gradient(135deg, rgba(236,252,253,0.9) 0%, rgba(207,237,245,0.7) 100%)",  // Light blue
        "linear-gradient(135deg, rgba(248,250,252,0.9) 0%, rgba(226,232,240,0.7) 100%)",  // Light gray
        "linear-gradient(135deg, rgba(236,253,245,0.9) 0%, rgba(209,250,229,0.7) 100%)",  // Light mint
        "linear-gradient(135deg, rgba(249,250,251,0.9) 0%, rgba(229,231,235,0.7) 100%)",  // Silver
        "linear-gradient(135deg, rgba(254,249,195,0.5) 0%, rgba(254,240,138,0.3) 100%)",  // Light gold
      ];
      
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 80 + 20, // Size between 20px and 100px
          left: Math.random() * 100, // Position percentage
          top: Math.random() * 100,
          delay: Math.random() * 20,
          duration: Math.random() * 15 + 15, // Animation duration between 15s and 30s
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
          borderColor: i % 3 === 0 ? "rgba(186,230,253,0.4)" : "rgba(243,244,246,0.6)"
        });
      }
      setBubbles(newBubbles);
    };
    
    generateBubbles();
  }, []);

  return (
    <motion.div 
      className="flex flex-col sm:flex-row min-h-screen items-center justify-center px-6 md:px-16 lg:px-24 bg-gradient-to-br from-gray-50 to-white text-gray-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced bubble effects */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full shadow-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            background: bubble.color,
            border: `1px solid ${bubble.borderColor}`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1, 0.9, 1],
            opacity: [0, 0.6, 0.7, 0.6, 0],
            y: [0, -20, -40, -60]
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 5,
          }}
        />
      ))}
      
      {/* Abstract design elements with refined colors */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-50 opacity-60" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-emerald-50 opacity-50" />
      
      {/* Refined slogan with modern typography and accent color */}
      <motion.div 
        className="absolute top-8 w-full text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h3 className="text-sm md:text-base text-gray-800 font-medium tracking-wider">
          <span className="font-semibold text-blue-800">RAISEREQUITAL</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="font-light">Where Ideas Meet Investors and Dreams Turn into Reality</span>
        </h3>
      </motion.div>

      {/* Left side content */}
      <div className="w-full flex flex-col items-center text-center sm:text-left sm:items-start z-10 mt-16 sm:mt-0">
        <motion.h1 
          variants={staggeredFade(0.4)} 
          initial="hidden" 
          animate="visible" 
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-gray-900"
        >
          Big Ideas
          <span className="block text-2xl md:text-3xl mt-2 text-emerald-600">need bold believers</span>
        </motion.h1>
        
        <motion.div 
          variants={staggeredFade(0.6)} 
          initial="hidden" 
          animate="visible" 
          className="mt-10"
        >
          <Link 
            to="/Entrepreneur/Details" 
            className="group relative inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 text-lg font-medium rounded border-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"  
          >
            <span className="relative z-10">Entrepreneur</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>  
            <FiArrowRight className="ml-3 w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Right side content */}
      <div className="w-full flex flex-col items-center text-center sm:text-right sm:items-end z-10 mt-16 sm:mt-0">
        <motion.h1 
          variants={staggeredFade(0.8)} 
          initial="hidden" 
          animate="visible" 
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-gray-900"
        >
          Discover
          <span className="block text-3xl md:text-4xl mt-4 text-emerald-600 ">Startups</span>
          <span className="block text-2xl md:text-3xl mt-2 text-emerald-600">that are changing the game!</span>
        </motion.h1>
        
        <motion.div 
          variants={staggeredFade(1.0)} 
          initial="hidden" 
          animate="visible" 
          className="mt-10"
        >
          <Link  
            to="/Investor"  
            className="group relative inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 text-lg font-medium rounded border-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"  
          >  
          <span className="relative z-10">Investor</span>  
          <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>  
          <FiArrowRight className="ml-3 w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />  
          </Link>

        </motion.div>
      </div>

      {/* Decorative elements with accent colors */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      />
      
      {/* Interactive elements */}
      <motion.div
        className="hidden lg:block absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-blue-100 to-emerald-50 rounded-full opacity-60"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Additional interactive decorative elements */}
      <motion.div
        className="absolute top-1/4 right-16 w-6 h-6 bg-blue-100 rounded-full opacity-70"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.1, 1] }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-16 w-8 h-8 bg-emerald-100 rounded-full opacity-70"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.1, 1] }}
        transition={{ duration: 1, delay: 1.8 }}
      />
    </motion.div>
  );
};

export default Head;