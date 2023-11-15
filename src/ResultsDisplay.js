import React from 'react';

function ResultsDisplay({ result }) {
  return (
    <div>
      <h2>Result</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default ResultsDisplay;
