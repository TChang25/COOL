import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import Button from "./Button";

//helpers
//formats the "start" and "due" dates
function formatDate(value) {
  if (!value) return "—";
  const parts = String(value).split(/[T ]/);
  return parts[0] || String(value);
}

//formats the damage fees
function formatCurrency(value) {
  if (value === null || value === undefined) return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `$${num.toFixed(2)}`;
}

const LoanTable = () => {
  const [loans, setLoans] = useState([]);
  const [appUsers, setAppUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const LOANS_URL = "/api/loans";
  const USERS_URL = "/api/app-users";

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError("");

      try {
        // 1) LOANS (critical)
        const loansRes = await fetch(LOANS_URL, {
          headers: { Accept: "application/json" },
        });

        const loansContentType = loansRes.headers.get("content-type") || "";
        let loansJson;
        if (loansContentType.includes("application/json")) {
          loansJson = await loansRes.json();
        } else {
          const text = await loansRes.text();
          console.error("Non-JSON response from /api/loans:", text);
          throw new Error(`Server returned a non-JSON response (status ${loansRes.status}).`);
        }

        if (!loansRes.ok) {
          const msg =
            loansJson.error || loansJson.message || `Request failed with status ${loansRes.status}`;
          throw new Error(msg);
        }

        const loansData = Array.isArray(loansJson.data)
          ? loansJson.data
          : Array.isArray(loansJson)
          ? loansJson
          : [];
        setLoans(loansData);

        // 2) APP USERS (for citizen/employee names) – non-fatal if it fails
        try {
          const usersRes = await fetch(USERS_URL, {
            headers: { Accept: "application/json" },
          });
          const usersContentType = usersRes.headers.get("content-type") || "";
          if (usersContentType.includes("application/json")) {
            const usersJson = await usersRes.json();
            setAppUsers(Array.isArray(usersJson) ? usersJson : []);
          } else {
            const text = await usersRes.text();
            console.warn("Non-JSON response from /api/app-users:", text);
          }
        } catch (userErr) {
          console.warn("Failed to load app users:", userErr);
        }
      } catch (err) {
        console.error("Error fetching loans:", err);
        setError(err.message || "Unable to load loans.");
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [LOANS_URL, USERS_URL]);

  // Map: userId -> fullName
  const userNameById = useMemo(() => {
    const map = {};
    appUsers.forEach((u) => {
      let id = null;
      if (u.userId != null) id = u.userId;
      if (id == null) return;
      let name = u.fullName;
      if (!name) name = `User ${id}`;
      map[id] = name;
    });

    return map;
  }, [appUsers]);

  //calculates the totals for each status
  const statusTotals = useMemo(() => {
    const totals = { total: loans.length };
    loans.forEach((loan) => {
      const status = loan.loan_status_name || "Unknown";
      if (totals[status] === undefined) totals[status] = 0;
      totals[status] += 1;
    });
    return totals;
  }, [loans]);

  //logic for the delete button
  const handleDelete = async (loanId) => {
    if (!loanId) return;
    const confirmed = window.confirm("Are you sure you want to delete this loan record?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${LOANS_URL}/${loanId}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = json.error || json.message || "Unable to delete loan.";
        throw new Error(msg);
      }

      setLoans((prev) => prev.filter((loan) => loan.loan_id !== loanId));
    } catch (err) {
      setError(err.message || "Unable to delete loan.");
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        background: "#0d74d1",
        borderRadius: 1,
        padding: 3,
        color: "#fff",
      }}
    >
      <Typography variant="h5" align="center" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 1 }}>
        Loans
      </Typography>

      <Typography variant="body2" align="center" sx={{ opacity: 0.9, mb: 2, color: "white" }}>
        Active and historical device loans across all community centers
      </Typography>

      <Box
        sx={{
          backgroundColor: "#3f8ada",
          borderRadius: 1,
          padding: 2,
        }}
      >
        {loading && (
          <Box
            sx={{
              py: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={32} />
          </Box>
        )}

        {!loading && error && (
          <Box sx={{ py: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#ffcccc" }}>
              {error}
            </Typography>
          </Box>
        )}

        {!loading && !error && (
          <TableContainer
            sx={{
              maxHeight: 380,
              borderRadius: 1,
              overflow: "auto",
              backgroundColor: "#3f8ada",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Table stickyHeader size="small" aria-label="loan table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Loan ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Bin ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Citizen
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Employee
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Start
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Due
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Returned
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Damage Fee
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Accessories Returned?
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#3f8ada",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loans.map((loan) => {
                  const {
                    loan_id,
                    bin_id,
                    citizen_id,
                    employee_id,
                    loan_status_name,
                    start_at,
                    due_at,
                    returned_at,
                    damage_fee,
                    all_accessories_returned,
                  } = loan;

                  const citizenLabel = userNameById[citizen_id] || citizen_id || "—";
                  const employeeLabel = userNameById[employee_id] || employee_id || "—";

                  return (
                    <TableRow
                      key={loan_id}
                      sx={{
                        backgroundColor: "#0072ce",
                        "&:hover": {
                          backgroundColor: "#3b8bd7", // Change background on hover
                          color: "black",
                        },
                      }}
                    >
                      <TableCell sx={{ textAlign: "center", fontWeight: 600, color: "white" }}>
                        {loan_id}
                      </TableCell>

                      {/* Bin ID */}
                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {bin_id ?? "—"}
                      </TableCell>

                      {/* Citizen name */}
                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {citizenLabel}
                      </TableCell>

                      {/* Employee name */}
                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {employeeLabel}
                      </TableCell>

                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontWeight: 600,
                          color:
                            loan_status_name === "Overdue"
                              ? "#da323c"
                              : loan_status_name === "Open"
                              ? "#E68A00"
                              : loan_status_name === "Returned"
                              ? "#43B548"
                              : "#333",
                        }}
                      >
                        {loan_status_name || "—"}
                      </TableCell>

                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {formatDate(start_at)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {formatDate(due_at)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {formatDate(returned_at)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {formatCurrency(damage_fee)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", color: "white" }}>
                        {all_accessories_returned === null || all_accessories_returned === undefined
                          ? "—"
                          : all_accessories_returned
                          ? "Yes"
                          : "No"}
                      </TableCell>

                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Button varianttype="delete" onClick={() => handleDelete(loan_id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {loans.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={11} sx={{ textAlign: "center", py: 3 }}>
                      No loans found.
                    </TableCell>
                  </TableRow>
                )}

                {loans.length > 0 && (
                  <TableRow
                    sx={{
                      backgroundColor: "rgba(13,116,209,0.08)",
                      "& td": { fontWeight: 600 },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>Total: {statusTotals.total}</TableCell>
                    <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                      | Open: {statusTotals.Open || 0} | Returned: {statusTotals.Returned || 0} |
                      Overdue: {statusTotals.Overdue || 0} | Lost: {statusTotals.Lost || 0} |
                      Cancelled: {statusTotals.Cancelled || 0} |
                    </TableCell>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </TableContainer>
  );
};

export default LoanTable;
