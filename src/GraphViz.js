import React, { useState } from "react";
import { Graph } from "react-d3-graph";
import { generateRandomTree, generateRandomGraph } from "random-graph-generator";

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
  automaticRearrangeAfterDropNode: true,
};

const regenerate = ({ maxWidth, count, blackCount, graph }) => {
  const fn = graph ? generateRandomGraph : generateRandomTree;
  const data = fn(
    new Array(count).fill(null).map((_, i) => i.toString()),
    {
      maxWidth,
      edgeProbability: 0.3,
    }
  ).serialize();

  let convertedCount = 0;

  while (convertedCount < blackCount) {
    for (let i = 0; i < data.nodes.length; i++) {
      if (Math.random() < (1 / data.nodes.length * blackCount)) {
        data.nodes[i].color = 'black';
        convertedCount++;
      }
      if (convertedCount >= blackCount) break;
    }
  }

  return data;
}



export default () => {
  const [count, setCount] = useState(50);
  const [maxWidth, setMaxWidth] = useState(5);
  const [blackCount, setBlackCount] = useState(5);
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
      <div
        style={{ position: 'fixed', top: '90px', right: '10px', fontSize: '14px', padding: '0.75rem', fontWeight: 'bold' }}>
        <label>Black Nodes:</label>
        <input type="number" min="1" value={blackCount} 
          inputMode="numeric" onChange={e => setBlackCount(Number(e.target.value))}
          style={{ fontSize: '14px', padding: '0.5rem', width: '50px' }} />
      </div>
      <button 
        type="button" 
        style={{ position: 'fixed', top: '160px', right: '10px', fontSize: '14px', padding: '0.75rem' }}
        onClick={() => setNodes(regenerate({ count, maxWidth, graph: false, blackCount }))}>
        Generate Tree
      </button>
      <button 
        type="button" 
        style={{ position: 'fixed', top: '230px', right: '10px', fontSize: '14px', padding: '0.75rem' }}
        onClick={() => setNodes(regenerate({ count, maxWidth, graph: true, blackCount }))}>
        Generate Graph
      </button>
      <button 
        type="button" 
        style={{ position: 'fixed', top: '300px', right: '10px', fontSize: '14px', padding: '0.75rem' }}
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
