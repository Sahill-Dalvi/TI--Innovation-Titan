import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavbarComp from "./Components/Navbar/navbarComp";
// Import the BasicUsage component
import theme from "./customTheme";
const App = () => {
  const location = useLocation();

  // Check if the current path is "/signup"
  const isSignupPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";
  const isLandingPage = location.pathname === "/";

  return (
    <ChakraProvider theme={theme}>
      <div className="app">
        {!isSignupPage && !isLoginPage && !isLandingPage && <NavbarComp />}
        {/* Your other components */}
        {/* <UserProvider>
          <NavbarComp />
          <SideBarDrawer />
          <FooterComp />
        </UserProvider> */}

        {/* Render the BasicUsage component */}

        {/* This is where the routing components will be rendered */}
        <Outlet />
      </div>
    </ChakraProvider>
  );
};

export default App;
