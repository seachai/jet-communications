import React, { useState, useContext } from 'react';
import {FormControl, FormLabel, FormHelperText, Input, Button} from '@chakra-ui/react'
// import dotenv from 'dotenv';
import axios from 'axios'

import { AuthContext } from '../../AuthProvider'
import { useInput } from '../../hooks';

// dotenv.config();

const UserForms = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {login} = useContext(AuthContext)

  const handleChange = ({target: {name, value}}) => setValues({
    ...values, 
    [name]: value
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    /**
     * Register user
     * Save user into DB
     * Receive a response back from express (User Data?)
     * 
     * 
     * Login user
     * Check if user exist in DB
     * Receive a response back from express (User Data?)
     * 
     */
    const endpoint = isRegistered ? 
      `${process.env.ENDPOINT}/login` : 
      `${process.env.ENDPOINT}/register`;
    
    // const result = await axios.post(endpoint, values);
    
    // if (result) login(result)

    // login({
    //   name: 'my name',
    //   token: values.email
    // })
  } 
  
  return (
    <div className='UserForms'>
      <h1>{isRegistered ? 'Welcome, please login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          {
            !isRegistered && (
              <> 
                <FormLabel>Name</FormLabel>
                <Input type='text' value={values.name} name="name" onChange={handleChange} />
              </>
            )
          }
          <FormLabel>Email address</FormLabel>
          <Input type='text' value={values.email} name='email' onChange={handleChange} />
          <FormLabel>Password</FormLabel>
          <Input type='password' value={values.password} name="password" onChange={handleChange} />
          
          <Button type='submit'>Submit</Button>
          
          <Button onClick={() => setIsRegistered(!isRegistered)}>
              {isRegistered ? 'Sign Up' : 'Back to login'}
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default UserForms;