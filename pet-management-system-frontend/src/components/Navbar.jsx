import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Pet Management System
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* 🔹 Right Side */}
        {!user ? (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        ) : (
          <>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                {user.role?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              {user.role === "admin" && (
                <MenuItem
                  onClick={() => {
                    navigate("/admin");
                    handleMenuClose();
                  }}
                >
                  Admin Panel
                </MenuItem>
              )}

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
