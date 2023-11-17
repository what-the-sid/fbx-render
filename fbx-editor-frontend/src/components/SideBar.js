// src/FileHistorySidebar.js
import React from 'react';
import { Container, Typography, List, ListItem } from '@mui/material';

const Sidebar = ({ fileHistory }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        File History
      </Typography>
      <List>
        {fileHistory.map((file, index) => (
          <ListItem key={index}>{file.name}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Sidebar;
