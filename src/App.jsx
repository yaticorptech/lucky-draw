import React, { useState } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [numbers, setNumbers] = useState(Array.from({ length: 500 }, (_, i) => i + 1));
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (spinning || numbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const chosen = numbers[randomIndex];
    const newNumbers = numbers.filter((n) => n !== chosen);
    setNumbers(newNumbers);

    const spinAmount = 360 * (5 + Math.random() * 5) + (chosen / 400) * 360;
    setRotation((prev) => prev + spinAmount);
    setSpinning(true);

    setTimeout(() => {
      setSelectedNumber(chosen);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white overflow-hidden">
      
      {/* Header */}
     <header className="w-full py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md flex justify-between items-center px-6 md:px-12">
  {/* Logo on the left */}
  <div className="flex items-center">
    <img
      src="/images/logo-3.png"
      alt="Logo"
      className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
    />
  </div>

  {/* Navigation links on the right */}
  <nav className="flex space-x-6 sm:space-x-8">
    <a
      href="/"
      className="text-white font-semibold hover:text-yellow-400 transition-colors"
    >
      Home
    </a>
    <a
      href="/about"
      className="text-white font-semibold hover:text-yellow-400 transition-colors"
    >
      About
    </a>
  </nav>
</header>


      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Animated floating stars */}
        {[...Array(10)].map((_, i) => (
          <motion.svg
            key={i}
            className="absolute text-yellow-300 opacity-70"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={{
              x: Math.random() * window.innerWidth - 100,
              y: Math.random() * window.innerHeight - 100,
              scale: Math.random() * 1.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              y: [Math.random() * 200 - 100, Math.random() * -200],
              opacity: [0.6, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M10 0l2.39 6.956H19l-4.78 3.487L16.61 17 10 13.13 3.39 17l2.39-6.557L1 6.956h6.61L10 0z" />
          </motion.svg>
        ))}

        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center drop-shadow-2xl tracking-wide">
          🎯 Lucky Draw Spinner 🎡
        </h2>

        {/* Spinner Wheel */}
        <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          {/* Glow ring */}
          <div className="absolute w-[110%] h-[110%] bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 rounded-full blur-2xl opacity-40 animate-pulse" />

          {/* Wheel Body */}
          <motion.div
            className="absolute rounded-full border-[8px] border-white shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            style={{
              width: "100%",
              height: "100%",
              background:
                "conic-gradient(from 0deg, #FF7EE0, #FFBA7E, #7EFFF3, #7EFF9A, #BA7EFF, #FF7EE0)",
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            {/* Center Dice / Number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="bg-white text-black font-bold rounded-full w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shadow-2xl border-4 border-yellow-400"
                animate={spinning ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.6, repeat: spinning ? Infinity : 0 }}
              >
                <span className="text-4xl sm:text-5xl">{spinning ? "🎲" : selectedNumber ?? "?"}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Pointer */}
          <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-300 drop-shadow-lg" />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={spinWheel}
          disabled={spinning || numbers.length === 0}
          className={`mt-12 px-8 py-4 rounded-2xl text-lg font-bold tracking-wide shadow-xl transition-all duration-300 ${
            spinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300 text-black scale-105 active:scale-95"
          }`}
        >
          {numbers.length === 0 ? "All Numbers Drawn 🎉" : "Spin the Wheel!"}
        </button>

        {/* Winner Display */}
        {selectedNumber && !spinning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-3xl font-light">Your Lucky Number:</p>
            <p className="text-7xl font-extrabold text-yellow-300 drop-shadow-2xl mt-4 animate-bounce">
              {selectedNumber}
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-black bg-opacity-40 backdrop-blur-sm text-center shadow-inner mt-auto">
        <p className="text-white text-lg sm:text-xl">© 2025 Yaticorp India Pvt Ltd</p>
      </footer>
    </div>
  );
};

export default App;
