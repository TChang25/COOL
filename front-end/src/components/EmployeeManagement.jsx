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
  styled,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material"
import mockEmployeesData from "../data/mockEmployees.json"

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  margin: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}))

const StyledTable = styled(Table)(({ theme }) => ({
  tableLayout: "auto",
  borderCollapse: "collapse",
  "& .MuiTableCell-root": {
    borderRight: `1px solid ${theme.palette.primary.contrastText}40`,
    "&:last-of-type": {
      borderRight: "none",
    },
  },
}))

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
}))

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
    borderBottom: `1px solid ${theme.palette.primary.contrastText}40`,
  },
}))

const StyledNameCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
}))

const StyledCenteredCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
}))

const StyledActionCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  verticalAlign: "middle",
  fontFamily: theme.typography.fontFamily,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isDeactivate",
})(({ theme, isDeactivate }) => ({
  backgroundColor: isDeactivate ? theme.palette.error.main : theme.palette.success.main,
  color: isDeactivate ? theme.palette.error.contrastText : theme.palette.success.contrastText,
  textTransform: "none",
  fontWeight: 600,
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  fontSize: theme.typography.body1.fontSize,
  whiteSpace: "nowrap",
  fontFamily: theme.typography.fontFamily,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  minWidth: "auto",
  "&:hover": {
    backgroundColor: isDeactivate ? theme.palette.error.main : theme.palette.success.main,
    boxShadow: theme.shadows[1],
    opacity: 0.9,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.2rem",
    marginLeft: 0,
  },
  "& .MuiButton-endIcon": {
    marginLeft: theme.spacing(0.5),
    marginRight: 0,
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

const fetchEmployeeData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // TODO: Replace with actual API call when backend is ready
  // Example:
  // const response = await fetch('http://localhost:8080/api/employees')
  // if (!response.ok) throw new Error('Failed to fetch employee data')
  // return await response.json()
  
  return mockEmployeesData
}

export default function EmployeeManagement() {
  const [employeeData, setEmployeeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchEmployeeData()
        setEmployeeData(data)
      } catch (err) {
        setError(err.message || "Failed to load employee data")
        console.error("Error loading employee data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadEmployeeData()
  }, [])

  const updateEmployeeStatus = async (employeeId, newStatus) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // TODO: Replace with actual API call when backend is ready
    // Example:
    // const response = await fetch(`http://localhost:8080/api/employees/${employeeId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus })
    // })
    // if (!response.ok) throw new Error('Failed to update employee status')
    // return await response.json()
    
    return { success: true }
  }

  const handleActionClick = async (employeeId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active"
    
    try {
      await updateEmployeeStatus(employeeId, newStatus)
      
      setEmployeeData((prevData) =>
        prevData.map((employee) =>
          employee.id === employeeId
            ? { ...employee, status: newStatus }
            : employee
        )
      )
    } catch (err) {
      console.error("Error updating employee status:", err)
      setError("Failed to update employee status")
    }
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
            Error Loading Employees
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </ErrorContainer>
      </StyledTableContainer>
    )
  }

  if (!employeeData || employeeData.length === 0) {
    return (
      <StyledTableContainer component={Paper}>
        <ErrorContainer>
          <Typography variant="h6">
            No employee data available
          </Typography>
        </ErrorContainer>
      </StyledTableContainer>
    )
  }

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <StyledTableHead>
          <TableTitleRow>
            <TableCell colSpan={5}>Employee Management</TableCell>
          </TableTitleRow>
          <TableRow>
            <StyledCenteredCell>Name</StyledCenteredCell>
            <StyledCenteredCell>Role</StyledCenteredCell>
            <StyledCenteredCell>Center</StyledCenteredCell>
            <StyledCenteredCell>Status</StyledCenteredCell>
            <StyledCenteredCell>Action</StyledCenteredCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {employeeData.map((employee) => (
            <StyledTableRow key={employee.id}>
              <StyledNameCell>{employee.name}</StyledNameCell>
              <StyledCenteredCell>{employee.role}</StyledCenteredCell>
              <StyledCenteredCell>{employee.center}</StyledCenteredCell>
              <StyledCenteredCell>{employee.status}</StyledCenteredCell>
              <StyledActionCell>
                <ActionButton
                  variant="contained"
                  onClick={() => handleActionClick(employee.id, employee.status)}
                  isDeactivate={employee.status === "Active"}
                >
                  {employee.status === "Active" ? "Deactivate" : "Reactivate"}
                </ActionButton>
              </StyledActionCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  )
}

