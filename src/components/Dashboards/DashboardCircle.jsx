"use client"
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import jsonData from '../../../public/data/Dados.json';

export default function DashboardCircle({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 549;
    const height = 237;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'max-width: 100%; height: auto;')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    
    const data = jsonData;

    const aggregatedData = d3.rollups(
      data,
      v => d3.sum(v, d => d.InactiveUsers),
      d => d.Application
    );

    const pie = d3.pie()
      .value(d => d[1]);

    const arc = d3.arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const color = d3.scaleOrdinal()
      .domain(aggregatedData.map(d => d[0]))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), aggregatedData.length));

    const arcs = pie(aggregatedData);

    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('fill', d => color(d.data[0]))
      .attr('d', arc)
      .append('title')
      .text(d => `${d.data[0]}: ${d.value.toLocaleString("en-US")} (${((d.value / d3.sum(aggregatedData, d => d[1])) * 100).toFixed(2)}%)`);

      svg.selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => `${((d.value / d3.sum(aggregatedData, d => d[1])) * 100).toFixed(2)}%`);

      const uniqueAppNames = [...new Set(aggregatedData.map(d => d[0]))];

      const legend = d3.select(svgRef.current)
      .append('div') 
      .attr('transform', `translate(${width + 10},10)`);

    const legendItems = legend
      .selectAll('.legend-item')
      .data(uniqueAppNames)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d,i) => `translate(0, ${i * 20})`);

    legendItems.append('rect')
      .attr('x', 0)
      .attr('height', '18px')
      .attr('width', '18px')
      .attr('fill', d => color(d));

    legendItems.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35rem')
      .style('text-anchor', 'start')
      .text(d => d);

  }, [ data ]);

  return (
    <div className="m-10">
        <svg ref={svgRef} className='bg-white rounded-lg shadow-lg'></svg>
    </div>
  );
}
