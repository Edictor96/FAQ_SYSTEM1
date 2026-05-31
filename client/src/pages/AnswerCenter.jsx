import { useState, useEffect } from 'react';
import questionService from '../services/questionService';
import { Link } from 'react-router-dom';

const AnswerCenter = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await questionService.getQuestions();
        const sorted = data.sort((a, b) => a.status === 'pending' ? -1 : 1);
        setQuestions(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Answer Center</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Help the community by providing answers to open questions.</p>

      <div className="flex-col">
        {questions.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No questions have been asked yet.</p>
        ) : (
          questions.map(q => (
            <div key={q._id} className="glass-card flex-between">
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>{q.title}</h4>
                <div className="flex-row">
                  <span className={`badge ${q.status === 'answered' ? 'badge-answered' : 'badge-pending'}`}>
                    {q.status.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    By {q.author?.name || q.author?.email || 'Unknown'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    · {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Link to={`/questions/${q._id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>
                View & Answer
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnswerCenter;