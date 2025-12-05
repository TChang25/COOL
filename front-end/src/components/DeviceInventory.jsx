import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  styled,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

// ========== STYLED COMPONENTS ==========
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  margin: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

const StyledTable = styled(Table)(({ theme }) => ({
  tableLayout: "auto",
  borderCollapse: "collapse",
  "& .MuiTableCell-root": {
    borderRight: `1px solid ${theme.palette.primary.contrastText}40`,
    "&:last-of-type": {
      borderRight: "none",
    },
  },
}));

const TableTitleRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& .MuiTableCell-root": {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: theme.typography.h3.fontSize,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    textAlign: "center",
    verticalAlign: "middle",
    fontFamily: theme.typography.fontFamily,
    borderBottom: "none",
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& .MuiTableCell-head": {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: theme.typography.body1.fontSize,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    borderBottom: "none",
    textAlign: "center",
    verticalAlign: "middle",
    fontFamily: theme.typography.fontFamily,
  },
  "& .MuiTableRow-root": {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiTableCell-body": {
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.primary.contrastText,
    verticalAlign: "middle",
    fontFamily: theme.typography.fontFamily,
    borderBottom: `1px solid ${theme.palette.primary.contrastText}40`,
  },
}));

const StyledTableFooter = styled(TableFooter)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& .MuiTableCell-root": {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: theme.typography.body1.fontSize,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    borderBottom: "none",
    verticalAlign: "middle",
    fontFamily: theme.typography.fontFamily,
  },
}));

const StyledCenterNameCell = styled(TableCell)(({ theme }) => ({
  textAlign: "left",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
}));

const StyledCenteredCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
}));

const StyledFooterCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(8),
  minHeight: "200px",
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(8),
  minHeight: "200px",
  fontFamily: theme.typography.fontFamily,
}));

// ========== TRANSFORM DEVICE LIST → INVENTORY FORMAT ==========
function transformDevicesToInventory(devices) {
  const centers = {};

  devices.forEach((device) => {
    const centerName = device.location?.locationName || "Unknown Location";
    const type = device.type?.deviceTypeName || "Unknown";

    // ⭐ FIX: use deviceStatusId, not statusName (which is always "")
    const statusId = device.status?.deviceStatusId;
    const isAvailable = statusId === 1;

    if (!centers[centerName]) {
      centers[centerName] = {
        centerName,
        laptops: { available: 0, total: 0 },
        tablets: { available: 0, total: 0 },
        hotspots: { available: 0, total: 0 },
      };
    }

    const entry = centers[centerName];
    const lowerType = type.toLowerCase();

    if (lowerType.includes("laptop")) {
      entry.laptops.total++;
      if (isAvailable) entry.laptops.available++;
    }

    if (lowerType.includes("tablet")) {
      entry.tablets.total++;
      if (isAvailable) entry.tablets.available++;
    }

    if (lowerType.includes("hotspot")) {
      entry.hotspots.total++;
      if (isAvailable) entry.hotspots.available++;
    }
  });

  return Object.values(centers);
}



// ========== FETCH DEVICES FROM BACKEND ==========
const fetchInventoryData = async () => {
  const response = await fetch("/api/devices");

  if (!response.ok) {
    throw new Error("Failed to fetch inventory data");
  }

  const devices = await response.json();
  console.log("RAW DEVICE API RESPONSE:", devices); // 👈 IMPORTANT
  return transformDevicesToInventory(devices);
};

