import * as React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { onDrawerToggle } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleBillingHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBillingClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleBillingClose();
  };

  const tabValue = (() => {
    if (location.pathname.startsWith("/reception/registration")) return 0;
    if (location.pathname.startsWith("/reception/management")) return 1;
    if (location.pathname.startsWith("/reception/appointment")) return 2;
    if (
      location.pathname.startsWith("/reception/billing") ||
      location.pathname.startsWith("/reception/generate-bill") ||
      location.pathname.startsWith("/reception/bill-history")
    )
      return 3;
    return false;
  })();

  const tabStyle = {
    color: lightColor,
    fontWeight: 500,
    "&:hover": {
      color: "#ffffff",
    },
    "&.Mui-selected": {
      color: "#ffffff",
    },
  };

  return (
    <>
      {/* Top App Bar */}
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  fontFamily:
                    "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                }}
              >
                MediTrack
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Reception & Tabs Combined Bar */}
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ px: 3, py: 2 }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            minHeight: "64px",
          }}
        >
          {/* Reception Heading */}
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.1rem",
              fontFamily:
                "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
              color: "#fff",
              fontSize: 39,
              pb: 0.5,
            }}
          >
            Reception
          </Typography>

          {/* Right Tabs */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tabs value={tabValue} textColor="inherit">
              <Tab
                label="Patient Registration"
                onClick={() => navigate("/reception/registration")}
                sx={{ ...tabStyle, mr: 4 }}
              />
              <Tab
                label="Patient Management"
                onClick={() => navigate("/reception/management")}
                sx={{ ...tabStyle, mr: 4 }}
              />
              <Tab
                label="Appointment"
                onClick={() => navigate("/reception/appointment")}
                sx={{ ...tabStyle, mr: 4 }}
              />
              <Tab
                label="Billing"
                aria-controls={open ? "billing-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onMouseEnter={handleBillingHover}
                sx={{ ...tabStyle }}
              />
            </Tabs>

            <Menu
              id="billing-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleBillingClose}
              MenuListProps={{ onMouseLeave: handleBillingClose }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => handleMenuItemClick("/reception/generate-bill")}
              >
                Generate Bill
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick("/reception/bill-history")}
              >
                Bill History
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
