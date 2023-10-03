"use client"
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import jsonData from '../../../public/data/Dados.json';
import { ApplyFilter } from '../Filter';

// Nesse dashboard default para x é Category e para y é Spend
// Em caso de alteração pelo filtro deve mudar o X para uma categoria especifica e aplicar o intervalo de tempo solicitado sem alterar o Y.
function DashboardBar({ filteredData, startDate, endDate, selectedApplication, selectedCategory }) {
    const svgRef = useRef()
  
      useEffect(() => {

        const filteredData = ApplyFilter(jsonData, startDate, endDate, selectedApplication, selectedCategory)

        const width = 549;
        const height = 237;
        const margin = { top: 30, right: 30, bottom: 30, left: 40 };
    
        const svg = d3.select(svgRef.current)
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        const categories = [...new Set(filteredData.map(d => d.Category))];
        const colorScale = d3.scaleSequential()
          .domain([0, categories.length - 1])
          .interpolator(d3.interpolateRainbow);
    
        const x = d3.scaleBand()
          .domain(filteredData.map(d => d.Category))
          .range([0, width])
          .padding(0.1);
    
        // Escala y para 'Spend'
        const y = d3.scaleLinear()
          .domain([0, d3.max(filteredData, d => d.Spend)])
          .nice()
          .range([height, 0]);

        const bars = d3.selectAll('rect')
          .data(filteredData)

        bars.exit().remove()

        const newBars = bars.enter()
          .append('rect')
          .attr('x', 0)
          .attr('fill', (d, i) => colorScale(i))

          bars.merge(newBars)
          .attr('x', d => x(d.Category))
          .attr('y', d => y(d.Spend))
          .attr('height', d => height - y(d.Spend))
          .attr('width', x.bandwidth());

        svg.selectAll('rect')
          .data(filteredData)
          .enter()
          .append('rect')
          .attr('x', d => x(d.Category))
          .attr('y', d => y(d.Spend))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.Spend))
          .attr('fill',(d, i) => colorScale(categories.indexOf(d.Category)));
    
        // Eixo x
        svg.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x))
          .selectAll('text')
          .style('text-anchor', 'middle')
          .attr('font-size', '12px');
          
    
        // Eixo y
        svg.append('g')
          .call(d3.axisLeft(y))
          .call(g => g.select('.domain').remove());
      }, [ filteredData, startDate, endDate, selectedApplication, selectedCategory ]);
  
    return (
      <div>
        <span>
          Spend by Category
        </span>
        <svg ref={svgRef} className='bg-white rounded-lg shadow-lg'></svg>
      </div>
    );
  }

export default DashboardBar
