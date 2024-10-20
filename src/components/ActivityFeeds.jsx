import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import {
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";

function ActivityFeeds() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/activities`); 
      setData(response.data); 
    } catch (error) {
      setError("Failed to fetch activities."); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1">Loading...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" color="error">
          {error} 
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxHeight: "500px",
        boxShadow: 'none', 
        borderRadius: 2,
        overflowY: "auto",
        bgcolor: "white",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontSize:"1.3rem", fontWeight:"bold" }}>
        Activity Feed
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          height: 405,
          p: 2,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: 4 },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
        }}
      >
        {data.map(({ date, user, record }, idx) => (
          <Box key={`${date}-${user}`} mb={2}>
            <Typography variant="body2" fontWeight="bold" color="text.primary">
              {date} - {user}
            </Typography>
            <Box sx={{ pl: 2 }}>
              {record.map(({ time, action }, index) => (
                <Box key={`${date}-${user}-${index}`} display="flex" gap={2} mb={1}>
                  <Typography variant="caption" color="text.secondary">
                    {time}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {action}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default ActivityFeeds;
