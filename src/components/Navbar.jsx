import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Clean Sport Edu</span>
          </NavLink>

          <div className="flex items-center space-x-4">
            <AppNavLink to="/" icon={<HomeIcon className="w-5 h-5" />} text="Home" />
            <AppNavLink to="/learn" icon={<AcademicCapIcon className="w-5 h-5" />} text="Learn" />
            <AppNavLink to="/quizzes" icon={<QuestionMarkCircleIcon className="w-5 h-5" />} text="Quizzes" />
            <AppNavLink to="/leaderboard" icon={<ChartBarIcon className="w-5 h-5" />} text="Leaderboard" />
            <AppNavLink to="/games" icon={<PuzzlePieceIcon className="w-5 h-5" />} text="Games" />

            {user ? (
              <>
                <span className="ml-4 text-gray-700">Hello, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="ml-4 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function AppNavLink({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-1 px-3 py-2 rounded-md transition ${
          isActive ? 'bg-gray-200 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}

export default Navbar;
