import React, { useState } from 'react';

function FileUploadForm({ onFileSubmit }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileSubmit(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".txt, .pdf, .doc, .docx" />
      <button type="submit">Upload File</button>
    </form>
  );
}

export default FileUploadForm;
