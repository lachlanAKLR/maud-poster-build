import React, { useState, useEffect } from "react";
import axios from "axios";

const IPAddress = () => {
  const [ip, setIp] = useState("Fetching IP...");

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        setIp("Unable to fetch IP");
      }
    };

    fetchIp();
  }, []);

  return <div>IP {ip}</div>;
};

export default IPAddress;
