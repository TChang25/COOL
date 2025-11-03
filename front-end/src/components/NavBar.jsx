import { AppBar, Toolbar, IconButton, Box, Link } from "@mui/material";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { useAuth } from "../context/MockAuth";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import HelpModal from "../components/HelpModal";
import fullLogo from "../assets/fullCityLogo.png"
import fountainLogo from "../assets/fountainLogo2.png"

const NavBar = () => {
  const { user, logout } = useAuth();
  const role = user?.role || "Citizen";
  const location = useLocation();
  const navigate = useNavigate();

  const [helpOpen, setHelpOpen] = useState(false);

  // ✅ Show top bar on landing *and* sign-in pages
  const showTopBar =
    location.pathname === "/" || location.pathname === "/signIn";

  // ✅ Function to return navbar layout based on role
  const renderNavbar = () => {
    // 🌆 For Employees or Admins
    if (role !== "Citizen") {
      return (
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: "#0072CE" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link component={RouterLink} to="/">
              <Box
                component="img"
                sx={{
                  padding: "30px",
                  width: 150,
                }}
                alt="Fountain Logo"
                src={fountainLogo}
              />
            </Link>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingRight: "30px",
                width: 150,
              }}
            >
              <IconButton onClick={() => navigate("/admin")}>
                <SettingsOutlined
                  sx={{
                    color: "white",
                    fontSize: "5rem",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  logout(); // clear user
                  navigate("/"); // go back to landing
                }}
              >
                <AccountCircleOutlined
                  sx={{
                    color: "white",
                    fontSize: "5rem",
                  }}
                />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      );
    }

    // 🧍 For Citizens
    return (
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "#0072CE" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link component={RouterLink} to="/">
            <Box
              component="img"
              sx={{
                padding: "30px",
                width: 150,
              }}
              alt="Fountain Logo"
              src={fountainLogo}
            />
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: 225,
              padding: "55px 60px 55px 55px",
            }}
          >
            <Link
              component="button"
              color="inherit"
              underline="hover"
              sx={{
                fontSize: 30,
                fontWeight: "bold",
              }}
              onClick={() => setHelpOpen(true)}
            >
              HELP
            </Link>
            <Link
              onClick={() => navigate("/signIn")}
              component="button"
              color="inherit"
              underline="hover"
              sx={{
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              LOGIN
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <>
      {/* 🏙️ Show full logo on Landing + SignIn pages */}
      {showTopBar && (
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: "#0072CE", }}
        >
          <Toolbar>
            <Box
              component="img"
              sx={{
                padding: "40px",
                width: 500,
                margin: "auto",
              }}
              alt="City of Orlando Logo"
              src={fullLogo}
            />
          </Toolbar>
        </AppBar>
      )}

      {/* 🔄 Show role-based navbar for all other pages */}
      {!showTopBar && renderNavbar()}
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
};

export default NavBar;
