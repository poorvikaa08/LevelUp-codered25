// pages/index.js
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Home() {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 800;
    const centerX = width / 2;
    const centerY = height / 2;
    const orbitRadius = [100, 200, 300];
    const subjects = [
      { name: 'Maths', icon: '📐' },
      { name: 'Chemistry', icon: '🧪' },
      { name: 'Physics', icon: '⚛️' },
    ];

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous contents
    svg.selectAll('*').remove();

    // Add orbits
    orbitRadius.forEach((radius) => {
      svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-dasharray', '4 4');
    });

    // Add central project name
    svg.append('text')
      .attr('x', centerX)
      .attr('y', centerY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .text('Project Name');

    // Add icons orbiting
    const angleScale = d3.scaleLinear().domain([0, subjects.length]).range([0, 2 * Math.PI]);

    subjects.forEach((subject, i) => {
      const angle = angleScale(i);
      const radius = orbitRadius[i];
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Add icon
      svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '20px')
        .text(subject.icon);
    });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
