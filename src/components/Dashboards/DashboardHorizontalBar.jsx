"use client"
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import jsonData from '../../../public/data/Dados.json';

// Nesse dashboard default para y é Application e para x é Spend
// Em caso de alteração pelo filtro deve mudar o Y para uma aplicação especifica e aplicar o intervalo de tempo solicitado sem alterar o X.
function DashboardHorizontalBar({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    // Define chart dimensions and margins
    const width = 549;
    const height = 237;
    const margin = { top: 30, right: 30, bottom: 30, left: 40 };

    // Create SVG element and set dimensions
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Handle single data point case
    if (data.length === 1) {
      const singleDataPoint = data[0];

      // Display a single bar for the filtered data
      svg.append('rect')
        .attr('x', 0)
        .attr('y', 0) // Adjust as needed
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('fill', 'steelblue'); // Set color as needed

      return;
    }

    // For multiple data points, render the bar chart
    const y = d3.scaleBand()
      .domain(data.map(d => d.Application))
      .range([0, height])
      .padding(0.1);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Spend)])
      .nice()
      .range([0, width]);

    const colorScale = d3.scaleSequential()
      .domain([0, data.length - 1])
      .interpolator(d3.interpolateRainbow);

    // Data binding
    const bars = svg.selectAll('rect')
      .data(data);

    // Exit old data (remove bars that are no longer needed)
    bars.exit().remove();

    // Enter new data (create bars for new data points)
    const newBars = bars.enter()
      .append('rect')
      .attr('x', 0)
      .attr('fill', (d, i) => colorScale(i))
        .on('mouseover', (event, d) => {
        // Exiba a legenda quando o mouse passar sobre a barra
        svg.append('text')
          .attr('x', 10)
          .attr('y', y(d.Application) + y.bandwidth() / 2)
          .attr('dy', '.35rem')
          .style('text-anchor', 'start')
          .style('font-weight', 'bold')
          .text(d.Application);
      })
      .on('mouseout', (event, d) => {
        // Remova a legenda quando o mouse sair da barra
        svg.selectAll('text')
          .filter('.legend-text')
          .remove();
      });

    // Merge enter and update selections and update attributes
    bars.merge(newBars)
      .attr('y', d => y(d.Application))
      .attr('width', d => x(d.Spend))
      .attr('height', y.bandwidth());

    svg.append('rect')
      .attr('width',width)
      .attr('height',height)
      .attr('fill', 'white')
      .attr('border-radius', '');
    // Eixo x
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));

    // Remove the grid lines of the x-axis if needed
    svg.selectAll('.tick line').remove();
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default DashboardHorizontalBar;
