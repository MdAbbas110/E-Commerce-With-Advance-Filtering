import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [time, setTime] = useState(30); // Initial time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      alert("Timer finished!"); // Notify the user
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value, 10);
    setTime(isNaN(newTime) ? 0 : newTime); // Validate input
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <div>
        <input
          type="number"
          value={time}
          onChange={handleTimeChange}
          disabled={isRunning}
        />
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>
          Start
        </button>
      </div>
      <p>Time Remaining: {time} seconds</p>
    </div>
  );
}

export default CountdownTimer;
