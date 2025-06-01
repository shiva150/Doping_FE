import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Games() {
  const navigate = useNavigate();

  const games = [
    {
      title: "Anti-Doping Clicker",
      description: "An idle clicker game where you earn points by making anti-doping decisions and managing your clean sport campaign.",
      image: "🎮",
      path: "/games/clicker",
      features: [
        "Earn points through strategic decisions",
        "Upgrade your anti-doping facilities",
        "Train athletes in clean sport practices",
        "Compete on the global leaderboard"
      ]
    },
    {
      title: "Clean Sport Dash",
      description: "An endless runner game where you navigate through obstacles while collecting clean sport power-ups.",
      image: "🏃",
      path: "/games/dash",
      features: [
        "Fast-paced endless running",
        "Collect clean sport power-ups",
        "Avoid doping obstacles",
        "Compete for high scores"
      ]
    }
  ];

  const handleGameClick = (path) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Games</h1>
      <p className="text-gray-600 mb-8">
        Earn points and learn about anti-doping through fun, interactive games. Compete with others and climb the leaderboard!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={game.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{game.image}</span>
                <h2 className="text-2xl font-semibold text-blue-600">{game.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h3 className="text-blue-800 font-medium mb-2">Features:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {game.features.map((feature, i) => (
                    <li key={i} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleGameClick(game.path)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Play Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">How Points Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-blue-800 font-medium mb-2">Earning Points</h3>
            <p className="text-gray-600">
              Earn points by playing games, achieving high scores, and completing challenges.
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-blue-800 font-medium mb-2">Leaderboard</h3>
            <p className="text-gray-600">
              Compete with other players and climb the global leaderboard.
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-blue-800 font-medium mb-2">Rewards</h3>
            <p className="text-gray-600">
              Use your points to unlock special features and rewards in the games.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Games; 