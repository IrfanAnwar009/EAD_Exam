import { useState, useEffect } from "react";

export default function CountdownLightSwitch() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(30);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } transition-all duration-500`}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Countdown & Light Switch</h1>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              onChange={toggleTheme}
              checked={theme === "light"}
            />
            <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
              <div
                className={`w-5 h-5 bg-white rounded-full shadow absolute top-1 transition-all ${
                  theme === "light" ? "left-7" : "left-1"
                }`}
              ></div>
            </div>
            <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
          </label>
        </div>

        {/* Timer Section */}
        <div className="text-center">
          <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${(30 - timeLeft) / 30 * 100}%` }}
            ></div>
          </div>
          <div className="text-2xl font-bold">{timeLeft}s</div>
          <div className="mt-4">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
              >
                Start Timer
              </button>
            ) : (
              <button
                onClick={resetTimer}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              >
                Reset Timer
              </button>
            )}
          </div>
          {timeLeft === 0 && <p className="mt-2 text-red-500">Time's up!</p>}
        </div>
      </div>
    </div>
  );
}
