import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { processAiQuery } from '../utils/aiEngine';
import { Bot, Send, User, Sparkles, AlertCircle, Dumbbell, Utensils, Zap, Globe } from 'lucide-react';

export const AiChatPage = () => {
  const { user, onboarding } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hey ${user?.name || 'Student'}! 👋 I'm your WeightBuddy AI Companion.\n\n🌐 **Multi-Language Support**: Ask me in **English, Hinglish (Hindi + English), Hindi, Spanish, or French**!\n\nAsk me about:\n• Easy Home vs Gym Exercise Routines\n• Cheap INR Hostel Meal Ideas\n• Exam Season Nutrition & Focus Tips`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (queryText = input) => {
    const text = queryText.trim();
    if (!text || loading) return;

    const userMsg = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('wb_token');
      let botResponseText = '';
      let isMedical = false;

      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query: text })
      });

      const data = await res.json();
      if (res.ok) {
        botResponseText = data.response;
        isMedical = data.requiresMedicalNotice;
      } else {
        const clientResult = processAiQuery(text, { userName: user?.name, onboarding });
        botResponseText = clientResult.message;
        isMedical = clientResult.requiresMedicalNotice;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponseText,
          isMedical,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      const clientResult = processAiQuery(text, { userName: user?.name, onboarding });
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: clientResult.message,
          isMedical: clientResult.requiresMedicalNotice,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { label: '💪 Easy Home Workout (No Gym)', query: 'Give me an easy home exercise routine with no gym equipment' },
    { label: '🇮🇳 Cheap INR Protein Foods', query: 'Best cheap high-protein hostel foods under 50 INR' },
    { label: '🗣️ Talk in Hinglish', query: 'Hostel ke liye sasta high protein diet batao' },
    { label: '🧠 Exam Cramming Fuel', query: 'What should I eat during late night exam studying?' }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>
            <Globe size={12} /> Speaks English, Hinglish, Hindi, Spanish & More
          </div>
          <h1 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800 }}>In-House AI Companion</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Self-contained intelligence for student nutrition, home vs gym workouts, and campus wellness.
          </p>
        </div>
      </div>

      {/* QUICK SUGGESTION CHIPS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {quickPrompts.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div className="glass-card" style={{
        minHeight: '420px',
        maxHeight: '520px',
        overflowY: 'auto',
        padding: '1.5rem',
        background: '#141414',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        marginBottom: '1.25rem'
      }}>
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: '0.65rem'
              }}
            >
              {!isUser && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{
                maxWidth: '80%',
                padding: '0.9rem 1.1rem',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isUser ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.04)',
                color: isUser ? '#000' : 'var(--text-primary)',
                border: isUser ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '0.88rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {msg.isMedical && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fca5a5', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                    <AlertCircle size={14} /> Medical Guidance Notice
                  </div>
                )}
                {msg.text}
                <div style={{
                  fontSize: '0.68rem',
                  color: isUser ? 'rgba(0,0,0,0.6)' : 'var(--text-muted)',
                  marginTop: '0.4rem',
                  textAlign: 'right'
                }}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <User size={18} />
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            <Bot size={16} className="animate-spin" /> Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT FORM */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        style={{ display: 'flex', gap: '0.75rem' }}
      >
        <input
          type="text"
          placeholder="Ask in English, Hinglish ('hostel food sasta'), Hindi, Spanish..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-input"
          style={{ flex: 1, padding: '0.75rem 1rem' }}
        />
        <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.75rem 1.4rem' }}>
          <Send size={16} /> Send
        </button>
      </form>
    </div>
  );
};
