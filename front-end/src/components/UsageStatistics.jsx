import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  styled,
  CircularProgress,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import mockUsageStats from "../data/mockUsageStats.json";

const StyledContainer = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  margin: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(6),
  gap: theme.spacing(4),
  textAlign: "center",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 700,
  fontSize: "2.5rem",
  fontFamily: theme.typography.fontFamily,
  letterSpacing: "0.02em",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
}));

const FilterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1.5),
  width: "100%",
  maxWidth: "300px",
}));

const FilterLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: "1rem",
  fontFamily: theme.typography.fontFamily,
  letterSpacing: "0.02em",
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  "& .MuiInputLabel-root": {
    display: "none",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    "& fieldset": {
      borderColor: theme.palette.primary.contrastText + "30",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.contrastText + "60",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.contrastText,
    },
    "& .MuiSelect-select": {
      color: theme.palette.text.primary,
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
  },
}));

const ChartsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  gap: theme.spacing(4),
  alignItems: "stretch",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
  },
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: theme.shape.borderRadius,
  paddingBlock: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  minHeight: "450px",
  width: "100%",
  border: `1px solid rgba(255, 255, 255, 0.1)`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    minHeight: "400px",
  },
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: "1.25rem",
  fontFamily: theme.typography.fontFamily,
  marginBottom: theme.spacing(3),
  textAlign: "center",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(8),
  minHeight: "300px",
}));

const fetchUsageStats = async (month) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: Replace with actual API call when backend is ready
  // Example:
  // const response = await fetch(`http://localhost:8080/api/usage-stats?month=${month}`)
  // if (!response.ok) throw new Error('Failed to fetch usage statistics')
  // return await response.json()

  return mockUsageStats.stats[month] || mockUsageStats.stats.March;
};

export default function UsageStatistics() {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchUsageStats(selectedMonth);
        setStats(data);
      } catch (err) {
        console.error("Error loading usage statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  if (loading) {
    return (
      <StyledContainer>
        <LoadingContainer>
          <CircularProgress sx={{ color: "white" }} />
        </LoadingContainer>
      </StyledContainer>
    );
  }

  if (!stats) {
    return null;
  }

  const pieData = [
    {
      id: 0,
      value: stats.pieChart.available,
      label: "Available",
      color: "#78BE20",
    },
    {
      id: 1,
      value: stats.pieChart.unavailable,
      label: "Unavailable",
      color: "#D22630",
    },
  ];

  const barCategories = ["Laptops", "Hotspots", "Tablets"];
  const barDataValues = [
    stats.barChart.laptops,
    stats.barChart.hotspots,
    stats.barChart.tablets,
  ];

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Usage Statistics</StyledTitle>
        <FilterWrapper>
          <FilterLabel>Select Month</FilterLabel>
          <StyledFormControl size="small">
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              displayEmpty
            >
              {mockUsageStats.months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </FilterWrapper>
      </StyledHeader>

      <ChartsContainer>
        <ChartWrapper>
          <ChartTitle>Device Availability</ChartTitle>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 50,
                  outerRadius: 110,
                  paddingAngle: 3,
                  cornerRadius: 8,
                  arcLabel: (item) => `${item.value}%`,
                  arcLabelMinAngle: 35,
                },
              ]}
              width={400}
              height={350}
              skipAnimation
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: { top: 20 },
                  itemMarkWidth: 16,
                  itemMarkHeight: 16,
                  markGap: 8,
                  itemGap: 20,
                },
              }}
              sx={{
                "& .MuiChartsLegend-series text": {
                  fill: "#FFFFFF !important",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: '"Manrope", "Nunito Sans", "Arial", sans-serif',
                },
                "& .MuiChartsLegend-mark": {
                  rx: 4,
                },
                "& .MuiChartsLegend-root": {
                  transform: "translateY(10px)",
                },
                "& .MuiChartsArcLabel-root": {
                  fill: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: '"Manrope", "Nunito Sans", "Arial", sans-serif',
                },
              }}
            />
          </Box>
        </ChartWrapper>

        <ChartWrapper>
          <ChartTitle>Device Usage by Type</ChartTitle>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <BarChart
              dataset={[
                { device: "Laptops", usage: barDataValues[0] },
                { device: "Hotspots", usage: barDataValues[1] },
                { device: "Tablets", usage: barDataValues[2] },
              ]}
              xAxis={[
                {
                  id: "devices",
                  dataKey: "device",
                  scaleType: "band",
                  tickLabelStyle: {
                    angle: 0,
                    textAnchor: "middle",
                    fontSize: 14,
                    fill: "#FFFFFF",
                    fontFamily: '"Manrope", "Nunito Sans", "Arial", sans-serif',
                  },
                },
              ]}
              yAxis={[
                {
                  id: "usage",
                  scaleType: "linear",
                  tickLabelStyle: {
                    fontSize: 14,
                    fill: "#FFFFFF",
                    fontFamily: '"Manrope", "Nunito Sans", "Arial", sans-serif',
                  },
                },
              ]}
              series={[
                {
                  dataKey: "usage",
                  label: "Laptops",
                  color: "#0072CE",
                  data: [barDataValues[0], null, null],
                },
                {
                  dataKey: "usage",
                  label: "Hotspots",
                  color: "#78BE20",
                  data: [null, barDataValues[1], null],
                },
                {
                  dataKey: "usage",
                  label: "Tablets",
                  color: "#D22630",
                  data: [null, null, barDataValues[2]],
                },
              ]}
              width={400}
              height={350}
              skipAnimation
              axisHighlight={{
                x: "none",
                y: "none",
              }}
              slotProps={{
                legend: {
                  hidden: true,
                },
              }}
              margin={{ top: 10, right: 20, bottom: 40, left: 50 }}
              sx={{
                "& .MuiChartsAxis-root .MuiChartsAxis-line": {
                  stroke: "#FFFFFF60",
                },
                "& .MuiChartsAxis-root .MuiChartsAxis-tick": {
                  stroke: "#FFFFFF60",
                },
                "& .MuiBarElement-root": {
                  strokeWidth: 2,
                  stroke: "#FFFFFF",
                },
              }}
            />
          </Box>
        </ChartWrapper>
      </ChartsContainer>
    </StyledContainer>
  );
}
