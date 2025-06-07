"use client";

import { useState, useRef, useEffect, memo } from 'react';
import { Send } from 'lucide-react';
import { FooterDisclaimer } from '../components/Disclaimer';
import { DisclaimerPopup } from '../components/DisclaimerPopup';
import ChatMessage from '../components/ChatMessage';

const SuggestedQuestions = memo(function SuggestedQuestions({ style, onQuestionClick }) {
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
    <div className="flex flex-wrap gap-2 mb-4 justify-center" role="group" aria-label="Suggested questions">
      {questions[style].map((question, idx) => (
        <button
          key={idx}
          onClick={() => onQuestionClick(question)}
          className="px-4 sm:px-6 py-3 bg-white/60 hover:bg-white/80 backdrop-blur-md rounded-full
                     text-gray-700 hover:text-gray-900 text-sm font-medium transition-all duration-300
                     border border-white/30 hover:border-white/50 subtle-shadow hover:elegant-shadow
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2
                     min-h-[44px] flex items-center justify-center transform hover:scale-105"
          aria-label={`Ask: ${question}`}
        >
          {question}
        </button>
      ))}
    </div>
  );
});

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('blog');
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef(null);

  const handleStyleChange = (e) => setStyle(e.target.value);
  const handleSuggestedQuestionClick = (question) => setInput(question);
  const handleClearConversation = () => setMessages([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Preload background images
  useEffect(() => {
    const blogImg = new Image();
    const twitterImg = new Image();
    blogImg.src = '/blog-background.jpg';
    twitterImg.src = '/twitter-background.jpg';
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const makeAPICall = async (question, style, attempt = 0) => {
    const maxRetries = 3;
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'https://domgpt.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: question,
          style: style
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Retry on 5xx errors and 429 (rate limit)
        if ((response.status >= 500 || response.status === 429) && attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          await sleep(delay);
          return makeAPICall(question, style, attempt + 1);
        }
        
        let errorMessage = 'Failed to get response from server.';
        
        if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please wait a moment before trying again.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again in a few moments.';
        } else if (response.status === 503) {
          errorMessage = 'Service temporarily unavailable. Please try again later.';
        } else if (data.error) {
          errorMessage = data.error;
        }
        
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      // Retry on network errors
      if ((error.name === 'TypeError' || error.name === 'NetworkError') && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await sleep(delay);
        return makeAPICall(question, style, attempt + 1);
      }
      
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date().toISOString()
    }]);
    setLoading(true);
    setRetryCount(0);

    try {
      const data = await makeAPICall(userMessage, style);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
        timestamp: new Date().toISOString()
      }]);

    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage = error.message || 'Sorry, there was an error processing your request.';
      
      setMessages(prev => [...prev, {
        role: 'error',
        content: errorMessage,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <>
      <DisclaimerPopup />
      <main 
        className="min-h-screen flex flex-col items-center p-4 bg-cover bg-center bg-fixed transition-all duration-500 relative"
        style={{
          backgroundImage: `url("${style === 'blog' ? '/blog-background.jpg' : '/twitter-background.jpg'}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-4xl glass-effect rounded-2xl p-6 sm:p-8 fade-in">
          <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
            <label htmlFor="style-selector" className="sr-only">
              Choose response style
            </label>
            <select
              id="style-selector"
              value={style}
              onChange={handleStyleChange}
              className="w-full sm:w-[220px] px-4 py-3 rounded-xl border-0 bg-white/80 backdrop-blur-md text-gray-800 font-medium
                         subtle-shadow focus:elegant-shadow transition-all duration-300 focus:outline-none 
                         focus:ring-2 focus:ring-purple-500/50 focus:bg-white/90 cursor-pointer"
              aria-label="Choose response style"
            >
              <option value="blog">Blog Dom</option>
              <option value="twitter">Twitter Dom</option>
            </select>
            <a 
              href="/about" 
              className="text-sm text-gray-600 hover:text-gray-800 hover:text-purple-700 font-medium transition-colors duration-200 underline decoration-2 underline-offset-4"
            >
              About
            </a>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800 tracking-tight">
            Ask Your Question
          </h1>
          
          {messages.length === 0 && (
            <SuggestedQuestions 
              style={style} 
              onQuestionClick={handleSuggestedQuestionClick} 
            />
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6" role="search">
            <div className="flex-1 relative">
              <label htmlFor="question-input" className="sr-only">
                Type your question
              </label>
              <input
                id="question-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="w-full p-4 pr-16 border-0 rounded-xl bg-white/80 backdrop-blur-md text-gray-800 placeholder-gray-500
                           subtle-shadow focus:elegant-shadow transition-all duration-300 focus:outline-none 
                           focus:ring-2 focus:ring-purple-500/50 focus:bg-white/90 font-medium"
                disabled={loading}
                maxLength={500}
                aria-label="Type your question"
                aria-describedby="character-limit"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-medium">
                {input.length}/500
              </div>
              <div id="character-limit" className="sr-only">
                Maximum 500 characters
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 
                         disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed min-h-[56px]
                         elegant-shadow hover:shadow-2xl transition-all duration-300 transform hover:scale-105 
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 font-semibold"
              aria-label="Send question"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </form>

          {messages.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="text-sm font-medium text-gray-600">
                  {messages.length} message{messages.length !== 1 ? 's' : ''}
                </div>
                <button
                  onClick={handleClearConversation}
                  className="text-sm font-medium text-red-500 hover:text-red-700 px-3 py-1 rounded-full 
                             hover:bg-red-50/80 transition-all duration-200 focus:outline-none 
                             focus:ring-2 focus:ring-red-500/50"
                  aria-label="Clear conversation history"
                >
                  Clear conversation
                </button>
              </div>
              <div 
                className="h-[400px] sm:h-[600px] overflow-y-auto space-y-4 p-3 sm:p-5"
                role="log"
                aria-label="Conversation history"
                aria-live="polite"
              >
              {messages.map((message, idx) => (
                <div key={idx}>
                  <ChatMessage message={message} formatTimestamp={formatTimestamp} />
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div 
                    className="bg-white/90 border border-white/50 p-4 sm:p-5 rounded-2xl shadow-lg backdrop-blur-md"
                    role="status"
                    aria-label="DomGPT is thinking"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-gray-600 font-medium" aria-hidden="true">DomGPT is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
              </div>
            </>
          )}

          <FooterDisclaimer />
        </div>
      </main>
    </>
  );
}
