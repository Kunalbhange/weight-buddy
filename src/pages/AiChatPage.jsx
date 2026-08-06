import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bot, Send, User, ShieldAlert, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';

export const AiChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/ai/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.history) {
        setMessages(data.history);
      }
    } catch (err) {
      console.error('Failed to fetch AI chat history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend || !textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    setInput('');
    setLoading(true);

    // Optimistic UI update
    setMessages(prev => [...prev, { role: 'user', message: userMsg, timestamp: new Date().toISOString() }]);

    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();

      if (res.ok && data.history) {
        setMessages(data.history);
      }
    } catch (err) {
      console.error('AI chat failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Tips for healthy eating during exam week",
    "What are cheap dorm protein sources?",
    "Explain my current weight trend",
    "How do I swap a meal in my plan?"
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
          <Sparkles size={14} /> Self-Contained In-House Agent
        </div>
        <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800 }}>AI Nutrition Companion</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Ask questions in plain English. Powered by our self-hosted offline intelligence engine.
        </p>
      </div>

      {/* MEDICAL DISCLAIMER BANNER */}
      <div style={{
        padding: '0.85rem 1.25rem',
        background: 'rgba(245, 158, 11, 0.08)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        borderRadius: 'var(--radius-sm)',
        color: '#fbbf24',
        fontSize: '0.8rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        <ShieldAlert size={20} style={{ flexShrink: 0 }} />
        <div>
          <strong>Medical Notice:</strong> WeightBuddy AI is an educational assistant, not a doctor or dietitian. Consult a healthcare professional for clinical concerns or symptoms of eating disorders.
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="glass-card" style={{
        background: '#141414',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        height: '520px'
      }}>
        {/* Messages Scroll Region */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-muted)' }}>
              <Bot size={42} color="var(--accent-primary)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Hi {user?.name || 'Student'}! How can I help you today?</h3>
              <p style={{ fontSize: '0.85rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                Ask me about budget dorm meals, exam prep nutrition, or meal swappers.
              </p>

              {/* Sample Prompt Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', maxWidth: '550px', margin: '0 auto' }}>
                {samplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    style={{
                      padding: '0.5rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isUser ? 'rgba(255,255,255,0.1)' : 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isUser ? '#fff' : 'var(--accent-primary)',
                    flexShrink: 0
                  }}>
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                  </div>

                  <div style={{
                    maxWidth: '75%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isUser ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.04)',
                    color: isUser ? '#000' : 'var(--text-primary)',
                    fontWeight: isUser ? 600 : 400,
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    border: isUser ? 'none' : '1px solid var(--border-subtle)',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.message}
                  </div>
                </div>
              );
            })
          )}

          {loading && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Bot size={18} color="var(--accent-primary)" />
              <span>AI Companion is formulating response...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '0.75rem',
          background: '#0a0a0a'
        }}>
          <input
            type="text"
            placeholder="Type your nutrition question..."
            className="form-input"
            style={{ flex: 1, padding: '0.75rem 1rem' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.25rem' }} disabled={loading || !input.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
