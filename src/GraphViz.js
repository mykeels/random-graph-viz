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

const regenerate = ({ maxWidth, count }) => {
  const data = generate(
    new Array(count).fill(null).map((_, i) => i.toString()),
    {
      maxWidth,
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
  const [count, setCount] = useState(50);
  const [maxWidth, setMaxWidth] = useState(5);
  const [nodes, setNodes] = useState(regenerate({ count, maxWidth }));

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
      <div
        style={{ position: 'fixed', top: '10px', right: '10px', fontSize: '14px', padding: '0.75rem', fontWeight: 'bold' }}>
        <label>Node Count:</label>
        <input type="number" min="1" value={count} 
          inputMode="numeric" onChange={e => setCount(Number(e.target.value))}
          style={{ fontSize: '14px', padding: '0.5rem', width: '50px' }} />
      </div>
      <div
        style={{ position: 'fixed', top: '50px', right: '10px', fontSize: '14px', padding: '0.75rem', fontWeight: 'bold' }}>
        <label>Max Width:</label>
        <input type="number" min="1" value={maxWidth} 
          inputMode="numeric" onChange={e => setMaxWidth(Number(e.target.value))}
          style={{ fontSize: '14px', padding: '0.5rem', width: '50px' }} />
      </div>
      <button 
        type="button" 
        style={{ position: 'fixed', top: '110px', right: '10px', fontSize: '14px', padding: '0.75rem' }}
        onClick={() => setNodes(regenerate({ count, maxWidth }))}>
        Regenerate
      </button>
      <button 
        type="button" 
        style={{ position: 'fixed', top: '170px', right: '10px', fontSize: '14px', padding: '0.75rem' }}
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
