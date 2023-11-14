import React, { useState } from 'react';
import FileUploadForm from './FileUploadForm';
import ResultsDisplay from './ResultsDisplay';

function App() {
  const [result, setResult] = useState('');

  const handleFileSubmit = async (file) => {
    // 创建FormData对象
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 向后端发送请求
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setResult(JSON.stringify(data, null, 2));
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <FileUploadForm onFileSubmit={handleFileSubmit} />
      <ResultsDisplay result={result} />
    </div>
  );
}

export default App;
