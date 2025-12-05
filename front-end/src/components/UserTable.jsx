import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
  CircularProgress,
} from "@mui/material";
import Button from "./Button";
import UserModal from "./UserModal";

const USERS_URL = "/api/app-users";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Load all users
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(USERS_URL);
        const json = await res.json();
        setUsers(Array.isArray(json) ? json : []);
      } catch (error) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    try {
      const res = await fetch(`${USERS_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed.");

      // FIX: userId is the correct field
      setUsers((prev) => prev.filter((u) => u.userId !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const roleToText = (role) => {
    if (!role) return "Unknown";
    return role.roleName || "Unknown";
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: "#0d74d1",
          borderRadius: 1,
          padding: 3,
          color: "#fff",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            All Users
          </Typography>

          {/* CREATE USER BUTTON */}
          <Button varianttype="create" route="/users/create">
            Create User
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ opacity: 0.9, mb: 2, color: "white" }}
        >
          Manage users and their roles
        </Typography>

        <Box sx={{ backgroundColor: "#3f8ada", padding: 2, borderRadius: 1 }}>
          {loading && (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Box sx={{ textAlign: "center", py: 2, color: "#ffcccc" }}>
              {error}
            </Box>
          )}

          {!loading && !error && (
            <TableContainer sx={{ maxHeight: 380 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={headerStyle}>Name</TableCell>
                    <TableCell sx={headerStyle}>Role</TableCell>
                    <TableCell sx={headerStyle}>Email</TableCell>
                    <TableCell sx={headerStyle}>Phone</TableCell>
                    <TableCell sx={headerStyle}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.userId}
                      sx={{
                        backgroundColor: "#0072ce",
                        "&:hover": { backgroundColor: "#3b8bd7" },
                      }}
                    >
                      {/* NAME → modal open */}
                      <TableCell sx={cellStyle}>
                        <span
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontWeight: 600,
                          }}
                          onClick={() => setSelectedUser(user)}
                        >
                          {user.fullName}
                        </span>
                      </TableCell>

                      <TableCell sx={cellStyle}>
                        {roleToText(user.role)}
                      </TableCell>

                      <TableCell sx={cellStyle}>{user.email}</TableCell>

                      <TableCell sx={cellStyle}>
                        {user.contactNumber || "—"}
                      </TableCell>

                      <TableCell sx={cellStyle}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            varianttype="edit"
                            route={`/users/edit/${user.userId}`}
                          >
                            Edit
                          </Button>

                          <Button
                            varianttype="delete"
                            onClick={() => handleDelete(user.userId)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}

                  {users.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{ textAlign: "center", py: 3 }}
                      >
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </TableContainer>

      {/* VIEW USER MODAL */}
      {selectedUser && (
        <UserModal
          open={true}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

const headerStyle = {
  fontWeight: 700,
  backgroundColor: "#3f8ada",
  color: "#fff",
  textAlign: "center",
};

const cellStyle = {
  color: "white",
  textAlign: "center",
};

export default UserTable;
