import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // "focus" or "break"

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSessionEnd = () => {
    setIsRunning(false);
    if (mode === "focus") {
      setMode("break");
      setTimeLeft(5 * 60);
    } else {
      setMode("focus");
      setTimeLeft(25 * 60);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-indigo-100 text-gray-800 font-sans px-4">
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Pomodoro Timer</h1>
  
      <h2 className="text-xl font-medium mb-2">
        Mode: <span className="capitalize font-semibold">{mode}</span>
      </h2>
  
      <div className="text-7xl font-mono bg-white px-10 py-6 rounded-2xl shadow-xl border-4 border-gray-300 mb-8">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
  
      <div className="flex space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`${
            isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          } text-white text-lg font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
  
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
  

export default PomodoroTimer;
