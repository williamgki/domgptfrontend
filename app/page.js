"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { FooterDisclaimer } from '../components/Disclaimer';
import { DisclaimerPopup } from '../components/DisclaimerPopup';
import { RateLimitInfo } from '../components/RateLimitInfo';

const SuggestedQuestions = ({ style, onQuestionClick }) => {
  const questions = {
    blog: [
      "What's your view on effective government decision making?",
      "Contrast Metternich and Bismarck's views on power?",
      "What are the key lessons from your time in No 10?"
    ],
    twitter: [
      "Why is Westminster full of PPE grads?",
      "Hot take on AI doom scenarios?",
      "What's wrong with the Treasury?"
    ]
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {questions[style].map((question, idx) => (
        <button
          key={idx}
          onClick={() => onQuestionClick(question)}
          className="px-4 py-2 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-full
                     text-gray-800 text-sm transition-all duration-200
                     border border-gray-200 hover:border-gray-300
                     shadow-sm hover:shadow"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('blog');
  const [rateLimitInfo, setRateLimitInfo] = useState(null);

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleSuggestedQuestionClick = (question) => {
    setInput(question);
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
          style: style
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit exceeded
          setRateLimitInfo(data.detail.rate_limit_info);
          setMessages(prev => [...prev, {
            role: 'error',
            content: 'Rate limit reached. Please wait before asking another question.'
          }]);
        } else {
          throw new Error('Failed to get response');
        }
        return;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer
      }]);
      setRateLimitInfo(data.rate_limit_info);

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
    <>
      <DisclaimerPopup />
      <main className={`min-h-screen flex flex-col items-center p-4 ${
        style === 'blog' 
          ? 'bg-[url("/blog-background.jpg")]' 
          : 'bg-[url("/twitter-background.jpg")]'
      } bg-cover bg-center bg-fixed`}>
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="mb-4 flex justify-center items-center gap-4">
            <select
              value={style}
              onChange={handleStyleChange}
              className="w-[200px] p-2 rounded-lg border border-gray-300 bg-white"
            >
              <option value="blog">Blog Dom</option>
              <option value="twitter">Twitter Dom</option>
            </select>
            <a 
              href="/about" 
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              About
            </a>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4">Ask Your Question</h1>
          
          {messages.length === 0 && (
            <SuggestedQuestions 
              style={style} 
              onQuestionClick={handleSuggestedQuestionClick} 
            />
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 p-2 border rounded-lg bg-white/70 backdrop-blur-sm"
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

          <RateLimitInfo rateLimitInfo={rateLimitInfo} />

          {messages.length > 0 && (
            <div className="h-[600px] overflow-y-auto space-y-4 p-4">
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
          )}
          <FooterDisclaimer />
        </div>
      </main>
    </>
  );
}