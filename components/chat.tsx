'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm Arjay! Welcome to my digital twin. Ask me about my skills, projects, education, or how we can work together.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What are your strengths?',
    'What are your weaknesses?',
    'Show me your projects',
    'What are your goals?',
    'How can I contact you?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Check for prompt injection
    if (
      text.toLowerCase().includes('ignore') ||
      text.toLowerCase().includes('override') ||
      text.toLowerCase().includes('system prompt') ||
      text.toLowerCase().includes('forget all') ||
      text.toLowerCase().includes('act as admin')
    ) {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Nice try! 😄 I'm Arjay, and I'm only here to answer about my portfolio. Ask me something about my skills, projects, or goals!",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      return;
    }

    setIsLoading(true);

    // Call Groq API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'API error');
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error instanceof Error ? error.message : 'I\'m having trouble responding right now. Please try again in a moment!'}`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-2xl bg-black text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-5 h-5 border-2 border-white rounded"></div>
            <span className="text-xs font-semibold">Chat</span>
          </div>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-40 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">AP</span>
              </div>
              <h3 className="font-semibold text-gray-800">DIGITAL TWIN - Arjay</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-600 font-semibold mb-3">
              Quick questions:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(question)}
                  className="text-xs px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder="Ask about skills, projects..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading}
                className="p-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
