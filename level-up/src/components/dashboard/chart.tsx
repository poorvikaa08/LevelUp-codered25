// TestAnalysis.jsx
'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const testData = [
  { test: 'Test 1', score: 80, avgScore: 75 },
  { test: 'Test 2', score: 90, avgScore: 85 },
  { test: 'Test 3', score: 70, avgScore: 65 },
  { test: 'Test 4', score: 85, avgScore: 80 },
  { test: 'Test 5', score: 95, avgScore: 88 },
];

const TestAnalysis = () => {
  return (
    <div className="flex flex-col gap-6 bg-[]">
      {/* Bar Chart for Scores */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold">Test Scores Analysis</h2>
        </CardHeader>
        <CardContent>
          <BarChart width={600} height={300} data={testData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="test" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" name="Your Score" />
            <Bar dataKey="avgScore" fill="#82ca9d" name="Average Score" />
          </BarChart>
        </CardContent>
      </Card>

      {/* Line Chart for Trends */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold">Performance Trends</h2>
        </CardHeader>
        <CardContent>
          <LineChart width={600} height={300} data={testData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="test" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" name="Your Score" />
            <Line type="monotone" dataKey="avgScore" stroke="#82ca9d" name="Average Score" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAnalysis;
