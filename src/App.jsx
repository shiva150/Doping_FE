import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import QuizList from './components/QuizList';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AntiDopingBasics from './pages/modules/AntiDopingBasics';
import ProhibitedSubstances from './pages/modules/ProhibitedSubstances';
import TestingProcedures from './pages/modules/TestingProcedures';
import Games from './pages/Games';
import AntiDopingClicker from './pages/games/AntiDopingClicker';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/basics" element={<AntiDopingBasics />} />
            <Route path="/learn/substances" element={<ProhibitedSubstances />} />
            <Route path="/learn/testing" element={<TestingProcedures />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/clicker" element={<AntiDopingClicker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
