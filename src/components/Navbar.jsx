import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/auth";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: "bold",
      textDecoration: "none",
      color: isActive ? "#001abede" : "#eee",
      borderBottom: isActive ? "2px solid #001abede" : "#eee",
      padding: "10px",
    };
  };
  const auth = useAuth();
  const navigate = useNavigate();
  const handlLogout = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <AppBar position="static" sx={{ bgcolor: "primary", mb: 5 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CIA
        </Typography>
        <Stack
          direction="row"
          color="primary"
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {!auth.user ? (
            <>
              <NavLink color="primary" style={navLinkStyles} to="/">
                Home
              </NavLink>
              <NavLink style={navLinkStyles} to="/about">
                About
              </NavLink>
              <NavLink style={navLinkStyles} to="/services">
                Services
              </NavLink>
              <NavLink style={navLinkStyles} to="/contact">
                Contact
              </NavLink>

              <NavLink style={navLinkStyles} to="/login">
                Login
              </NavLink>
            </>
          ) : (
            <Stack spacing={2} direction="row">
              <NavLink style={navLinkStyles} to="/users">
                Users
              </NavLink>
              <NavLink style={navLinkStyles} to="/profile">
                Profile
              </NavLink>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handlLogout}
              >
                Logout
              </Button>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
