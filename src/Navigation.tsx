import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Flex, Spacer } from "@chakra-ui/react";

import { AuthContext } from './AuthProvider';

const Navigation = () => {
  const { auth, isLoggedIn, logout } = useContext(AuthContext);
  
  return (
    <Flex className='Navigation'>
      <NavLink className='chakra-link' to='/'>Go to Home</NavLink>
      <NavLink  className='chakra-link'to='/admin'>Go to Admin</NavLink>
      <Spacer />
      
      {isLoggedIn && (
        <>
        <div>Hello, {auth.name}</div>
        <Button onClick={logout} colorScheme='red'>Logout</Button>
        </>
      )}
    </Flex>
  );
}

export default Navigation;
