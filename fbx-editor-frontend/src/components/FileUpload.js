import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch('http://localhost:4000/v1/render/getAll');
      const result = await response.json();
      if (result.error) {
        console.error('Failed to fetch files:', result.message);
      } else {
        setFiles(result.data);
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const history = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('fbxFile', selectedFile);

    try {
      const response = await fetch('http://localhost:4000/v1/render/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setFiles([...files, {
          name: data.filename,
          date: new Date().toISOString(),
          properties: data.properties
        }]);
        // Redirect to the export page with the filename
        history(`/view/${data.filename}`);
      } else {
        // Handle server errors here
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      // Handle network errors here
      console.error('Network error:', error.message);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleView = (fileName) => {
    history(`/view/${fileName}`);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">File Uploaded successfully</Typography>
      <Box border={1} borderRadius={16} borderColor="grey.500" padding={2} marginY={2} style={{ cursor: 'pointer' }}>
        <input
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          accept=".fbx"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Typography>Drag or Upload .fbx file here</Typography>
        </label>
      </Box>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Button variant="contained" component="span" onClick={handleUpload} disabled={!selectedFile}>
          Upload
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </Box>
      <Typography variant="h6">History:</Typography>
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file.fileName} secondary={new Date(file.createdAt).toLocaleString()} />
            <Button variant="contained" onClick={() => handleView(file.fileName)}>View</Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FileUpload;
