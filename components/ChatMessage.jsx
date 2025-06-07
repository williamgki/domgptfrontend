"use client";

import React from 'react';

const ChatMessage = React.memo(function ChatMessage({ message, formatTimestamp }) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
      <div 
        className={`max-w-[85%] sm:max-w-[80%] p-4 sm:p-5 rounded-2xl backdrop-blur-md transition-all duration-300 ${
          message.role === 'user' 
            ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg' 
            : message.role === 'error'
            ? 'bg-red-50/90 border border-red-200/50 text-red-800 shadow-md'
            : 'bg-white/90 border border-white/50 text-gray-800 shadow-lg'
        }`}
        role={message.role === 'error' ? 'alert' : 'article'}
        aria-label={`${message.role === 'user' ? 'Your question' : message.role === 'error' ? 'Error message' : 'Response from DomGPT'}`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className={`text-xs font-medium ${
            message.role === 'user' ? 'text-white/80' : 'text-gray-500'
          }`}>
            {message.role === 'user' ? 'You' : message.role === 'error' ? 'Error' : 'DomGPT'}
          </div>
          {message.timestamp && (
            <div className={`text-xs ml-2 ${
              message.role === 'user' ? 'text-white/60' : 'text-gray-400'
            }`}>
              {formatTimestamp(message.timestamp)}
            </div>
          )}
        </div>
        <div className="whitespace-pre-wrap leading-relaxed font-medium">{message.content}</div>
        
        {message.sources && (
          <div className="mt-4 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
            <div className="text-sm font-semibold text-gray-700 mb-2">Sources:</div>
            {message.sources.map((source, sourceIdx) => (
              <div key={sourceIdx} className="mt-2 last:mt-0">
                <div className="text-sm font-medium text-gray-800">{source.source}</div>
                <div className="text-xs text-gray-600 mt-1 leading-relaxed">{source.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default ChatMessage;