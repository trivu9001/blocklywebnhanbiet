import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";
import { Navigate } from "react-router-dom";
const CountdownTimer = ({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0, //mai mốt nhận func ở đây cũng được
  callback,
}) => {
  const [remainingTime, setRemainingTime] = useState({
    hours: parseInt(initialHours),
    minutes: parseInt(initialMinutes),
    seconds: parseInt(initialSeconds),
  });
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
        clearInterval(interval);
        setTimeUp(true);
      } else if (remainingTime.minutes === 0 && remainingTime.seconds === 0) {
        setRemainingTime((prevTime) => ({
          hours: prevTime.hours - 1,
          minutes: 59,
          seconds: 59,
        }));
      } else if (remainingTime.seconds === 0) {
        setRemainingTime((prevTime) => ({
          ...prevTime,
          minutes: prevTime.minutes - 1,
          seconds: 59,
        }));
      } else {
        setRemainingTime((prevTime) => ({
          ...prevTime,
          seconds: prevTime.seconds - 1,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const { hours, minutes, seconds } = remainingTime;
  const isCriticalTime = hours === 0 && minutes === 0 && seconds <= 5;
  if (timeUp) {
    callback(0, "autoSubmit");
  }
  return (
    <div className="countdown-timer">
      <h1>Thời gian làm bài</h1>
      <p className={`${isCriticalTime ? "time-critical" : ""}`}>{`${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountdownTimer;
