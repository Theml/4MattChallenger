"use client"
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import jsonData from '../../../public/data/Dados.json';
import { ApplyFilter } from '../Filter';

// Nesse dashboard default para y é Application e para x é Spend
// Em caso de alteração pelo filtro deve mudar o Y para uma aplicação especifica e aplicar o intervalo de tempo solicitado sem alterar o X.
function DashboardHorizontalBar({ filteredData, startDate, endDate, selectedApplication, selectedCategory }) {
  const svgRef = useRef();

  useEffect(() => {

    const filteredData = ApplyFilter(jsonData, startDate, endDate, selectedCategory, selectedApplication)
   
    const width = 549;
    const height = 217;
    const margin = { top: 30, right: 30, bottom: 30, left: 40 };
   
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
 
    const uniqueApps = [... new Set(filteredData.map(d => d.Application))]
    if (uniqueApps.length === 1) {
      const singleAppData = filteredData[0];
      const maxSpend = d3.max(jsonData, d => d.Spend); 

      svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'steelblue')
        .attr('width', (singleAppData.Spend / maxSpend) * width); 

      return;
    }
   
    const y = d3.scaleBand()
      .domain(filteredData.map(d => d.Application))
      .range([0, height])
      .padding(0.1);

    const x = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.Spend)])
      .nice()
      .range([0, width]);

    const colorScale = d3.scaleSequential()
      .domain([0, filteredData.length - 1])
      .interpolator(d3.interpolateRainbow);

  
    const bars = svg.selectAll('rect')
      .data(filteredData);

    bars.exit().remove();

    const newBars = bars.enter()
      .append('rect')
      .attr('x', 0)
      .attr('fill', (d, i) => colorScale(i))
        .on('mouseover', (event, d) => {
      
        svg.append('text')
          .attr('x', 10)
          .attr('y', y(d.Application) + y.bandwidth() / 2)
          .attr('dy', '.35rem')
          .style('text-anchor', 'start')
          .style('font-weight', 'bold')
          .text(d.Application);
      })
      .on('mouseout', (event, d) => {
        
        svg.selectAll('text')
          .filter('.legend-text')
          .remove();
      });

    bars.merge(newBars)
      .attr('y', d => y(d.Application))
      .attr('width', d => x(d.Spend))
      .attr('height', y.bandwidth());

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));

    svg.selectAll('.tick line').remove();
  }, [ filteredData, startDate, endDate, selectedApplication, selectedCategory ]);

  return (
    <div className='mt-2'>
      <span>
        Most expensive Applications
      </span>
      <svg ref={svgRef} className='bg-white rounded-lg shadow-lg mt-2'></svg>
    </div>
  );
}

export default DashboardHorizontalBar;
