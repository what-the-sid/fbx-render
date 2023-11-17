import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Typography, ToggleButton, ToggleButtonGroup, Modal } from '@mui/material';

const ModelViewerModal = ({ open, onClose, glbFile }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="h6" component="h2">
          3D Model Viewer
        </Typography>
        <model-viewer
          src={glbFile}
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
          style={{ width: '100%', height: '400px' }}
        ></model-viewer>
      </Box>
    </Modal>
  );
};

const ExportPage = () => {
  const { id: filename } = useParams();
  const [scale, setScale] = useState({ x: '', y: '', z: '' });
  const [position, setPosition] = useState({ x: '', y: '', z: '' });
  const [exportSuccess, setExportSuccess] = useState(false);
  const [subdivision, setSubdivision] = useState('unsubdivide');
  const [subdivisionValue, setSubdivisionValue] = useState('');
  const [exportResponse, setExportResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleScaleChange = (e) => {
    setScale({ ...scale, [e.target.name]: e.target.value });
  };

  const handlePositionChange = (e) => {
    setPosition({ ...position, [e.target.name]: e.target.value });
  };

  const handleExport = async () => {
    const bodyContent = {
      filename,
      scale: Object.values(scale).map(value => Number(Number(value).toFixed(3))),
      position: Object.values(position).map(value => Number(Number(value).toFixed(3))),
      subdivide: subdivision === 'subdivide' ? parseInt(subdivisionValue) : undefined,
      unsubdivide: subdivision === 'unsubdivide' ? parseInt(subdivisionValue) : undefined,
    };

    console.log(bodyContent)

    try {
      const response = await fetch('http://localhost:4000/v1/render/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.message);
      }

      // Handle the success response, maybe set state to show the .glb file link
      setExportResponse(result);
      // Here you could set state to show the success message and file link
    } catch (error) {
      console.error("Failed to export file:", error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `http://localhost:4000/v1/output/${exportResponse.glbFile}`;
    link.download = exportResponse.glbFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubdivisionChange = (event, newSubdivision) => {
    if (newSubdivision !== null) {
      setSubdivision(newSubdivision);
    }
  };

  const handleSubdivisionValueChange = (event) => {
    setSubdivisionValue(event.target.value);
  };

  const getSubdivisionLabel = () => {
    return subdivision === 'subdivide' ? 'Level' : 'Iterations';
  };

  const handleView = () => {
   setIsModalOpen(true);
 };

 const goBack = () => {
    navigate('/'); // Navigate to the root path which is the main page
  };

  // Fetch the model properties when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/v1/render/getFile?filename=${filename}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        if (result.error) {
          throw new Error(result.message);
        }

        // Assuming position and scale are returned as JSON strings of arrays
        const positionArray = JSON.parse(result.data.position);
        const scaleArray = JSON.parse(result.data.scale);

        setScale({
          x: scaleArray[0],
          y: scaleArray[1],
          z: scaleArray[2],
        });
        setPosition({
          x: positionArray[0],
          y: positionArray[1],
          z: positionArray[2],
        });
      } catch (error) {
        console.error("Failed to fetch file data:", error);
      }
    };

    fetchData();
  }, [filename]);

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Typography variant="h5">3D Model Configuration</Typography>
      <Box>
        <Typography>Scale</Typography>
        <TextField label="X" variant="outlined" name="x" value={scale.x} onChange={handleScaleChange} />
        <TextField label="Y" variant="outlined" name="y" value={scale.y} onChange={handleScaleChange} />
        <TextField label="Z" variant="outlined" name="z" value={scale.z} onChange={handleScaleChange} />
      </Box>
      <Box>
        <Typography>Position</Typography>
        <TextField label="X" variant="outlined" name="x" value={position.x} onChange={handlePositionChange} />
        <TextField label="Y" variant="outlined" name="y" value={position.y} onChange={handlePositionChange} />
        <TextField label="Z" variant="outlined" name="z" value={position.z} onChange={handlePositionChange} />
      </Box>
      <Box display="flex" alignItems="center">
        <ToggleButtonGroup
          value={subdivision}
          exclusive
          onChange={handleSubdivisionChange}
          aria-label="subdivision"
        >
          <ToggleButton value="unsubdivide" aria-label="unsubdivide">
            Unsubdivide
          </ToggleButton>
          <ToggleButton value="subdivide" aria-label="subdivide">
            Subdivide
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label={getSubdivisionLabel()}
          variant="outlined"
          name="subdivisionValue"
          value={subdivisionValue}
          onChange={handleSubdivisionValueChange}
          sx={{ ml: 2 }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <Button variant="contained" color="primary" onClick={handleExport}>
          Export (.glb)
        </Button>
        <Button variant="outlined" onClick={goBack}>
          Go Back
        </Button>
      </Box>
      {exportResponse && (
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ color: 'success.main', mr: 1 }}>✓</Box>
            File Exported Successfully
          </Typography>
          <Button variant="contained" onClick={handleDownload}>Download</Button>
          <Button variant="outlined" onClick={handleView}>View</Button>
        </Box>
      )}
      <ModelViewerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        glbFile={`http://localhost:4000/v1/output/${exportResponse?.glbFile}`}
      />
    </Box>
  );
};

export default ExportPage;
