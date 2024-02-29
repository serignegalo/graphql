import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ downTransaction, upTransaction }) => {
  const svgRef = useRef();
  const total = upTransaction + downTransaction;
  function toPercent(v, total) {
    v = v + 0;
    return ((v / total ) * 100);
  }

  const upRatio = Math.round(toPercent(upTransaction, total))
  const downRatio = Math.round(toPercent(downTransaction, total))
  const data = [upRatio, downRatio]; // Données en pourcentage
  
  useEffect(() => {
    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal().domain(data).range(["#6366f1", "#4ade80"]); // Couleurs pour chaque tranche

    const pie = d3.pie().value((d) => d);

    const data_ready = pie(data);

    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", (d) => color(d.data))
      .on("mouseover", function(event, d) {
        const percent = d.data;
        d3.select(this)
          .attr('fill', '#FFD700'); // Change la couleur de la tranche survolée
        const percentText = `${percent}%`;
        d3.select("#tooltip")
          .style("visibility", "visible")
          .text(percentText)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 15) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr('fill', (d) => color(d.data)); // Rétablit la couleur d'origine de la tranche
        d3.select("#tooltip")
          .style("visibility", "hidden");
      });

  }, [data]);

  return (
    <div className="">
      <h1 className="text-black ml-8 mt-4">Circle Diagramm</h1>
      <svg ref={svgRef}></svg>
      <div id="tooltip" style={{ position: 'absolute', visibility: 'hidden' }}></div>
      <div className="flex justify-between mb-4">
        <span className="bg-green-500 w-32 rounded ml-4 text-center">up ratio</span>
        <span className="bg-indigo-500 w-32 rounded mr-4 text-center">down ratio</span>

      </div>
    </div>
  );
};

export default PieChart;
