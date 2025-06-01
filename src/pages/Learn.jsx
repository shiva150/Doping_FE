import { motion } from 'framer-motion';

function Learn() {
  const modules = [
    {
      title: "Anti-Doping Basics",
      description: "Learn the fundamental principles of anti-doping in sport",
      level: "Beginner",
      duration: "30 mins"
    },
    {
      title: "Prohibited Substances",
      description: "Understanding the WADA prohibited list and substances",
      level: "Intermediate",
      duration: "45 mins"
    },
    {
      title: "Testing Procedures",
      description: "Step-by-step guide to doping control procedures",
      level: "Advanced",
      duration: "60 mins"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Modules</h1>
        <p className="text-xl text-gray-600">
          Master anti-doping knowledge through interactive lessons
        </p>
      </motion.div>

      <div className="grid gap-8">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="game-card flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
              <p className="text-gray-600 mb-2">{module.description}</p>
              <div className="flex space-x-4 text-sm">
                <span className="text-blue-600">Level: {module.level}</span>
                <span className="text-green-600">Duration: {module.duration}</span>
              </div>
            </div>
            <button className="btn-primary">Start Module</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Learn;