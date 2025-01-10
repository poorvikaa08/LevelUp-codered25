import React, { useEffect, useState } from "react";

interface User {
  username: string;
  daysTaken: number;
  longestStreak: number;
}

const Leaderboard: React.FC = () => {
 

  // useEffect(() => {
  //   fetch("data.json")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch leaderboard data");
  //       }
  //       return response.json();
  //     })
  //     .then((data: User[]) => {
  //       // Sort data by `daysTaken` in descending order
  //       const sortedData = data.sort((a, b) => b.daysTaken - a.daysTaken);
  //       setData(sortedData);
  //     })
  //     .catch((error) => console.error("Error loading leaderboard data:", error));
  // }, []);

  const data = [
    { "username": "Rithwik", "daysTaken": 50, "longestStreak": 15 },
    { "username": "Hiral", "daysTaken": 40, "longestStreak": 12 },
    { "username": "Poorvika", "daysTaken": 70, "longestStreak": 20 },
    { "username": "Shreyank", "daysTaken": 60, "longestStreak": 18 },
    { "username": "Vinyas", "daysTaken": 45, "longestStreak": 14 }
  ]

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Days Test Taken</th>
            <th>Longest Login Streak</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.daysTaken}</td>
              <td>{user.longestStreak}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <p>
          Powered by <a href="#">LevelUp</a> - AI-driven learning platform
        </p>
      </footer>
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #121212;
          color: #f5f5f5;
        }

        h1 {
          text-align: center;
          margin-top: 20px;
          color: #e649a1;
        }

        table {
          width: 80%;
          margin: 20px auto;
          border-collapse: collapse;
          background-color: #1e1e1e;
          color: #f5f5f5;
          border: 1px solid #333;
        }

        th,
        td {
          padding: 12px 15px;
          text-align: center;
          border: 1px solid #333;
        }

        th {
          background-color: #e649a1;
          color: #ffffff;
          text-transform: uppercase;
        }

        tr:nth-child(even) {
          background-color: #2a2a2a;
        }

        tr:hover {
          background-color: #444;
        }

        footer {
          text-align: center;
          padding: 10px;
          background-color: #1e1e1e;
          color: #777;
          margin-top: 20px;
        }

        footer a {
          color: #e649a1;
          text-decoration: none;
        }

        footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
