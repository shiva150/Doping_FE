import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await fetch('http://localhost:5000/api/quizzes');

        if (!res.ok) throw new Error('Failed to load quizzes');
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
