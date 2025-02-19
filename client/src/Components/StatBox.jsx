import React, { useEffect, useState } from "react";

const StatBox = ({ title, value, bgColor }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ""));
    if (start === end) return;

    const duration = 3000;
    const increment = Math.max(1, Math.floor(end / (duration / 10)));

    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 10);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={`p-4 rounded-lg ${bgColor} text-center shadow-md`}>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-semibold">{value.includes("₹") ? `₹${count}` : count}</p>
    </div>
  );
};

export default StatBox;
