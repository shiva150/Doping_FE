import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('http://localhost:5000/api/leaderboard');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch leaderboard');
        }
        const leaderboardData = await res.json();
        setData(leaderboardData);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
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
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-xl text-gray-600">Top players by combined score</p>
        <p className="text-sm text-gray-500 mt-2">
          Quiz points are converted to Fair Points (1 quiz point = 100 Fair Points)
        </p>
      </motion.div>

      <div className="game-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-right">Total Points</th>
              <th className="px-6 py-3 text-right">Fair Points</th>
              <th className="px-6 py-3 text-right">Quiz Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ rank, username, points, fairPoints, quizPoints }, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : rank}</td>
                <td className="px-6 py-4">{username}</td>
                <td className="px-6 py-4 text-right font-bold">{points.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-blue-600">{fairPoints.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-green-600">{quizPoints.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
