import React, { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-indigo-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="absolute top-4 right-4 flex gap-4 items-center">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </header>

      {/* Pomodoro Timer always visible */}
      <PomodoroTimer />

      {/* Login modal */}
      {showLogin && !isLoggedIn && (
        <div className="absolute top-20 right-4 bg-white shadow-lg rounded p-4">
          <Login
            onLogin={() => {
              setIsLoggedIn(true);
              setShowLogin(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
