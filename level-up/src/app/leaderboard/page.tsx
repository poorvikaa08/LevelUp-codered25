'use client'

import React from "react";

const Leaderboard: React.FC = () => {
  const data = [
    { username: "Hiral", daysTaken: 70, longestStreak: 20 },
    { username: "Vinyas", daysTaken: 60, longestStreak: 18 },
    { username: "Poorvika", daysTaken: 55, longestStreak: 16 },
    { username: "Rithwik", daysTaken: 50, longestStreak: 15 },
    { username: "Prakruti", daysTaken: 45, longestStreak: 14 },
    { username: "Bupin", daysTaken: 40, longestStreak: 12 },
    { username: "Ram", daysTaken: 35, longestStreak: 10 },
    { username: "Sai", daysTaken: 30, longestStreak: 8 },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-pink-500">Leaderboard</h1>
      </header>
      <main className="flex justify-center">
        <table className="w-4/5 bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-4 px-6 text-left text-gray-300 uppercase bg-pink-500 text-sm">Rank</th>
              <th className="py-4 px-6 text-left text-gray-300 uppercase bg-pink-500 text-sm">Username</th>
              <th className="py-4 px-6 text-left text-gray-300 uppercase bg-pink-500 text-sm">
                Days Test Taken
              </th>
              <th className="py-4 px-6 text-left text-gray-300 uppercase bg-pink-500 text-sm">
                Longest Login Streak
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-gray-600`}
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.daysTaken}</td>
                <td className="py-4 px-6">{user.longestStreak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="mt-8 text-center py-4 bg-gray-800 text-gray-400">
        <p>
          Powered by <a href="#" className="text-pink-500 underline">LevelUp</a> - AI-driven learning platform
        </p>
      </footer>
    </div>
  );
};

export default Leaderboard;