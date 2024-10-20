import axios from "axios";
import { useEffect, useState } from "react";
import DownloadIcon from '@mui/icons-material/Download'; // Importing MUI download icon
// MUI imports
import {
  Typography,
  List,
  ListItem,
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";

const Report = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching report data from the API
  const fetchData = async () => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/maintenance`
      );
      const documents = response.data || [];
      console.log(response.data, "---> Data")
      setReportData(documents);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxHeight: "500px",
        borderRadius: 2,
        overflowY: "auto",
        bgcolor: "white",
        boxShadow: 'none', 
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom    sx={{ fontSize:"1.3rem", fontWeight:"bold" }}
      > {/* Reduced title font size */}
        Management Reports Generated
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List 
        sx={{ 
          height: 405, 
           
          overflowY: "auto", 
          "&::-webkit-scrollbar": { width: 4 }, 
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: 4 }, 
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" } 
        }}
      >
        {reportData.length > 0 ? (
          reportData.map((report, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderRadius: 1,
                mb: 1,
                "&:hover": {
                  backgroundColor: "#3B82F6",
                  color: "white",
                },
                
              }}
            >
              <ListItemAvatar>
                <Avatar>{/* Add an icon or leave as placeholder */}📄</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: "bold" }}>{`Report: ${report?.title}`}</Typography>} // Reduced primary text size
                secondary={<Typography variant="caption" sx={{ fontSize: '0.6rem', color: "textSecondary" }}>{`Created on: ${report?.create}`}</Typography>} // Reduced secondary text size
              />
              <IconButton
                component="a"
                href={`${process.env.REACT_APP_SERVER_URL}/download/${report.pdfURL}`} // Simplified href
                download
                sx={{
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <DownloadIcon sx={{ fontSize: '1rem' }} /> {/* Optionally reduce icon size */}
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ fontSize: '0.75rem' }}> {/* Reduced font size */}
            No reports available.
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default Report;
