import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [data, setData] = useState([]); // fetched data from Apps Script
  const [numbers, setNumbers] = useState([]); // wheel numbers based on data length
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  // ✅ Fetch Google Sheets data through Apps Script on page load
  useEffect(() => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbx3sAC5Eq0fgCocja42K7P0CeuRrL9wAOaLCJGqSrEr1weu6Jo5OlkZPPSDxDJ83xwb/exec";

    fetch(scriptURL)
      .then((response) => response.json())
      .then((data) => {
       
        setData(data);
        setNumbers(Array.from({ length: data.length }, (_, i) => i + 1));
      })
      .catch((error) => {
        console.error("Error fetching Apps Script data:", error);
      });
  }, []);

  // 🎡 Spin the wheel
  const spinWheel = () => {
    if (spinning || numbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const chosen = numbers[randomIndex];
    const newNumbers = numbers.filter((n) => n !== chosen);
    setNumbers(newNumbers);

    const spinAmount = 360 * (5 + Math.random() * 5) + (chosen / data.length) * 360;
    setRotation((prev) => prev + spinAmount);
    setSpinning(true);

    setTimeout(() => {
      setSelectedNumber(chosen);
      setSpinning(false);
    }, 4000);
  };

  // 🎨 Royal circus wheel colors
  const royalGradient = `conic-gradient(
    #B22222 0% 8%, 
    #FFB800 8% 16%, 
    #8B0000 16% 24%, 
    #FFD700 24% 32%, 
    #800000 32% 40%, 
    #DAA520 40% 48%, 
    #990033 48% 56%, 
    #FFC34D 56% 64%, 
    #B22222 64% 72%,
    #FFB800 72% 80%,
    #8B0000 80% 88%,
    #FFD700 88% 96%,
    #800000 96% 100%
  )`;

  // ✨ Floating sparkles / confetti
  const decorations = [...Array(20)].map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 6 + 4,
    color: ["#FFD700", "#FFB800", "#FFF5E1", "#FF6347"][Math.floor(Math.random() * 4)],
    rotate: Math.random() * 360,
    delay: Math.random() * 5
  }));

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Header */}
      <header className="w-full py-4 bg-black/40 backdrop-blur-sm shadow-md flex justify-between items-center px-6 md:px-12 border-b-2 border-yellow-400">
        <img
          src="/images/logo-3.png"
          alt="Logo"
          className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
        />
        <nav className="flex space-x-6 sm:space-x-8">
          <a href="/" className="font-semibold hover:text-yellow-400 transition-colors">
            Home
          </a>
          <a href="/about" className="font-semibold hover:text-yellow-400 transition-colors">
            About
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-4 relative">
        {/* Floating decorations */}
        {decorations.map((dec, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: dec.size,
              height: dec.size,
              top: dec.y,
              left: dec.x,
              backgroundColor: dec.color,
              borderRadius: "50%",
              boxShadow: `0 0 ${dec.size / 2}px ${dec.color}`
            }}
            initial={{ y: 0, rotate: dec.rotate, opacity: 0 }}
            animate={{
              y: [0, -50, 0],
              rotate: [dec.rotate, dec.rotate + 360],
              opacity: [0, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: dec.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center drop-shadow-2xl tracking-wide">
          🎪 Lucky Wheel Spinner 🎡
        </h2>

        {/* Spinner Wheel */}
        {data.length === 0 ? (
          <p className="text-yellow-300 text-lg">The suspense builds... fetching the lucky ones!</p>
        ) : (
          <div className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center">
            <div
              className="absolute w-[115%] h-[115%] rounded-full blur-2xl opacity-50 animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, #FFD700 0%, #FFC700 70%, #FFB700 100%)",
              }}
            />
            <motion.div
              className="absolute rounded-full border-2 sm:border-4 border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.5)]"
              style={{ width: "100%", height: "100%", background: royalGradient }}
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="bg-white text-black font-bold rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center shadow-2xl border-4 border-yellow-400"
                  animate={spinning ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.6, repeat: spinning ? Infinity : 0 }}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {spinning ? "🎲" : selectedNumber ?? "?"}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Pointer */}
            <div className="absolute -top-5 sm:-top-6 md:-top-7 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-0 h-0 border-l-[10px] sm:border-l-[12px] border-r-[10px] sm:border-r-[12px] border-b-[20px] sm:border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg" />
            </div>
          </div>
        )}

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          disabled={spinning || numbers.length === 0}
          className={`mt-12 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold tracking-wide shadow-xl transition-all duration-300 ${
            spinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300 text-black scale-105 active:scale-95"
          }`}
        >
          {numbers.length === 0
            ? "Loading..."
            : data.length === 0
            ? "Loading..."
            : "Spin the Wheel!"}
        </button>

        {/* Winner Display */}
        {selectedNumber && !spinning && data[selectedNumber - 1] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-xl sm:text-2xl font-light">🎉 Lucky Number:</p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-yellow-300 drop-shadow-2xl mt-3 animate-bounce">
              {selectedNumber}
            </p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-yellow-300 drop-shadow-2xl mt-3 animate-bounce">
              {data[selectedNumber - 1][2]}
            </p>
            <p className="text-5xl sm:text-6xl md:text-4xl font-extrabold text-yellow-300 drop-shadow-2xl mt-3 animate-bounce">
              {data[selectedNumber - 1][1]}
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-3 sm:py-4 bg-black/40 backdrop-blur-sm text-center shadow-inner mt-auto border-t-2 border-yellow-400">
        <p className="text-sm sm:text-lg">© 2025 Yaticorp India Pvt Ltd</p>
      </footer>
    </div>
  );
};

export default App;
