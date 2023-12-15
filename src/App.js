// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    playerName: '',
    points: 0,
    rebounds: 0,
    assists: 0,
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };
  const resetForm = () => {
    setFormData({
      playerName: '',
      points: 0,
      rebounds: 0,
      assists: 0,
    });
  };
 

  const recordStats = async () => {
    try {
      await axios.post('http://localhost:5000/api/players', formData);
      fetchPlayers();
      resetForm();
    } catch (error) {
      console.error('Error recording stats:', error);
    }
  };



  return (
    <div className="App">
      <h1>Basketball Stats App</h1>
      <form>
        <label>
          Player Name:
          <br></br>
          <input
            type="text"
            value={formData.playerName}
            onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
          />
        </label>
        <label>
          Points Scored:
          <input
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Rebounds:
          <input
            type="number"
            value={formData.rebounds}
            onChange={(e) => setFormData({ ...formData, rebounds: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Assists:
          <input
            type="number"
            value={formData.assists}
            onChange={(e) => setFormData({ ...formData, assists: parseInt(e.target.value) })}
          />
        </label>
        <button type="button" onClick={recordStats}>
          Record Stats
        </button>
      </form>

      <h2>Player Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assists</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player._id}>
              <td>{player.playerName}</td>
              <td>{player.points}</td>
              <td>{player.rebounds}</td>
              <td>{player.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;