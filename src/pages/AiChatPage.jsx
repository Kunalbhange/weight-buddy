import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { processAiQuery } from '../utils/aiEngine';
import { Bot, Send, User, Sparkles, AlertCircle, Dumbbell, Utensils, Zap, Globe, Search } from 'lucide-react';

export const AiChatPage = () => {
  const { user, onboarding } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hey ${user?.name || 'Student'}! 👋 I'm your WeightBuddy AI Nutrition & Food Companion.\n\n🌐 **Multi-Language Support**: Ask me in **English, Hinglish, Hindi, Spanish, or French**!\n\nAsk me about ANY food item (e.g. *Samosa, Biryani, Maggi, Paneer, Eggs, Chicken, Rice, Dosa, Pizza*), recipes, macro breakdowns, or home vs gym exercises! 🥗💪`,
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
        botResponseText = data.response || data.reply;
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

  const foodQuickChips = [
    { label: '🍕 Samosa / Junk Food', query: 'What is the nutrition in Samosa?' },
    { label: '🍲 Biryani Calories', query: 'How many calories in Chicken Biryani?' },
    { label: '🍜 Is Maggi Healthy?', query: 'Is Maggi good for student weight loss?' },
    { label: '🧀 Paneer Macros', query: 'Nutritional value of 100g Paneer' },
    { label: '🥚 Eggs & Protein', query: 'Calories and protein in 2 eggs' },
    { label: '💪 Home Exercise Routine', query: 'Easy home exercise routine with no gym equipment' }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div className="badge badge-amber" style={{ marginBottom: '0.3rem' }}>
            <Globe size={12} /> Speaks English, Hinglish, Hindi, Spanish & More
          </div>
          <h1 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>AI Food & Nutrition Intelligence</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Ask about ANY food item, calorie counts, recipes, or home vs gym exercises.
          </p>
        </div>
      </div>

      {/* QUICK SUGGESTION CHIPS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {foodQuickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
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
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-medium)',
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
                justify: isUser ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: '0.65rem'
              }}
            >
              {!isUser && (
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={18} color="var(--text-primary)" />
                </div>
              )}

              <div style={{
                maxWidth: '80%',
                padding: '0.9rem 1.2rem',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isUser ? 'var(--text-primary)' : 'var(--bg-card)',
                color: isUser ? 'var(--text-primary)' : 'var(--text-primary)',
                border: isUser ? '1.5px solid var(--text-primary)' : '1.5px solid var(--border-subtle)',
                fontSize: '0.92rem',
                fontWeight: isUser ? '700' : '400',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
                boxShadow: isUser ? '0 4px 15px rgba(255, 255, 255, 0.25)' : 'none'
              }}>
                {msg.isMedical && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fca5a5', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                    <AlertCircle size={14} /> Medical Guidance Notice
                  </div>
                )}
                {msg.text}
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: isUser ? 'rgba(5, 5, 7, 0.65)' : 'var(--text-muted)',
                  marginTop: '0.4rem',
                  textAlign: 'right'
                }}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  flexShrink: 0
                }}>
                  <User size={18} color="var(--text-primary)" />
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            <Bot size={16} className="animate-spin" /> Analyzing Nutrition & Food Data...
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
          placeholder="Ask about ANY food (e.g. Samosa, Biryani, Maggi, Paneer, Eggs, Oats, Chicken)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-input"
          style={{ flex: 1, padding: '0.8rem 1.1rem' }}
        />
        <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.8rem 1.6rem' }}>
          <Send size={16} /> Send
        </button>
      </form>
    </div>
  );
};
