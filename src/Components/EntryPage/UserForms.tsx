import React, { useState, useContext } from "react";
import { FormControl, FormLabel, Input, Button, Heading, Flex, Box } from "@chakra-ui/react";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const UserForms = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const handleChange = ({ target: { name, value } }) =>
    setValues({
      ...values,
      [name]: value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = isRegistered
      ? `${process.env.REACT_APP_API_URL}/login`
      : `${process.env.REACT_APP_API_URL}/register`;

    const { data, error } = await axios.post(endpoint, values);

    if (error) return alert(error.message);

    if (data) {
      const { name, email } = data;
      login({ name, token: email });
    }
  };

  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box
        borderWidth={1}
        p={12}
        maxWidth='1000px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
      >
        <Heading mb={6}>{isRegistered ? "Welcome, please login" : "Register"}</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            {!isRegistered && (
              <>
                <FormLabel>Name</FormLabel>
                <Input type='text' value={values.name} name='name' onChange={handleChange} />
              </>
            )}
            <FormLabel>Email address</FormLabel>
            <Input type='text' value={values.email} name='email' onChange={handleChange} />
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={values.password}
              name='password'
              onChange={handleChange}
            />

            <Box mt={6}>
              <Button type='submit' mr={4}>
                Submit
              </Button>
              <Button onClick={() => setIsRegistered(!isRegistered)}>
                {isRegistered ? "Sign Up" : "Back to login"}
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default UserForms;
