import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center space-y-16">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Learn About Clean Sport Through Play
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Join our interactive platform to learn about anti-doping in a fun and engaging way
        </p>

        {user ? (
          <p className="text-lg font-semibold text-green-700">Welcome back, {user.username}!</p>
        ) : (
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        )}

        {/* Cards: Interactive Learning and Quiz */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3 text-left">
            <h2 className="text-xl font-semibold mb-2">Interactive Learning</h2>
            <p className="text-gray-600 mb-4">
              Engage with interactive modules covering anti-doping rules, procedures, and best practices.
            </p>
            <Link to="/learn">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Start Learning
              </button>
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3 text-left">
            <h2 className="text-xl font-semibold mb-2">Test Your Knowledge</h2>
            <p className="text-gray-600 mb-4">
              Challenge yourself with quizzes and earn badges while learning about clean sport.
            </p>
            <Link to="/quizzes">
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    Take Quiz
  </button>
</Link>

          </div>
        </div>
      </section>

      {/* Why Clean Sport Matters */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Why Clean Sport Matters</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/4">
            <h3 className="font-semibold text-lg mb-2">Fair Competition</h3>
            <p className="text-gray-600">Ensure all athletes compete on a level playing field</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/4">
            <h3 className="font-semibold text-lg mb-2">Health Protection</h3>
            <p className="text-gray-600">Safeguard athlete health and well-being</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/4">
            <h3 className="font-semibold text-lg mb-2">Sport Integrity</h3>
            <p className="text-gray-600">Maintain the true spirit of sport</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
