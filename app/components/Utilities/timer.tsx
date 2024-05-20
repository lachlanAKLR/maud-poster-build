"use client";

import React, { useState, useEffect } from "react";

const Timer = () => {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const timerID = setInterval(
      () => setDateTime(getFormattedDateTime()),
      1000
    );
    return () => clearInterval(timerID);
  }, []);

  function getFormattedDateTime() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}${month}${day} ${hours}:${minutes}:${seconds}`;
  }

  return <div>MP {dateTime}</div>;
};

export default Timer;
