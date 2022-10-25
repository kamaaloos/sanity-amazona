import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Button, 
  Link, 
  List, 
  ListItem, 
  TextField, 
  Typography 
} from '@mui/material';
import Form from '../components/Form';
import Layout from '../components/Layout';
import NextLink  from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import {getError} from '../utils/error';

export default function LoginScreen() {
    const { state, dispatch} = useContext(Store);
    const {enqueueSnackbar} = useSnackbar();
    const { userInfo } = state;
    const router = useRouter();
    const { redirect } = router.query;
    useEffect(() => {
      if(userInfo){
        router.push(redirect || '/');
      }
    }, [router, userInfo, redirect]);
    const { 
      handleSubmit, 
      control, 
      formState: {errors}
    } = useForm();

    const submitHandler = async({email, password}) => {
      try {
        const { data } = await axios.post('/api/users/login', {
          email, password,
        });
        dispatch({ type: 'USER_LOGIN', payload: data });
        Cookies.set('userInfo', JSON.stringify(data));
        router.push(redirect || '/');
      } catch (error) {
      
        enqueueSnackbar(getError(error), {variant: 'error'});
      }
    };
  return (
    <Layout title="Login">
      <Form onSubmit={handleSubmit(submitHandler)}>
          <Typography componet="h1" variant="h1">
              Login
          </Typography>
          <List>
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
                            ? errors.password.type === 'minLength' 
                              ? 'Password length should be more than 5 characters' 
                              : 'Password is required' 
                            : ''}
                            {...field}
                            ></TextField>
                        )}
                    ></Controller>
              </ListItem>
              <ListItem>
                <Button variant="contained" type="submit" color="primary" fullWidth>
                  Login
                </Button>
              </ListItem>
              <ListItem>
                Do not have an account 
                <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                  <Link>Register</Link>
                </NextLink>
              </ListItem> 
          </List>
      </Form>
    </Layout>
  )
}
