"use client"
import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import jsonData from '../../../public/data/Dados.json';

// Nesse dashboard default para x é Data e para y é Spend
// Em caso de alteração pelo filtro deve mudar o X para uma Data especifica e aplicar em relação a Categoria ou Application(não mostrando nome da aplicação e nem da categoria) solicitada sem alterar o Y.
export default function Dashboard({ data }) {

    const svgRef = useRef();

    useEffect(() => {

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 1127 - margin.left - margin.right;
      const height = 223 - margin.top - margin.bottom;
  
      const svg = d3.select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const data = jsonData;
  
      const x = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.Data)))
        .range([0, width]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Spend)])
        .nice()
        .range([height, 0]);
  
      const area = d3.area()
        .x(d => x(new Date(d.Data)))
        .y0(height)
        .y1(d => y(d.Spend));

      svg.append('rect')
        .attr('width',width +  margin.left + margin.right)
        .attr('height',height +  margin.top + margin.bottom)
        .attr('fill', 'white')
  
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        .attr('dy', '0.71em')
        .style('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text('Dates');
  
      svg.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -30)
        .attr('dy', '0.71em')
        .style('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text('Value');
  
      svg.append('path')
        .datum(data)
        .attr('fill', 'steelblue')
        .attr('d', area);
    }, [ data ]);
  
    return (
      <div className="ml-6 mt-14">
        <svg ref={svgRef}></svg>
      </div>
    );
  }
