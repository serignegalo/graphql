import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ downTransaction, upTransaction }) => {
  const svgRef = useRef();

  useEffect(() => {
    const total = upTransaction + downTransaction;
    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const colorMap = {
      up: "#4ade80",
      down: "#6366f1"
    };

    const pie = d3.pie().value((d) => d);

    const data = [upTransaction, downTransaction];
    const data_ready = pie(data);

    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", (d, i) => (i === 0 ? colorMap["up"] : colorMap["down"]))
      .on("mouseover", function(event, d) {
        const percent = ((d.data / total) * 100).toFixed(2);

        d3.select("#tooltip")
          .style("visibility", "visible")
          .text(`${percent}%`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 15) + "px");
      })
      

    svg.on("mousemove", function(event) {
      d3.select("#tooltip")
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 15) + "px");
    });
  }, [upTransaction, downTransaction]);

  return (
    <div className="">
      <h1 className="text-black ml-8 mt-4">Circle Diagram</h1>
      <svg ref={svgRef}></svg>
      <div id="tooltip" style={{ position: 'absolute', visibility: 'hidden' }}></div>
      <div className="flex justify-between mb-4">
        <span className="bg-indigo-500 w-32 rounded ml-4 text-center">Down Ratio</span>
        <span className="bg-green-500 w-32 rounded mr-4 text-center">Up Ratio</span>
      </div>
    </div>
  );
};

export default PieChart;
