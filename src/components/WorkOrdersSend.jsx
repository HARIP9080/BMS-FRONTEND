import axios from "axios";
import { useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemText, Box, Avatar, Divider } from "@mui/material";

const WorkOrdersSend = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/maintenance`
      );
      setReportData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontSize:"1.3rem", fontWeight:"bold" }    }> 
        Lasted Work Orders Send
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List
        sx={{
          height: 405,
  
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: 4 },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
        }}
      >
        {reportData?.map((report, index) => (
          <ListItem
            key={index}
            sx={{
              borderRadius: 1,
              mb: 1,
              "&:hover": {
                bgcolor: "#3B82F6",
                color: "white",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar>{/* Add an icon or leave as placeholder */}📄</Avatar>

              <ListItemText
                primary={<Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: "bold" }}>{`Report: ${report?.title}`}</Typography>} // Reduced primary text size
                secondary={<Typography variant="caption" sx={{ fontSize: '0.6rem', color: "#9e9e9e" }}>{`Created ${report?.create}`}</Typography>} // Reduced secondary text size
                sx={{
                  ".MuiListItemText-primary": {
                    fontWeight: "bold",
                  },
                  ".MuiListItemText-secondary": {
                    color: "gray",
                  },
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default WorkOrdersSend;
