import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const leaderboardData = await res.json();
        setData(leaderboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-xl text-gray-600">Top performers in quizzes</p>
      </motion.div>

      <div className="game-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-right">Total Score</th>
              <th className="px-6 py-3 text-right">Quizzes Taken</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ rank, username, totalScore, quizzesTaken }, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : rank}</td>
                <td className="px-6 py-4">{username}</td>
                <td className="px-6 py-4 text-right">{totalScore}</td>
                <td className="px-6 py-4 text-right">{quizzesTaken}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
