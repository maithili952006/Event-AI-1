import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center min-w-[60px]">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl w-12 h-12 flex items-center justify-center mb-1 group-hover:border-primary/50 transition-colors">
          <span className="text-xl font-black text-white">{timeLeft[interval]}</span>
        </div>
        <span className="text-[8px] uppercase font-bold text-slate-400 tracking-widest">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex gap-2 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl items-center justify-center">
      {timerComponents.length ? (
        <div className="flex gap-3">
          {timerComponents}
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <span className="text-primary font-black uppercase tracking-tighter text-sm italic">Event Live Now</span>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
