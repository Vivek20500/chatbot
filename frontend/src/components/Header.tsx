import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none"}}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1rem",
        }}
      >
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="white"
                to="/chat"
                text="Chat"
                textColor="black"
              ></NavigationLink>
              <NavigationLink
                bg="black"
                to=""
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              ></NavigationLink>
            </>
          ) : (
            <>
              <NavigationLink
                bg="black"
                to="/login"
                text="Login"
                textColor="white"
              ></NavigationLink>
              <NavigationLink
                bg="white"
                to="/signup"
                text="Signup"
                textColor="black"
              ></NavigationLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
