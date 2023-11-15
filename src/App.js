import React, { useState } from 'react';
import { Container, Typography, Box, Paper, LinearProgress, TextField } from '@material-ui/core';

import FileUploadForm from './FileUploadForm';
import ResultsDisplay from './ResultsDisplay';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // 居中对齐
  },
  uploadProgress: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    width: '100%', // 设置宽度
  },
  result: {
    marginTop: theme.spacing(2),
    whiteSpace: 'pre-line',
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));
function App() {
  const classes = useStyles();
  const [result, setResult] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSubmit = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // 清除之前的结果和设置上传进度为0
    setResult('');
    setUploadProgress(0);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      if (response.status === 200) {
        setResult(JSON.stringify(response.data, null, 2));
        setUploadProgress(100); // 上传完成
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(`Error: ${error.message}`);
      setUploadProgress(0); // 出错时重置进度条
    }
  };

  // ... 其他组件渲染代码 ...


  return (
    <Container className={classes.container}>
      <Typography variant="h5" gutterBottom>
        文件上传
      </Typography>
      <FileUploadForm onFileSubmit={handleFileSubmit} />
      {uploadProgress > 0 && (
        <LinearProgress className={classes.uploadProgress} variant="determinate" value={uploadProgress} />
      )}
      <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom>
          输出结果
        </Typography>
        <TextField
          label="结果"
          multiline
          rows={4}
          variant="outlined"
          value={result}
          className={classes.textField}
          InputProps={{
            readOnly: true,
          }}
        />
      </Paper>
    </Container>
  );
}

export default App;