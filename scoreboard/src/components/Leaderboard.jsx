import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Scoreboard = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ username: '', score: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/players');
      const sortedPlayers = response.data.sort((a, b) => b.score - a.score);
      setPlayers(sortedPlayers.map((player, index) => ({ ...player, rank: index + 1 })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const handleAddPlayer = async () => {
    try {
      await axios.post('http://localhost:5000/api/score', newPlayer);
      setNewPlayer({ username: '', score: '' });
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-1">SCORE BOARD</h1>
      <div className="input-box mt-5">
        <form className="form-inline">
          <input
            type="text"
            name="username"
            value={newPlayer.username}
            onChange={handleInputChange}
            placeholder="username"
            className="form-control-sm input"
            style={{ height: '40px' }}
          />
          <input
            type="text"
            name="score"
            value={newPlayer.score}
            onChange={handleInputChange}
            placeholder="score"
            className="form-control-sm input"
            style={{ height: '40px' }}
          />
          <button
            type="button"
            onClick={handleAddPlayer}
            className="btn btn-secondary"
          >
            Add Player
          </button>
        </form>
      </div>
      <div className="score-table mt-5">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th className='col-sm-1 table-head'>RANK</th>
              <th className='table-head'>PLAYER</th>
              <th className='table-head'>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id}>
                <td className='table-data'>{player.rank}</td>
                <td className='table-data'>{player.username}</td>
                <td className='table-data'>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scoreboard;
