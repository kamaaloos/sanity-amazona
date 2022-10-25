import { createTheme } from '@mui/material/styles';
import Head from 'next/head';
import { 
    AppBar, 
    Badge, 
    Box,
    Button,
    Container, 
    CssBaseline, 
    Link, 
    Menu, 
    MenuItem, 
    Switch, 
    ThemeProvider, 
    Toolbar, 
    Typography 
} from '@mui/material';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { Store } from '../utils/store';
import { useContext, useState } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';


export default function Layout({ title, description, children }){
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart, userInfo } = state;
    const router = useRouter();
    const theme = createTheme({
        components: {
            MuiLink: {
                defaultProps: {
                    underline: 'hover',
                },
            },
        },
        typography: {
            h1: { 
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: { 
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
        },
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080',
            },
        },
    });

    const darkModeChangeHandler = () => {
        dispatch({type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'});
        const newDarkMode = !darkMode;
        Cookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null);
        if (redirect) {
            router.push(redirect);
        }
    };
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        Cookie.remove('userInfo');
        Cookie.remove('cartItems');
        Cookie.remove('shippingAddress');
        Cookie.remove('paymentMethod');
        router.push('/');
    };
    return (
        <>
            <Head>
                <title>{title ? `${title}- Sanity Amazona` : 'Sanity Amazona'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={classes.appbar}>
                    <Toolbar sx={classes.toolbar}>
                        <Box display="flex" alignItems="center">
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography sx={classes.brand}>amazona</Typography>
                            </Link>
                        </NextLink>
                        </Box>
                        <Box>
                            <Switch 
                                checked={darkMode}
                                onClick={darkModeChangeHandler}>  
                            </Switch>
                            <NextLink href="/cart" passHref >
                                <Link>
                                    <Typography component="span">
                                        {cart.cartItems.length > 0 ? (
                                            <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>
                                        ) : (
                                            'Cart'
                                        )}
                                    </Typography>
                                </Link>
                            </NextLink>
                            {userInfo ? (
                                <>
                                    <Button 
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        sx={classes.navbarButton}
                                        onClick={loginClickHandler}>
                                        {userInfo.name}
                                    </Button>
                                    <Menu 
                                        id="simple-menu" 
                                        anchorEl={anchorEl}
                                        keepMounted 
                                        open={Boolean(anchorEl)}
                                        onClose = {loginMenuCloseHandler}>
                                        <MenuItem onClick={ (e) => loginMenuCloseHandler(e.preventDefault, '/profile') }>Profile</MenuItem>
                                        <MenuItem onClick={ (e) => logoutClickHandler(e.preventDefault, '/logout') }>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink> )}
                            
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container component="main" sx={classes.main} >{children}</Container>
                <Box component="footer" sx={classes.footer}>
                    <Typography>All rights reserved. Sanity Amazona</Typography>
                </Box>
            </ThemeProvider>
        </>
    )
}