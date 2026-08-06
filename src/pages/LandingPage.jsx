import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, DollarSign, Clock, Bot, Activity, Check } from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  // Interactive mini BMI preview tool for landing page visitors
  const [calcHeight, setCalcHeight] = useState(175);
  const [calcWeight, setCalcWeight] = useState(70);

  const heightM = calcHeight / 100;
  const bmi = parseFloat((calcWeight / (heightM * heightM)).toFixed(1));
  let category = 'Normal Weight';
  let categoryBadgeClass = 'badge-emerald';

  if (bmi < 18.5) { category = 'Underweight'; categoryBadgeClass = 'badge-amber'; }
  else if (bmi >= 25 && bmi < 30) { category = 'Overweight'; categoryBadgeClass = 'badge-amber'; }
  else if (bmi >= 30) { category = 'Obese'; categoryBadgeClass = 'badge-zinc'; }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* HERO SECTION */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 1rem 3rem',
        position: 'relative'
      }}>
        <div className="badge badge-emerald" style={{ marginBottom: '1.25rem' }}>
          <ShieldCheck size={14} /> 100% Free Forever • Zero Ads • No Credit Card
        </div>

        <h1 className="font-heading" style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.25rem',
          maxWidth: '900px',
          margin: '0 auto 1.25rem'
        }}>
          Nail Your College Nutrition <br />
          <span style={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Without Breaking Your Budget
          </span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          Built for busy college students juggling classes, exams, and late nights. Get personalized dorm-friendly diet plans, track your body metrics over time, and get instant AI guidance.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
            Start Free Plan Now <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            Sign In To Account
          </button>
        </div>

        {/* Value Prop Badges */}
        <div style={{
          display: 'flex',
          justify: 'center',
          gap: '2rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> Quick 5-10 Min Grab & Go Meals
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> Under $2.50 / Meal Budget Tags
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> In-House Local AI Companion
          </span>
        </div>
      </section>

      {/* INTERACTIVE BMI PREVIEW WIDGET */}
      <section style={{ marginTop: '2rem', marginBottom: '5rem' }}>
        <div className="glass-card" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2.5rem',
          background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.8) 0%, rgba(10, 10, 10, 0.95) 100%)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="badge badge-zinc" style={{ marginBottom: '0.5rem' }}>Interactive Demo</div>
            <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 700 }}>Try The Instant BMI Calculator</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>See how WeightBuddy instantly calculates your standard body mass index baseline.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <label className="form-label">Height</label>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{calcHeight} cm</span>
                </div>
                <input 
                  type="range" 
                  min="130" 
                  max="220" 
                  value={calcHeight} 
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <label className="form-label">Weight</label>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{calcWeight} kg</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="160" 
                  value={calcWeight} 
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Calculated BMI</div>
              <div className="font-heading" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                {bmi}
              </div>
              <div className={`badge ${categoryBadgeClass}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                {category}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: '1.4' }}>
                *Note: BMI is a standard baseline guide, not clinical medical advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Everything A College Student Needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Designed around tight schedules, dorm kitchens, and zero budget.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
              <Clock size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Schedule Density Aware</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Heavy class day? WeightBuddy prioritizes 5-10 minute grab-and-go meal suggestions like peanut butter oats, egg wraps, and high-protein shakes.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '1.25rem' }}>
              <DollarSign size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Student Budget Friendly</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              No expensive organic meal subscriptions. Every recipe uses accessible, cheap ingredients tagged with cost estimates under $2.50.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
              <Bot size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>In-House AI Companion</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Ask questions in plain English without shaming or guilt. Self-contained intelligence engine helps you adjust meals, prep for exams, and understand trends.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              <Activity size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Milestone & Trend Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Log weight on your own cadence. View smooth SVG trendlines, waist-to-height ratios, and clear milestone markers celebrating your progress.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="glass-card" style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 20, 20, 0.95) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Ready To Take Control Of Your Student Diet?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Create your free account in under 60 seconds. No subscription traps, no external trackers.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Get Started For Free <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
};
