import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./style/CurveComponent.css";

const CurveComponent = ({ transactionsData, mapID }) => {
  const svgRef = useRef();
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!transactionsData || transactionsData.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(transactionsData.map((d) => d.id))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(transactionsData, (d) => d.amount)])
      .nice()
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.id) + x.bandwidth() / 2)
      .y((d) => y(d.amount))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(transactionsData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(transactionsData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.id) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.amount))
      .attr("r", 4)
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        const path = mapID.get(d.id); 
        if (path) {
          const cleanPath = path.replace("/dakar/div-01/", ""); 

          const tooltipHeight = tooltipRef.current.offsetHeight;
          const xPosition = event.clientX + window.pageXOffset + 10; 
          const yPosition = event.clientY + window.pageYOffset + 10;
          const windowHeight = window.innerHeight;
          const bottomSpace = windowHeight - event.clientY;
          if (bottomSpace < tooltipHeight) {
            tooltipRef.current.style.top = `${
              window.pageYOffset + event.clientY - tooltipHeight - 10
            }px`; // Adjust 10px up
          } else {
            tooltipRef.current.style.top = `${yPosition}px`;
          }
          tooltipRef.current.style.left = `${xPosition}px`;
          tooltipRef.current.style.visibility = "visible";
          tooltipRef.current.style.color = "red";
          tooltipRef.current.textContent = cleanPath; 
        }
        event.stopPropagation();
      })
      .on("mouseout", function () {
        tooltipRef.current.style.visibility = "hidden";
      });

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "-0.5em")
      .attr("transform", "rotate(-90)");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [transactionsData, mapID]);

  return (
    <div className="curve-container text-black">
      <h3>Student Progression Curve </h3>
      <svg
        ref={svgRef}
        onClick={() => {
          tooltipRef.current.style.visibility = "hidden";
        }}
      ></svg>
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
};

export default CurveComponent;
