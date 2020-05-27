import React, { useState } from "react";
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

const regenerate = () => {
  const data = generate(
    new Array(50).fill(null).map((_, i) => i.toString()),
    {
      maxWidth: 5,
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

  return refinedNodes;
}



export default () => {
  const [nodes, setNodes] = useState(regenerate());

  const exportGraphson = () => {
    console.log(
      JSON.stringify(
        nodes,
        null,
        2
      )
    );
  };

  return (
    <>
      <button 
        type="button" 
        style={{ position: 'fixed', top: '10px', right: '10px', fontSize: '20px', padding: '0.75rem' }}
        onClick={() => setNodes(regenerate())}>
        Generate new Graph
      </button>
      <button 
        type="button" 
        style={{ position: 'fixed', top: '70px', right: '10px', fontSize: '20px', padding: '0.75rem' }}
        onClick={exportGraphson}>
        Export to Console
      </button>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={nodes}
        config={config}
      />
    </>
  );
}
