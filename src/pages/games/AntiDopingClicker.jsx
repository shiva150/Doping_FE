import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import confetti from 'canvas-confetti';
import axios from 'axios'; // Import axios
// Assuming you have an AuthContext to get the user token
import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary

function AntiDopingClicker() {
  const [points, setPoints] = useState(0);
  const [totalPps, setTotalPps] = useState(0); // Total Points Per Second from upgrades
  const [clickMultiplier, setClickMultiplier] = useState(1); // Multiplier for points per click
  const [clickAnimations, setClickAnimations] = useState([]);
  // Initialize upgrade states as empty arrays initially, will load from backend
  const [testAgents, setTestAgents] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState('');
  
  const clickSound = useRef(new Audio('/click.mp3'));
  const purchaseRef = useRef({}); // Ref to track purchases to prevent double processing
  const { user, token } = useAuth(); // Get user AND token from auth context

  // Effect to fetch game state on mount and token change
  useEffect(() => {
    const fetchGameState = async () => {
      console.log('Fetching game state effect triggered.');
      if (!token) {
        console.log('No token available, skipping game state fetch.');
        setLoading(false); // Assume game state loading is done if no token
        return; // Don't fetch if no token
      }
      console.log('Token available, attempting to fetch game state...');

      try {
        const res = await axios.get('/api/game', {
          headers: {
            // Use Authorization header with Bearer token
            'Authorization': `Bearer ${token}`
          }
        });
        const gameState = res.data;
        console.log('Game state fetched successfully:', gameState);

        // Update state with fetched data
        setPoints(gameState.fairPoints);
        console.log('State updated with fetched data:', { fairPoints: gameState.fairPoints });

        // Recalculate totalPps from loaded testAgents
        const loadedTotalPps = (gameState.testAgents || []).reduce((sum, agent) => {
            // Need to find the base agent info (like pps) from initial list
            const baseAgent = initialTestAgents.find(a => a.id === agent.id);
            return sum + (baseAgent ? baseAgent.pps * agent.count : 0);
        }, 0);
        setTotalPps(loadedTotalPps);

        // Recalculate clickMultiplier from loaded equipment
         const loadedClickMultiplier = (gameState.equipment || []).reduce((sum, item) => {
            // Need to find the base item info (like multiplier) from initial list
            const baseItem = initialEquipment.find(i => i.id === item.id);
            // Equipment multiplier is added, not multiplied
            return sum + (baseItem ? baseItem.multiplier * item.count : 0);
        }, 1);
        setClickMultiplier(loadedClickMultiplier);

        // Update local state of testAgents and equipment with counts
        // Initialize state with full list and update counts from saved state
        setTestAgents(initialTestAgents.map(agent => {
            const savedAgent = (gameState.testAgents || []).find(sa => sa.id === agent.id);
            return savedAgent ? { ...agent, count: savedAgent.count } : { ...agent, count: 0 };
        }));
         setEquipment(initialEquipment.map(item => {
            const savedItem = (gameState.equipment || []).find(si => si.id === item.id);
            return savedItem ? { ...item, count: savedItem.count } : { ...item, count: 0 };
        }));

      } catch (err) {
        console.error('Error fetching game state:', err);
        // Optionally set an error state for game state
      } // Loading state for game state is handled by the outer effect logic
    };

    // Only fetch game state if user is logged in (token is available)
    if (user && token) {
      fetchGameState();
    }
  }, [user, token]); // Depend on user and token

  // Effect to fetch leaderboard data on mount and token change
  useEffect(() => {
    const fetchLeaderboard = async () => {
      console.log('Fetching leaderboard effect triggered.');
      if (!token) {
        console.log('No token available, skipping leaderboard fetch.');
        setLeaderboardLoading(false); // Assume leaderboard loading is done if no token
        setTopPlayers([]); // Clear leaderboard if logged out
        return; // Don't fetch if no token
      }
      console.log('Token available, attempting to fetch leaderboard...');

      try {
        const res = await axios.get('http://localhost:5000/api/leaderboard', {
          headers: {
            'Authorization': `Bearer ${token}` // Include JWT token
          }
        });
        console.log('Leaderboard data fetched successfully:', res.data);
        setTopPlayers(res.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setLeaderboardError('Failed to load leaderboard.');
      } finally {
        setLeaderboardLoading(false);
      }
    };

    // Only fetch leaderboard if user is logged in (token is available)
     if (user && token) {
      fetchLeaderboard();
    } else {
      setLeaderboardLoading(false);
      setTopPlayers([]); // Clear leaderboard if logged out
    }
  }, [user, token]); // Depend on user and token

  // Effect to save game state periodically
  useEffect(() => {
    const saveGameState = async () => {
      if (!token) return; // Don't save if no token

       // Prepare data to save
      const gameData = {
        fairPoints: points,
        testAgents: testAgents.map(agent => ({ id: agent.id, count: agent.count })),
        equipment: equipment.map(item => ({ id: item.id, count: item.count })),
      };

       // Only save if there are points or upgrades (to avoid saving default state immediately)
       // Added a check for user to prevent saving before user is loaded
      if (user && (points > 0 || testAgents.some(a => a.count > 0) || equipment.some(e => e.count > 0))) {
         try {
          await axios.post('/api/game/save', gameData, {
            headers: {
              // Use Authorization header with Bearer token
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Game state saved.');
        } catch (err) {
          console.error('Error saving game state:', err);
        }
      }
    };

    // Save more frequently since points can change rapidly
    const saveInterval = setInterval(saveGameState, 2000); // Save every 2 seconds

    // Save game state when component unmounts
    return () => {
      clearInterval(saveInterval);
      // Check if user and token exist before saving on unmount
      if (user && token && (points > 0 || testAgents.some(a => a.count > 0) || equipment.some(e => e.count > 0))) {
        saveGameState(); // Save one last time on unmount
      }
    };
  }, [token, points, testAgents, equipment, user]); // Depend on user as well


  // Keep initial upgrade lists separate to use for calculating loaded PPS/Multiplier
   const initialTestAgents = [
    { id: 1, name: "Intern", cost: 10, pps: 0.1 },
    { id: 2, name: "Junior Agent", cost: 100, pps: 1 },
    { id: 3, name: "Senior Agent", cost: 500, pps: 5 },
    { id: 4, name: "Lead Investigator", cost: 2000, pps: 20 },
    { id: 5, name: "Elite Task Force", cost: 10000, pps: 100 },
  ];
   const initialEquipment = [
    { id: 1, name: "Enhanced Mousepad", cost: 50, multiplier: 2 },
    { id: 2, name: "Ergonomic Keyboard", cost: 250, multiplier: 5 },
    { id: 3, name: "High-Precision Monitor", cost: 1000, multiplier: 10 },
    { id: 4, name: "Gaming Chair", cost: 5000, multiplier: 25 },
    { id: 5, name: "Bio-Engineered Hand", cost: 25000, multiplier: 50 },
  ];

  // Effect to generate points based on totalPps
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prevPoints => {
        let ppsGained = totalPps;
        return prevPoints + ppsGained;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [totalPps]);

  const triggerConfetti = () => {
    // Removed confetti logic for leaderboard points
  };

  const handleClick = () => {
    // Play click sound
    clickSound.current.currentTime = 0;
    clickSound.current.volume = 0.2;
    clickSound.current.play();

    // Calculate points gained from click with multipliers
    let pointsGained = 1 * clickMultiplier;

    // Update points
    setPoints(prevPoints => {
      const newPoints = prevPoints + pointsGained;
      console.log('Points updated: prev =', prevPoints, ', gained =', pointsGained, ', new =', newPoints);

      // Removed leaderboard point logic
      // No longer check for leaderboard points here

      return newPoints;
    });

    // Add click animation
    const newAnimation = {
      id: Date.now(),
      x: Math.random() * 100 - 50,
      y: -100 - Math.random() * 50,
      value: pointsGained
    };
    setClickAnimations(prev => [...prev, newAnimation]);
  };

  const buyTestAgent = (agentId) => {
    console.log('Attempting to buy agent with ID:', agentId);

    if (purchaseRef.current[`agent-${agentId}`]) {
      console.log('Purchase for agent ID', agentId, 'already processed, skipping.');
      return;
    }

    const agentToBuy = initialTestAgents.find(agent => agent.id === agentId);
    // Find the current count from the state
    const currentAgent = testAgents.find(agent => agent.id === agentId);

    if (!agentToBuy || points < agentToBuy.cost) return;

    setPoints(prevPoints => prevPoints - agentToBuy.cost);

    setTestAgents(prevAgents => prevAgents.map(agent => {
      if (agent.id === agentId) {
         setTotalPps(prevPps => {
          console.log('Buying', agent.name, ', agent pps:', agentToBuy.pps, ', current totalPps:', prevPps, ', new totalPps:', prevPps + agentToBuy.pps);
          const newTotalPps = prevPps + agentToBuy.pps;
          return newTotalPps;
        });
        return { ...agent, count: agent.count + 1 }; // Increment count in the state
      }
      return agent;
    }));

    purchaseRef.current[`agent-${agentId}`] = true;

    setTimeout(() => {
      purchaseRef.current[`agent-${agentId}`] = false;
    }, 50);
  };

  const buyEquipment = (equipmentId) => {
     console.log('Attempting to buy equipment with ID:', equipmentId);

    if (purchaseRef.current[`equipment-${equipmentId}`]) {
      console.log('Purchase for equipment ID', equipmentId, 'already processed, skipping.');
      return;
    }

    const itemToBuy = initialEquipment.find(item => item.id === equipmentId);
     // Find the current count from the state
    const currentItem = equipment.find(item => item.id === equipmentId);

    if (!itemToBuy || points < itemToBuy.cost) return;

    setPoints(prevPoints => prevPoints - itemToBuy.cost);

    setEquipment(prevEquipment => prevEquipment.map(item => {
      if (item.id === equipmentId) {
         setClickMultiplier(prevMultiplier => {
          console.log('Buying', item.name, ', item multiplier:', itemToBuy.multiplier, ', current multiplier:', prevMultiplier, ', new multiplier:', prevMultiplier + itemToBuy.multiplier);
          // Equipment adds to multiplier, so add base multiplier
          const newMultiplier = prevMultiplier + itemToBuy.multiplier;
          return newMultiplier;
        });
        return { ...item, count: item.count + 1 }; // Increment count in the state
      }
      return item;
    }));

    purchaseRef.current[`equipment-${equipmentId}`] = true;

    setTimeout(() => {
      purchaseRef.current[`equipment-${equipmentId}`] = false;
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8 relative"
      >

        <div className="max-w-7xl mx-auto px-4 pt-16">
          <div className="grid grid-cols-12 gap-8">
            {/* Leaderboard Points Box - Removed */}
             {/* Leaderboard now based on Fair Points */}
            <div className="col-span-3">
              {/* Top Players - Will fetch and display based on Fair Points from backend */}
               <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Players (Fair Points)</h3>
                <div className="space-y-4">
                  {/* Display fetched top players here */}
                  {topPlayers.map((player, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{player.username}</span>
                      {/* Display player's Fair Points */}
                      <span className="text-blue-600 font-semibold">{player.fairPoints.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Game Area */}
            <div className="col-span-6">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 relative">
                {/* Progress Bar - Removed */}

                {/* Click Button */}
                <div className="flex justify-center items-center h-80">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    className="relative w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-[0_8px_0_rgb(30,64,175)] hover:shadow-[0_4px_0_rgb(30,64,175)] hover:translate-y-1 transition-all duration-150"
                  >
                    <span className="text-3xl font-bold">Click</span>
                  </motion.button>

                  {/* Click Animations */}
                  <AnimatePresence>
                    {clickAnimations.map(anim => (
                      <motion.div
                        key={anim.id}
                        initial={{ opacity: 1, y: 0, x: 0 }}
                        animate={{ opacity: 0, y: anim.y, x: anim.x }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-blue-600 font-bold pointer-events-none"
                        onAnimationComplete={() => {
                          setClickAnimations(prev => prev.filter(a => a.id !== anim.id));
                        }}
                      >
                        +{Math.ceil(anim.value)}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Points per Second (from upgrades) */}
                <div className="text-center text-gray-600 mt-4">
                  <p>Points per second: {totalPps.toFixed(1)} FP/sec</p>
                </div>

              </div>

              {/* Upgrades Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Upgrades</h3>

                {/* Test Agents Subsection */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4">Test Agents</h4>
                  <div className="space-y-4">
                    {/* Use initialTestAgents for display */}
                    {initialTestAgents.map(agent => (
                      <div key={agent.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <div>
                           {/* Display count from local state */}
                          <p className="font-bold text-gray-800">{agent.name} ({testAgents.find(a => a.id === agent.id)?.count || 0})</p>
                          <p className="text-sm text-gray-600">Generates {agent.pps} Fair Points per second</p>
                        </div>
                        <button
                          onClick={() => buyTestAgent(agent.id)}
                          disabled={points < agent.cost}
                          className={`px-4 py-2 rounded-md text-white font-semibold ${points >= agent.cost ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                          Buy ({agent.cost} FP)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment Subsection */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4">Equipment</h4>
                  <div className="space-y-4">
                    {/* Use initialEquipment for display */}
                    {initialEquipment.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <div>
                          {/* Display count from local state */}
                          <p className="font-bold text-gray-800">{item.name} ({equipment.find(e => e.id === item.id)?.count || 0})</p>
                          <p className="text-sm text-gray-600">+{item.multiplier} points per click</p>
                        </div>
                        <button
                          onClick={() => buyEquipment(item.id)}
                          disabled={points < item.cost}
                          className={`px-4 py-2 rounded-md text-white font-semibold ${points >= item.cost ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                          Buy ({item.cost} FP)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Fair Points Box */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Fair Points</h3>
                <div className="flex items-center">
                  <img src="/focus.png" alt="Fair Points" className="w-6 h-6 mr-2" />
                  <p className="text-3xl font-bold text-blue-700">{points.toLocaleString()}</p>
                </div>
              </div>

              {/* Right Sidebar (Stats) */}
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-48">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Total Fair Points</p>
                    <p className="text-2xl font-bold text-blue-600">{points.toLocaleString()}</p>
                  </div>
                   <div>
                    <p className="text-gray-600">Points per Click</p>
                    <p className="text-2xl font-bold text-blue-600">{clickMultiplier}</p>
                  </div>
                  {/* Leaderboard Points Stat - Removed */}
                  {/* <div>
                    <p className="text-gray-600">Leaderboard Points</p>
                    <p className="text-2xl font-bold text-green-600">{leaderboardPoints}</p>
                  </div> */}
                  {/* Next Leaderboard Point Stat - Removed */}
                  {/* <div>
                    <p className="text-gray-600">Next Leaderboard Point</p>
                    <p className="text-xl font-bold text-blue-600">{Math.ceil(nextLeaderboardPoint - points)} Fair Points</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AntiDopingClicker; 