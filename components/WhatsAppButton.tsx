"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappLink = `https://wa.me/919342798344?text=${encodeURIComponent(
    "Hello Sri Ganesh Enterprises ENTERPRISES, I would like to know more about your products."
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Animated background circle */}
      <div
        className={`absolute inset-0 bg-[#25D366] rounded-full transition-transform duration-300 ${
          isHovered ? "scale-110" : "scale-100"
        }`}
        style={{
          boxShadow: isHovered
            ? "0 8px 24px rgba(37, 211, 102, 0.4)"
            : "0 4px 12px rgba(37, 211, 102, 0.3)",
        }}
      />

      {/* Icon */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <MessageCircle
          className="w-8 h-8 text-white transition-transform duration-300"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-20 right-0 whitespace-nowrap bg-gray-900 dark:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg animation-fade-in pointer-events-none">
          Chat with us
          <div className="absolute top-full right-2 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45 -mt-1" />
        </div>
      )}

      {/* Pulse animation for attention */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full opacity-0 animate-pulse" />
    </a>
  );
}
