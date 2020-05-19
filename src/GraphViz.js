import React from "react";
import { Graph } from "react-d3-graph";
import generate from "random-graph-generator";

const config = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "red",
  },
  link: {
    highlightColor: "red",
  },
};

const data = generate(
  new Array(50).fill(null).map((_, i) => i.toString()),
  {
    maxWidth: 4,
    edgeProbability: 0.3,
  }
).serialize();

const refinedNodes = {
  ...data,
  nodes: data.nodes.map((node, i) => ({
    ...node,
    ...(Math.random() < 0.1 ? { color: "black" } : {}),
  })),
};

export default function () {
  return (
    <Graph
      id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
      data={refinedNodes}
      config={config}
    />
  );
}
