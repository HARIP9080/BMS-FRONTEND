
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Card,
} from "@mui/material";

const CasesGraph = () => {
  const [count, setCount] = useState({ });
  const [isDataEmpty, setIsDataEmpty] = useState(true); // Set true initially to show empty state until data is fetched
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/graph-data`);
      setCount(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const staticData = [
    {
      id: "Residents",
      label: "Residents",
      value: count.residenceCount|| 0,
    },
    {
      id: "Assets",
      label: "Assets",
      value: count.assetsCount || 0,
    },
    {
      id: "Contractors",
      label: "Contractors",
      value: count.contractorCount || 0,
    },
    {
      id: "Active Cases",
      label: "Active Cases",
      value: count.caseCount || 0,
    },
    {
      id: "Work Orders",
      label: "Work Orders",
      value: count.wordOrderCount  || 0,
    },
  ];

  useEffect(() => {
    setIsDataEmpty(staticData.every(item => item.value === 0));
  }, [count]);

  const chartOptions = {
    chart: {
      type: "pie",
      height: 300,
    },
    labels: staticData.map(item => item.label),
    // responsive: [{
    //   breakpoint: 480,
    //   options: {
    //     chart: {
    //       width: 150,
    //     },
    //     legend: {
    //       position: "bottom",
    //     },
    //   },
    // }],
  };

  const chartSeries = staticData.map(item => item.value);

  const EmptyChart = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      boxShadow="none"
    >
      <Typography variant="body1" color="textSecondary">
        No data available
      </Typography>
    </Box>
  );

  return (
    <Card elevation={3} sx={{ padding: 0, borderRadius: 2, boxShadow:"none" }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{ fontSize: "1.2rem", padding: 2 }}>
      Cases Graph
      </Typography>
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <div className="relative" height="300px">
          {isDataEmpty ? (
            <EmptyChart />
          ) : (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="pie"
              height={200}
              width="100%"
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default CasesGraph;
