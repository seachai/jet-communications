import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Flex, Spacer, Box, Heading, Text } from "@chakra-ui/react";

import { AuthContext } from "./context/AuthContext";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Navigation = () => {
  const { auth, isLoggedIn, logout } = useContext(AuthContext);

  console.log({ auth });
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
          JigglyPuff
        </Heading>
      </Flex>
      <Box
        display={{ sm: "block", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <NavLink className='chakra-link' to='/'>
            Home
          </NavLink>
        </MenuItems>
        <MenuItems>
          <NavLink className='chakra-link' to='/admin'>
            Go to Admin
          </NavLink>
        </MenuItems>
      </Box>

      {isLoggedIn && (
        <>
          <Box
            display={{ sm: "block", md: "flex" }}
            width={{ sm: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
          >
            <MenuItems>Hello, {auth.name}</MenuItems>
            <MenuItems>
              <Button onClick={logout} colorScheme='red'>
                Logout
              </Button>
            </MenuItems>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Navigation;
