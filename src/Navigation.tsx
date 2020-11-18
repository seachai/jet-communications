import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Flex, Box, Heading, Text } from "@chakra-ui/react";

import { AuthContext } from "./context/AuthContext";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Navigation = () => {
  const { auth, isLoggedIn, logout } = useContext(AuthContext);

  const userName = auth.name.charAt(0).toUpperCase() + auth.name.slice(1);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="blue.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <NavLink className='chakra-link' to='/'>
            JigglyPuff
          </NavLink>
        </Heading>
      </Flex>

      {isLoggedIn && (
        <Box
          display={{ sm: "block", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          flex="none"
        >
          <MenuItems>
            <NavLink className='chakra-link' to='/admin'>
              Admin
            </NavLink>
          </MenuItems>
          <MenuItems>Hello, {userName}</MenuItems>
          <MenuItems>
            <Button onClick={logout} bg="transparent" border="1px">
              Logout
            </Button>
          </MenuItems>
        </Box>
      )}
    </Flex>
  );
};

export default Navigation;
