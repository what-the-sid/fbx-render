import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import ExportPage from './components/ExportPage';
import Container from '@mui/material/Container';

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/view/:id" element={<ExportPage />} />
          <Route path="/" element={<FileUpload />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
