"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('blog');

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setLoading(true);

    try {
      const response = await fetch('https://domgpt.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: input,
          style: style  // Adding style to the request for future backend use
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'error',
        content: 'Sorry, there was an error processing your request.'
      }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <main className={`min-h-screen flex flex-col items-center p-4 ${
      style === 'blog' 
        ? 'bg-[url("/blog-background.jpg")]' 
        : 'bg-[url("/twitter-background.jpg")]'
    } bg-cover bg-center bg-fixed`}>
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <div className="mb-4 flex justify-center">
          <select
            value={style}
            onChange={handleStyleChange}
            className="w-[200px] p-2 rounded-lg border border-gray-300 bg-white"
          >
            <option value="blog">Blog Dom</option>
            <option value="twitter">Twitter Dom</option>
          </select>
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">Ask Your Question</h1>
        
        <div className="h-[600px] overflow-y-auto mb-4 space-y-4 p-4">
          {messages.map((message, idx) => (
            <div key={idx}>
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-100' 
                    : message.role === 'error'
                    ? 'bg-red-100'
                    : 'bg-gray-100'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {message.sources && (
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="font-semibold">Sources:</div>
                      {message.sources.map((source, sourceIdx) => (
                        <div key={sourceIdx} className="mt-1">
                          <div>{source.source}</div>
                          <div className="text-xs">{source.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 p-2 border rounded-lg bg-white/90 backdrop-blur-sm"
            disabled={loading}
            maxLength={60}
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </main>
  );
}