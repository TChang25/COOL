import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  styled,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material"
import mockDevicesData from "../data/mockDevices.json"

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  margin: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}))

const StyledTable = styled(Table)({
  tableLayout: "auto",
  "& .MuiTableCell-root": {
    borderRight: "none",
    borderLeft: "none",
    borderTop: "none",
    borderBottom: "none",
  },
})

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
}))

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
  },
}))

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
  borderBottom: "none",
}))

const StyledFirstHeaderCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
  borderBottom: "none",
}))

const StyledDeviceCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
}))

const StyledCenteredCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
  "& > *": {
    margin: "0 auto",
  },
}))

const AvailableChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  fontWeight: 500,
  width: "120px",
  fontFamily: theme.typography.fontFamily,
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
}))

const NotAvailableChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: 500,
  width: "120px",
  fontFamily: theme.typography.fontFamily,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
  },
}))

const ViewButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  textTransform: "none",
  fontWeight: 600,
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  fontSize: theme.typography.body2.fontSize,
  whiteSpace: "nowrap",
  width: "160px",
  fontFamily: theme.typography.fontFamily,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(8),
  minHeight: "200px",
}))

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(8),
  minHeight: "200px",
  fontFamily: theme.typography.fontFamily,
}))

const fetchDeviceData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // TODO: Replace with actual API call when backend is ready
  // Example:
  // const response = await fetch('http://localhost:8080/api/my-devices/device')
  // if (!response.ok) throw new Error('Failed to fetch devices')
  // return await response.json()
  
  return mockDevicesData
}

export default function DeviceTable() {
  const [deviceData, setDeviceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDeviceData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchDeviceData()
        setDeviceData(data)
      } catch (err) {
        setError(err.message || "Failed to load device data")
        console.error("Error loading device data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadDeviceData()
  }, [])

  const handleViewInformation = (deviceId) => {
    console.log(`View information for device: ${deviceId}`)
  }

  if (loading) {
    return (
      <StyledTableContainer component={Paper}>
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </StyledTableContainer>
    )
  }

  if (error) {
    return (
      <StyledTableContainer component={Paper}>
        <ErrorContainer>
          <Typography variant="h6" color="error">
            Error Loading Devices
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </ErrorContainer>
      </StyledTableContainer>
    )
  }

  if (!deviceData || deviceData.length === 0) {
    return (
      <StyledTableContainer component={Paper}>
        <ErrorContainer>
          <Typography variant="h6">
            No devices available
          </Typography>
        </ErrorContainer>
      </StyledTableContainer>
    )
  }

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            <StyledFirstHeaderCell>Device</StyledFirstHeaderCell>
            <StyledHeaderCell>Device ID</StyledHeaderCell>
            <StyledHeaderCell>Availability Status</StyledHeaderCell>
            <StyledHeaderCell>Action</StyledHeaderCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {deviceData.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledDeviceCell>
                {row.id}. {row.device}
              </StyledDeviceCell>
              <StyledCenteredCell>{row.deviceId}</StyledCenteredCell>
              <StyledCenteredCell>
                {row.available ? <AvailableChip label="Available" /> : <NotAvailableChip label="Not Available" />}
              </StyledCenteredCell>
              <StyledCenteredCell>
                <ViewButton variant="contained" onClick={() => handleViewInformation(row.deviceId)}>
                  View Information
                </ViewButton>
              </StyledCenteredCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  )
}
