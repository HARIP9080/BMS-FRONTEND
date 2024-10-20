import React from "react";
import { Box, Grid, Paper, useTheme, useMediaQuery } from "@mui/material";
import OverviewCount from "./OverviewCount";
import ItemAction from "./ItemAction";
import SearchNotes from "./SearchNotes";
import Weather from "./Weather";
import CasesGraph from "./CasesGraph";
import Reports from "./Reports";
import ActivityFeeds from "./ActivityFeeds";
import WorkOrdersSend from "./WorkOrdersSend";

const Dashboard = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  return (
    <div>
      <Box className="dashboard" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <OverviewCount />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ height: "100%", borderRadius:2 }}>
              <ItemAction />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ height: "100%", p: 2 }}>
              <SearchNotes />
            </Paper>
          </Grid>

          {/* <Grid item xs={12} sm={12} md={4}>
          <Paper xs={{ height: '100%', display: 'flex', gap:"5px", flexDirection: 'column', p:1}}>
            <Box xs={{ flexGrow: 1 }}>
              <Weather />
            </Box>
            <Box xs={{ mt: { xs: 2, sm: 3, md: 4 } }}>
              <CasesGraph />
            </Box>
          </Paper>
        </Grid> */}
          <Grid item xs={12} sm={12} md={4}>
            <div className="w-full h-[500px] shadow-lg">
             
                <Weather />
                <CasesGraph />
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ height: "100%", p: 2 }}>
              <Reports />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ height: "100%", p: 2 }}>
              <WorkOrdersSend />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Paper sx={{ height: "100%", p: 2 }}>
              <ActivityFeeds />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
