import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import { CalendarToday, ExpandMore, ExpandLess, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";

const OverviewCount = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState({
    residenceCount: 0,
    assetsCount: 0,
    contractorCount: 0,
    caseCount: 0,
    workOrdersCount: 0,
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/counts`);
      setCount(response.data);
    } catch (error) {
      console.log(error);
      setCount({
        residenceCount: 0,
        assetsCount: 0,
        contractorCount: 0,
        caseCount: 0,
        workOrdersCount: 0,
      });
    }
  };

  const MetricItem = ({ label, value, icon }) => (
    <Box className="border-r border-gray-300 pr-2 mb-4 shadow-sm p-1 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
  <Typography variant="p" className="text-gray-600 text-sm md:text-base flex items-center">
    {label}
    {icon}
  </Typography>
  <Typography
    variant="h5" // Change the variant to h5 to increase the font size
    className="text-gray-800 text-xl md:text-3xl font-bold" // Customize the font size further
  >
    {value}
  </Typography>
</Box>

  );

  return (
    <Box className="py-2 my-2">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={2.4}>
              <MetricItem
                label="Residents"
                value={count.residentCount}
                icon={<EqualizerIcon className="ml-2 text-sm md:text-base" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <MetricItem
                label="Assets"
                value={count.assetCount}
                icon={<ArrowUpward className="ml-2 text-sm md:text-base text-green-500" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <MetricItem
                label="Contractors"
                value={count.contractorCount}
                icon={<ArrowUpward className="ml-2 text-sm md:text-base text-green-500" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <MetricItem
                label="Active Cases"
                value={count.activeCasesCount}
                icon={<ArrowDownward className="ml-2 text-sm md:text-base text-red-500" />}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2.4}>
              <MetricItem
                label="Work Orders Sent"
                value={count.wordOrderCount}
                icon={<ArrowUpward className="ml-2 text-sm md:text-base text-green-500" />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} className="flex justify-end items-center max-sm:hidden">
          <Box className="flex items-center px-2">
            <IconButton>
              <CalendarToday className="text-blue-500" />
            </IconButton>
            <Typography
              variant="subtitle1"
              onClick={toggleDatePicker}
              className="cursor-pointer text-sm md:text-base mx-2"
            >
              {format(selectedDate, "EEEE, MMM do yyyy")}
            </Typography>
            <IconButton onClick={toggleDatePicker} >
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewCount;