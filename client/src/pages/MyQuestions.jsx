import { useState, useEffect } from 'react';
import questionService from '../services/questionService';
import { Link } from 'react-router-dom';

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        const data = await questionService.getMyQuestions();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyQuestions();
  }, []);

  if (loading) return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>My Questions</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Track the status of questions you've asked.</p>

      <div className="flex-col">
        {questions.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>You haven't asked any questions yet.</p>
            <Link to="/ask-question" className="btn-primary" style={{ textDecoration: 'none' }}>Ask a Question</Link>
          </div>
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
                    Posted on {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Link to={`/questions/${q._id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>
                View Answers
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyQuestions;