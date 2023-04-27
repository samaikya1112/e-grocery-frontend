import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PhoneIcon from "@mui/icons-material/Phone";
import Logout from "@mui/icons-material/Logout";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
const navStyle = {
  backgroundColor: "black",
  color: "white",
  padding: "0.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
};

const navLinksStyle = {
  display: "flex",
  listStyleType: "none",
  margin: 0,
  padding: 0,
  justifyContent: "space-between",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 1rem",
  transition: "color 0.3s ease-in-out",
  cursor: "pointer",
};
const cart = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "5rem",
  left: "auto",
  fontSize: "30px",
  cursor: "pointer",
  color: "white",
};
const wishlist = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "8rem",
  left: "auto",
  fontSize: "30px",
  cursor: "pointer",
  color: "white",
};

function Nav() {
  const userLoginStatus = localStorage.getItem("status");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("username");
  const userMobileNumber = localStorage.getItem("mobileNumber");
  const avatar = userName ? userName.charAt(0).toUpperCase() : "";
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    window.location.href = "/logout";
  };
  const handleHead = () => {
    window.location.href = "/products";
  };
  const handleHeadAdmin = () => {
    window.location.href = "/viewproducts";
  };
  const handleResetpassword = () => {
    window.location.href = "/resetpassword";
  };
  const handleOrder = () => {
    window.location.href = "/allorders";
  };
  const handleCustomerOrder = () => {
    window.location.href = "/viewordersbyusername";
  };

  const open = Boolean(dropdown);
  const handleClick = (event) => {
    setDropdown(event.currentTarget);
  };
  const handleClose = () => {
    setDropdown(false);
  };

  return (
    <div style={navStyle}>
      {!userLoginStatus && (
        <ul style={navLinksStyle}>
          <h6>E-GROCERY</h6>
          <li style={{ marginLeft: "900px" }}>
            <Link style={linkStyle} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/register">
              Register
            </Link>
          </li>
        </ul>
      )}
      {userRole === "CUSTOMER" ? (
        <ul style={navLinksStyle}>
          <Link
            style={{ marginTop: "5px", textDecoration: "none", color: "white" }}
            onClick={handleHead}
          >
            <strong>E-GROCERY</strong>
          </Link>
          <a href="/cart">
            <i class="fa fa-shopping-cart" style={cart} aria-hidden="true"></i>
          </a>
          <a href="/wishlist">
            <i className="fa fa-heart" aria-hidden="true" style={wishlist}></i>
          </a>
          <li style={{ marginLeft: "1100px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account profile">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: "white",
                      border: "2px solid white",
                      color: "black",
                    }}
                  >
                    {avatar}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={dropdown}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                sx: {
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  }
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                {userName}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PhoneIcon style={{ opacity: 1.0 }} />
                </ListItemIcon>
                {userMobileNumber}
              </MenuItem>
              <MenuItem onClick={handleCustomerOrder}>
                <ListItemIcon>
                  <ShoppingBagIcon style={{ opacity: 1.0 }} />
                </ListItemIcon>
                My Orders
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleResetpassword}>
                <ListItemIcon>
                  <LockOpenIcon fontSize="small" style={{ opacity: 1.0 }} />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </li>
        </ul>
      ) : null}
      {userRole === "ADMIN" ? (
        <div>
          <ul style={navLinksStyle}>
            <Link
              style={{
                marginTop: "5px",
                textDecoration: "none",
                color: "white",
              }}
              onClick={handleHeadAdmin}
            >
              E-GROCERY
            </Link>
            <li style={{ marginLeft: "1100px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account profile">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: "white",
                        border: "2px solid white",
                        color: "black",
                      }}
                    >
                      {avatar}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={dropdown}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  sx: {
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    }
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  {userName}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PhoneIcon style={{ opacity: 1.0 }} />
                  </ListItemIcon>
                  {userMobileNumber}
                </MenuItem>
                <MenuItem onClick={handleOrder}>
                  <ListItemIcon>
                    <ShoppingBagIcon style={{ opacity: 1.0 }} />
                  </ListItemIcon>
                  Orders
                </MenuItem>
                <Divider />

                <MenuItem onClick={handleResetpassword}>
                  <ListItemIcon>
                    <LockOpenIcon fontSize="small" style={{ opacity: 1.0 }} />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Nav;
