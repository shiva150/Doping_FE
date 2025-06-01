import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Quiz() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [submitting, setSubmitting] = useState(false); // Optional improvement

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${id}`);
        if (!res.ok) throw new Error('Failed to load quiz');
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [id]);
  const navigate = useNavigate();

useEffect(() => {
  if (!user) navigate('/login'); // redirect if not logged in
}, [user, navigate]);
  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (answersArray) => {
    setSubmitting(true); // Optional loading state
    try {
      const res = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          quizId: quiz._id,
          answers: answersArray,
        }),
      });

      if (!res.ok) throw new Error('Failed to save submission');
      const data = await res.json();

      setScoreData({ score: data.score, totalQuestions: data.totalQuestions });
      setSubmitted(true); // ✅ This was the missing piece
    } catch (err) {
      console.error('Submission error:', err);
      setError('Error submitting quiz');
    } finally {
      setSubmitting(false);
    }
  };

  // Conditional rendering
  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-4">
          Your score: {scoreData.score} / {scoreData.totalQuestions}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setCurrentQuestion(0);
            setAnswers([]);
            setScoreData(null);
            setError('');
          }}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <p className="mb-4 text-gray-600">{quiz.description}</p>

      <div className="mb-6">
        <div className="text-sm text-gray-700 mb-2">
          Question {currentQuestion + 1} / {quiz.questions.length}
        </div>
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={submitting}
              className={`w-full text-left p-3 border rounded transition-colors ${
                submitting ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-blue-50 hover:border-blue-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