// ========== MAIN COMPONENT ==========
export default function DeviceInventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInventoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInventoryData();
        setInventoryData(data);
      } catch (err) {
        setError(err.message || "Failed to load inventory data");
        console.error("Error loading inventory data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInventoryData();
  }, []);

  if (loading) {
    return (
      <StyledTableContainer component={Paper}>
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </StyledTableContainer>
    );
  }

  if (error) {
    return (
      <StyledTableContainer component={Paper}>
        <ErrorContainer>
          <Typography variant="h6" color="error">
            Error Loading Inventory
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </ErrorContainer>
      </StyledTableContainer>
    );
  }

  if (!inventoryData || inventoryData.length === 0) {
    return (
      <StyledTableContainer component={Paper}>
        <ErrorContainer>
          <Typography variant="h6">No inventory data available</Typography>
        </ErrorContainer>
      </StyledTableContainer>
    );
  }

  const calculateTotals = (inventoryData) => {
    const totals = {
      laptops: { available: 0, total: 0 },
      tablets: { available: 0, total: 0 },
      hotspots: { available: 0, total: 0 },
    };

    inventoryData.forEach((center) => {
      totals.laptops.available += center.laptops.available;
      totals.laptops.total += center.laptops.total;
      totals.tablets.available += center.tablets.available;
      totals.tablets.total += center.tablets.total;
      totals.hotspots.available += center.hotspots.available;
      totals.hotspots.total += center.hotspots.total;
    });

    const totalAvailable =
      totals.laptops.available +
      totals.tablets.available +
      totals.hotspots.available;
    const totalDevices =
      totals.laptops.total + totals.tablets.total + totals.hotspots.total;

    totals.totalDevices = {
      available: totalAvailable,
      total: totalDevices,
      percentage:
        totalDevices > 0
          ? Math.round((totalAvailable / totalDevices) * 100)
          : 0,
    };

    totals.laptops.percentage =
      totals.laptops.total > 0
        ? Math.round((totals.laptops.available / totals.laptops.total) * 100)
        : 0;

    totals.tablets.percentage =
      totals.tablets.total > 0
        ? Math.round((totals.tablets.available / totals.tablets.total) * 100)
        : 0;

    totals.hotspots.percentage =
      totals.hotspots.total > 0
        ? Math.round((totals.hotspots.available / totals.hotspots.total) * 100)
        : 0;

    return totals;
  };

  const totals = calculateTotals(inventoryData);

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <StyledTableHead>
          <TableTitleRow>
            <TableCell colSpan={5}>Device Inventory</TableCell>
          </TableTitleRow>
          <TableRow>
            <StyledCenteredCell>Center Name</StyledCenteredCell>
            <StyledCenteredCell>Laptops (Avail/Total)</StyledCenteredCell>
            <StyledCenteredCell>Tablets (Avail/Total)</StyledCenteredCell>
            <StyledCenteredCell>Hotspots (Avail/Total)</StyledCenteredCell>
            <StyledCenteredCell>Total Devices (%)</StyledCenteredCell>
          </TableRow>
        </StyledTableHead>

        <TableBody>
          {inventoryData.map((center) => {
            const available =
              center.laptops.available +
              center.tablets.available +
              center.hotspots.available;

            const total =
              center.laptops.total +
              center.tablets.total +
              center.hotspots.total;

            const percent =
              total > 0 ? Math.round((available / total) * 100) : 0;

            return (
              <StyledTableRow key={center.centerName}>
                <StyledCenterNameCell>{center.centerName}</StyledCenterNameCell>
                <StyledCenteredCell>
                  {center.laptops.available}/{center.laptops.total}
                </StyledCenteredCell>
                <StyledCenteredCell>
                  {center.tablets.available}/{center.tablets.total}
                </StyledCenteredCell>
                <StyledCenteredCell>
                  {center.hotspots.available}/{center.hotspots.total}
                </StyledCenteredCell>
                <StyledCenteredCell>
                  {available}/{total} ({percent}%)
                </StyledCenteredCell>
              </StyledTableRow>
            );
          })}
        </TableBody>

        <StyledTableFooter>
          <TableRow>
            <StyledFooterCell></StyledFooterCell>
            <StyledFooterCell>
              {totals.laptops.available}/{totals.laptops.total} (
              {totals.laptops.percentage}%)
            </StyledFooterCell>
            <StyledFooterCell>
              {totals.tablets.available}/{totals.tablets.total} (
              {totals.tablets.percentage}%)
            </StyledFooterCell>
            <StyledFooterCell>
              {totals.hotspots.available}/{totals.hotspots.total} (
              {totals.hotspots.percentage}%)
            </StyledFooterCell>
            <StyledFooterCell>
              {totals.totalDevices.available}/{totals.totalDevices.total} (
              {totals.totalDevices.percentage}%)
            </StyledFooterCell>
          </TableRow>
        </StyledTableFooter>
      </StyledTable>
    </StyledTableContainer>
  );
}
