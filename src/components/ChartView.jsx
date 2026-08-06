import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Calendar, Award } from 'lucide-react';

export const ChartView = ({ logs = [], goal = 'maintain' }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!logs || logs.length === 0) {
    return (
      <div style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 'var(--radius-md)',
        border: '1px dashed var(--border-subtle)'
      }}>
        <Calendar size={36} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>No Weight Logs Recorded Yet</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Log your first weight entry to render your interactive trend chart.</p>
      </div>
    );
  }

  // Calculate SVG dimensions
  const width = 600;
  const height = 240;
  const padding = 40;

  const weights = logs.map(l => l.weightKg);
  const minWeight = Math.max(0, Math.floor(Math.min(...weights) - 2));
  const maxWeight = Math.ceil(Math.max(...weights) + 2);
  const weightRange = maxWeight - minWeight || 10;

  const points = logs.map((log, idx) => {
    const x = logs.length === 1 
      ? width / 2 
      : padding + (idx / (logs.length - 1)) * (width - padding * 2);
    const y = height - padding - ((log.weightKg - minWeight) / weightRange) * (height - padding * 2);
    return { x, y, ...log };
  });

  // Generate SVG path line
  let pathD = '';
  if (points.length === 1) {
    pathD = `M ${points[0].x - 20} ${points[0].y} L ${points[0].x + 20} ${points[0].y}`;
  } else {
    pathD = points.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      // Smooth curve cubic bezier
      const prev = points[i - 1];
      const cx = (prev.x + pt.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
    }, '');
  }

  // Gradient area path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  // Milestone calculation
  const startWeight = logs[0].weightKg;
  const currentWeight = logs[logs.length - 1].weightKg;
  const diff = parseFloat((currentWeight - startWeight).toFixed(1));

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Milestone Callout */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        marginBottom: '1rem',
        padding: '0.6rem 1rem',
        background: 'rgba(16, 185, 129, 0.08)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Award size={18} color="var(--accent-primary)" />
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Progress Summary:</span>
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: diff <= 0 ? 'var(--accent-primary)' : '#f59e0b' }}>
          {diff === 0 ? (
            'Steady Weight Maintainer ⚖️'
          ) : diff < 0 ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <TrendingDown size={16} /> Down {Math.abs(diff)} kg since start
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <TrendingUp size={16} /> Gained {diff} kg (Goal progress)
            </span>
          )}
        </div>
      </div>

      {/* SVG Chart Container */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = height - padding - ratio * (height - padding * 2);
            const val = (minWeight + ratio * weightRange).toFixed(1);
            return (
              <g key={i}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="4 4" />
                <text x={padding - 8} y={y + 4} fill="var(--text-muted)" fontSize="10" textAnchor="end">{val}kg</text>
              </g>
            );
          })}

          {/* Area under curve */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Line Path */}
          <path d={pathD} fill="none" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" />

          {/* Points */}
          {points.map((pt, i) => (
            <g key={i} onMouseEnter={() => setHoveredPoint(pt)} onMouseLeave={() => setHoveredPoint(null)} style={{ cursor: 'pointer' }}>
              <circle cx={pt.x} cy={pt.y} r={hoveredPoint?.id === pt.id ? 7 : 4.5} fill="#0a0a0a" stroke="var(--accent-primary)" strokeWidth="2.5" />
              <text x={pt.x} y={height - 12} fill="var(--text-muted)" fontSize="10" textAnchor="middle">
                {pt.date.slice(5)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Interactive Tooltip Card */}
      {hoveredPoint && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid var(--accent-primary)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.5rem 0.75rem',
          fontSize: '0.8rem',
          boxShadow: 'var(--shadow-card)',
          zIndex: 10
        }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{hoveredPoint.weightKg} kg</div>
          <div style={{ color: 'var(--text-secondary)' }}>BMI: {hoveredPoint.bmi} ({hoveredPoint.category})</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{hoveredPoint.date}</div>
        </div>
      )}
    </div>
  );
};
