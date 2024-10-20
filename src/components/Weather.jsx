import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud'; // Use Cloud icon from MUI
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'; // MUI icon for phone
import CasesGraph from "./CasesGraph";

const API_KEY = "585655bdab539489240aed378f6a6cff";
const city = "Coimbatore";

const Weather = () => {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setTemperature(Math.round(data.main.temp - 273.15));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box height="50%" display="flex" flexDirection="column" justifyContent="space-between">
      <Grid container spacing={2}>
        {/* Weather Card */}
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "rgb(59 130 246)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              height: "180%",
              boxShadow: 'none', 
            }}
          >
            <CloudIcon sx={{ fontSize: 70 }} />
            <Typography variant="h6" fontWeight="bold">
              {temperature}°C
            </Typography>
            <Typography variant="h6">Mostly clear</Typography>
          </Paper>
        </Grid>

        {/* Important Number Card */}
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#FD7E7E",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              height: "180%",
               boxShadow: 'none', 
            }}
          >
            <PhoneInTalkIcon sx={{ fontSize: 65 }} />
            <Typography variant="h6" fontWeight="bold">
              Important
            </Typography>
            <Typography variant="h6">Number</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Case Graph Section */}
      {/* <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          mt: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        
        <div width="75%" display="flex" justifyContent="center" alignItems="center">
          <CasesGraph />
        </div>
      </Paper> */}
    </Box>
  );
};

export default Weather;
