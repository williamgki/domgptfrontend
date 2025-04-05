"use client";

import { useEffect } from "react";

export const BuyMeACoffeeButton = () => {
  useEffect(() => {
    console.log("Mounting BMC script...");

    const script = document.createElement("script");
    script.setAttribute("src", "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js");
    script.setAttribute("data-name", "bmc-button");
    script.setAttribute("data-slug", "domgpt");
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-emoji", "");
    script.setAttribute("data-font", "Cookie");
    script.setAttribute("data-text", "Buy me a coffee");
    script.setAttribute("data-outline-color", "#000000");
    script.setAttribute("data-font-color", "#000000");
    script.setAttribute("data-coffee-color", "#ffffff");
    script.setAttribute("type", "text/javascript");

    const container = document.getElementById("bmc-container");

    if (container) {
      container.appendChild(script);
    } else {
      console.warn("No bmc-container found");
    }
  }, []);

  return (
    <div 
      id="bmc-container" 
      className="mt-6 mb-4 flex justify-center bg-white rounded-xl shadow-md p-4"
    />
  );
};