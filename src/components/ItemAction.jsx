import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/VpnKeyOutlined";
import ShieldIcon from "@mui/icons-material/VerifiedUserOutlined";
import PeopleIcon from "@mui/icons-material/GroupsOutlined";

function ItemAction() {
  const [count, setCount] = useState({
    caseCount: 0,
    contractorInsuranceCount: 0,
    notRegisteredResidence: 0,
  });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/counts`);
      setCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "rgb(59 130 246)",
        borderRadius: 2,
        p: 3,
        color: "white",
        boxShadow: 'none', 
        overflowY: "auto",
      }}
    >
      <Typography
        variant={isSmallScreen ? "body1" : "h6"}
        fontWeight="bold"
        gutterBottom
        underline="hover"
        sx={{ fontSize: isSmallScreen ? "0.9rem" : "1.2rem", color: "white" }}
      >
        Items Requiring Action
      </Typography>
      <Grid container spacing={2}>
        {/* Overdue Cases */}
        <Grid item xs={12}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#60a5fa",
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton sx={{ padding: "0px", color: "white" }}> 
                <KeyIcon fontSize="medium" />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isSmallScreen ? "0.7rem" : "0.9rem",
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Overdue cases
              </Typography>
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: isSmallScreen ? "1rem" : "1.2rem", color: "white" }}
            >
              {count?.contractorOverdueCount}
            </Typography>
          </Paper>
        </Grid>

        {/* Contractor Insurance Expiring */}
        <Grid item xs={12}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#60a5fa",
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton sx={{ padding: "0px", color: "white" }}> 
                <ShieldIcon fontSize="medium" />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isSmallScreen ? "0.7rem" : "0.9rem",
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Contractor Insurance Expiring
              </Typography>
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: isSmallScreen ? "1rem" : "1.2rem", color: "white" }}
            >
              {count?.contractorInsuranceExpiringCount}
            </Typography>
          </Paper>
        </Grid>

        {/* Overdue Maintenance Schedules */}
        <Grid item xs={12}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#60a5fa",
              p: 2,
              borderRadius: 2,
              // minHeight: "45px",
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton sx={{ padding: "0px", color: "white" }}> 
                <ShieldIcon fontSize="medium" />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isSmallScreen ? "0.7rem" : "0.9rem",
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Overdue Maintenance Schedules
              </Typography>
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: isSmallScreen ? "1rem" : "1.2rem", color: "white" }}
            >
              {count?.maintenanceOverdueCount}
            </Typography>
          </Paper>
        </Grid>

        {/* Resident Information Update Requests */}
        <Grid item xs={12}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#60a5fa",
              p: 2,
              
              borderRadius: 2,
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton sx={{ padding: "0px", color: "white" }}> 
                <PeopleIcon fontSize="medium" />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isSmallScreen ? "0.7rem" : "0.9rem",
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Resident Information Update Requests
              </Typography>
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: isSmallScreen ? "1rem" : "1.2rem", color: "white" }}
            >
              {count?.residentUpdatePendingCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ItemAction;
