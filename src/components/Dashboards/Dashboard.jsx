"use client"
import { useEffect, useRef } from "react";
import * as d3 from 'd3';
import jsonData from '../../../public/data/Dados.json';
import { ApplyFilter } from "../Filter";

// Nesse dashboard default para x é Data e para y é Spend
// Em caso de alteração pelo filtro deve mudar o X para uma Data especifica e aplicar em relação a Categoria ou Application(não mostrando nome da aplicação e nem da categoria) solicitada sem alterar o Y.
export default function Dashboard({ filteredData, startDate, endDate, selectedApplication, selectedCategory }) {
    const svgRef = useRef();

    useEffect(() => {

      const filteredData = ApplyFilter(jsonData, startDate, endDate, selectedApplication, selectedCategory)

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 1427 - margin.left - margin.right;
      const height = 223 - margin.top - margin.bottom;

      d3.select(svgRef.current).selectAll('*').remove();
  
      const svg = d3.select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const x = d3.scaleTime()
        .domain(d3.extent(filteredData, d => new Date(d.Data)))
        .range([0, width]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.Spend)])
        .nice()
        .range([height, 0]);
  
      const area = d3.area()
        .x(d => x(new Date(d.Data)))
        .y0(height)
        .y1(d => y(d.Spend));
  
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
        .datum(filteredData)
        .attr('fill', 'steelblue')
        .attr('d', area);
    }, [ filteredData, startDate, endDate, selectedCategory, selectedApplication ]);
  
    return (
      <div className=" ml-4 mt-14">
        <span>Invoice spend overtime</span>
        <svg ref={svgRef} className='bg-white rounded-lg shadow-lg'></svg>
      </div>
    );
  }
