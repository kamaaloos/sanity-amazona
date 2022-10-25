import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { Button, Card, CircularProgress, Grid, Link, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import classes from '../utils/classes';
import { Store } from '../utils/store';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import {getError} from '../utils/error';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import axios from 'axios';


 function PlaceOrderScreen() {
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState(false)  
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod }
    } = state;

    const round2 = (num) => Math.round(num*100 + Number.EPSILON)/100;
    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  
    useEffect(() => {
        if(!paymentMethod){
            router.push('/payment');
        }
        if(cartItems.length === 0){
            router.push('/cart');
        }
    }, [cartItems, paymentMethod, router]);
  
    const placeholderHanler =async () => {
        
        try {
            setLoading(true);
            const {data} = await axios.post(
                'api/orders',
                {
                    orderItems: cartItems.map((x) =>({
                        ...x,
                        countInStock: undefined,
                        slug: undefined,
                    })),

                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }  
            ); 
            dispatch({ type: 'CART_CLEAR'});
            Cookies.remove('cartItemes'); 
            setLoading(false);
            router.push(`/order/${data}`); 
        } catch (error) {
            setLoading(false);
            enqueueSnackbar(getError(error), {variant: 'error'});
        }
    };

    return (
    <Layout title="Place Order">
        <CheckoutWizard activeStep={3}></CheckoutWizard>
        <Typography component="h1" variant="h1">
            Place Order
        </Typography>
        <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
                <Card sx={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h2" variant="h2">
                                Shipping Address
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                            {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                            {shippingAddress.country}
                        </ListItem>
                        <ListItem>
                            <Button onClick={() => router.push('/shipping')} variant="contained" color="secondary">Edit</Button>
                        </ListItem>
                    </List>
                </Card>
                <Card sx={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h2" variant="h2">
                                Payment Method
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {paymentMethod}
                        </ListItem>
                        <ListItem>
                            <Button onClick={() => router.push('/payment')} variant="contained" color="secondary">Edit</Button>
                        </ListItem>
                    </List>
                </Card>
                <Card sx={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h2" variant="h2">
                                Order Items
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((item) =>(
                                            <TableRow key={item._key}>
                                                <TableCell>
                                                    <NextLink href={`/product/${item.slug}`} passHref>
                                                        <Image 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}></Image>
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell>
                                                    <NextLink href={`/product/${item.slug}`} passHref>
                                                        <Link>
                                                            <Typography>{item.name}</Typography>
                                                        </Link>
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <NextLink href={`/product/${item.slug}`} passHref>
                                                        <Link>
                                                            <Typography>{item.quantity}</Typography>
                                                        </Link>
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <NextLink href={`/product/${item.slug}`} passHref>
                                                        <Link>
                                                            <Typography>${item.price}</Typography>
                                                        </Link>
                                                    </NextLink>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item md={3} xs={12}>
                <Card sx={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h2" variant="h2">Order Summary</Typography>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography>Items:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align="right">${itemsPrice}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography>Shipping:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align="right">${shippingPrice}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography>Total:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align="right">${totalPrice}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Button 
                                onClick={placeholderHanler}
                                type="button"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                >
                                Place Order
                            </Button>
                        </ListItem>
                        {loading && (
                            <ListItem>
                                <CircularProgress />
                            </ListItem>
                        )}
                    </List>
                </Card>
            </Grid>
        </Grid>
    </Layout>
  )
}
export default dynamic(() => Promise.resolve(PlaceOrderScreen), {ssr: false});