import { Button, Link, List, ListItem, TextField, Typography } from '@mui/material';
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import Form from '../components/Form';
import Layout from '../components/Layout';
import NextLink  from 'next/link';

export default function RegisterScreen() {
    const { handleSubmit, control, formState: {errors}} = useForm();
    const submitHandler = async({name, email, password, confirmPassword}) => {};
  return (
    <Layout title="Register">
      <Form onSubmit={handleSubmit(submitHandler)}>
          <Typography componet="h1" variant="h1">
              Register
          </Typography>
          <List>
              <ListItem>
                <Controller 
                      name="name" 
                      control={control} 
                      defaultValue=""
                      rules={{ required: true, minLength: 2}}
                      render={({field}) => (
                        <TextField variant="outlined" fullWidth id="name" label="Name" 
                          inputProps={{type: 'text'}}
                          error={Boolean(errors.name)}
                          helperText={
                            errors.name 
                            ? errors.email.type === minLength 
                              ? 'Name is not valid' 
                              : 'Please enter a valid name' 
                            : ''}
                            {...field}
                            ></TextField>
                      )}
                      
                      >

                </Controller>
              </ListItem> 
              <ListItem>
                <Controller 
                      name="email" 
                      control={control} 
                      defaultValue=""
                      rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
                      render={({field}) => (
                        <TextField variant="outlined" fullWidth id="email" label="Email" 
                          inputProps={{type: 'email'}}
                          error={Boolean(errors.email)}
                          helperText={
                            errors.email 
                            ? errors.email.type === 'pattern' 
                              ? 'Email is not valid' 
                              : 'Please enter a valid email' 
                            : ''}
                            {...field}
                            ></TextField>
                      )}
                      
                      >

                </Controller>
              </ListItem> 
              <ListItem>
                <Controller 
                      name="password" 
                      control={control} 
                      defaultValue=""
                      rules={{ required: true, 
                      minLength: 6
                      }}
                      render={({field}) => (
                        <TextField variant="outlined" fullWidth 
                          id="password" label="Password" 
                          inputProps={{type: 'password'}}
                          error={Boolean(errors.password)}
                          helperText={
                            errors.password 
                            ? errors.password.type === minLength 
                              ? 'Password length should be more than 5 characters' 
                              : 'Password is required' 
                            : ''}
                            {...field}
                            ></TextField>
                        )}
                    ></Controller>
              </ListItem>
              <ListItem>
                <Controller 
                      name="confirmPassword" 
                      control={control} 
                      defaultValue=""
                      rules={{ required: true, 
                      minLength: 6
                      }}
                      render={({field}) => (
                        <TextField variant="outlined" fullWidth 
                          id="confirmPassword" label="Confirm Password" 
                          inputProps={{type: 'password'}}
                          error={Boolean(errors.confirmPassword)}
                          helperText={
                            errors.confirmPassword 
                            ? errors.confirmPassword.type === minLength 
                              ? 'confirmPassword length should be more than 5 characters' 
                              : 'ConfirmPassword is required' 
                            : ''}
                            {...field}
                            ></TextField>
                        )}
                    ></Controller>
              </ListItem>
              <ListItem>
                <Button variant="contained" type="submit" color="primary" fullWidth>
                  Register
                </Button>
              </ListItem>
              <ListItem>
                You have an account 
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              </ListItem> 
          </List>
      </Form>
    </Layout>
  )
}
