import { useState, useEffect } from 'react';
import api from '../api/axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await api.get('/admin/leaderboard');
      setLeaderboard(data.leaderboard || []);
    } catch {
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const medals = ['🥇', '🥈', '🥉'];

  if (loading) return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Loading leaderboard...</div>;

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>🏆 Leaderboard</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Top contributors ranked by points</p>
      </div>

      {leaderboard.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          No points earned yet. Start answering questions!
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {leaderboard.map((u, i) => (
          <div key={u._id} style={{
            background: i < 3 ? 'var(--accent-light)' : 'var(--bg-card)',
            border: `1px solid ${i < 3 ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)', padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 16,
            transition: 'all 0.2s'
          }}>
            <div style={{ fontSize: i < 3 ? 28 : 16, fontWeight: 700, width: 40, textAlign: 'center', color: i < 3 ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }}>
              {i < 3 ? medals[i] : `#${i + 1}`}
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
              {u.name?.charAt(0)?.toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{u.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.role}</div>
            </div>
            <div style={{
              background: i < 3 ? 'var(--accent)' : 'var(--bg-secondary)',
              color: i < 3 ? '#fff' : 'var(--text-primary)',
              padding: '6px 16px', borderRadius: 20, fontWeight: 700, fontSize: 15
            }}>
              ⭐ {u.points || 0} pts
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-muted)' }}>
        <strong style={{ color: 'var(--text-primary)' }}>How to earn points:</strong>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { label: 'Answer accepted', pts: '+20' },
            { label: 'Question promoted to FAQ', pts: '+15' },
            { label: 'Answer gets 5+ upvotes', pts: '+10' },
            { label: 'Good question badge', pts: '+5' },
            { label: 'Answer downvoted', pts: '-5' },
          ].map(({ label, pts }) => (
            <span key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>
              {label} <strong style={{ color: pts.startsWith('+') ? 'var(--success)' : 'var(--error)' }}>{pts}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;