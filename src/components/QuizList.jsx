import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    console.log('QuizList useEffect - user, token:', { user, token });

    // Reset loading and error states when user/token changes
    setLoading(true);
    setError('');
    
    async function fetchQuizzesWithStatus() {
      try {
        const res = await fetch('http://localhost:5000/api/quizzes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to load quizzes');
        }
        
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Quiz list fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // Only fetch if user and token are available
    if (user && token) {
      fetchQuizzesWithStatus();
    } else {
      // If not logged in, stop loading and show message
      setLoading(false);
      setError('Please log in to view quiz progress.');
      setQuizzes([]); // Clear previous quiz data if logged out
    }

  }, [user, token]); // Depend on user and token

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="border p-4 rounded hover:shadow-md">
            <Link to={`/quiz/${quiz._id}`} className="block">
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.description}</p>
              {quiz.isCompleted ? (
                <p className="text-green-600 text-sm mt-2">
                  Completed: {quiz.score} / {quiz.totalQuestions} points
                </p>
              ) : (
                <p className="text-yellow-600 text-sm mt-2">Not completed</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
