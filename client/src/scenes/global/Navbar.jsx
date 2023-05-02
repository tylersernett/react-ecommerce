import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Badge, Box, IconButton, Link, Typography, AppBar, Container, Toolbar, Menu, Button, MenuItem, useMediaQuery } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";

const pages = ['Shop', 'Events', 'Appointments'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const isMedScreen = useMediaQuery("(min-width:900px)");
    const isSmlScreen = useMediaQuery("(min-width:800px)");
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart); //state.sliceName.prop
    const totalCount = cart.reduce((total, item) => {
        return total + item.count
    }, 0);

    return (
        <AppBar position="fixed"  >
            <Container maxWidth="xl">
                <Toolbar disableGutters width="80%"
                    margin="auto"
                    display="flex"
                    alignitems="center">

                    {/* TITLE============================================= */}
                    <Typography
                        variant={isSmlScreen ? "h1" : "h3"}
                        onClick={() => navigate("/")}
                        sx={{
                            display: 'flex',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: shades.secondary[500],
                            textDecoration: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <Link component={RouterLink} to={'/'} color='inherit' underline="none">THE HOOD</Link>
                    </Typography>

                    {/* DESKTOP NAV============================================= */}
                    <Box
                        pr='20px'
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
                        display="flex"
                        justifyContent="right"
                        columnGap={isSmlScreen ? "30px" : "15px"}
                        zIndex="2"
                    >
                        {pages.map((page) => (
                            <NavLink key={page} to={`/${page}`} style={{ textDecoration: 'none', color: 'white' }} tabIndex="-1">
                                <Button
                                    onClick={handleCloseNavMenu} //to ensure scroll doesn't get locked if user transitions from small to large window
                                    sx={{ my: 2, color: 'white', display: 'block', backgroundColor: 'transparent' }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    {/* MOBILE NAV============================================= */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
                        display="flex"
                        justifyContent="right"
                        columnGap="30px"
                        zIndex="2"
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page}
                                    onClick={handleCloseNavMenu}
                                    component={RouterLink}
                                    to={`/${page}`}
                                >
                                    {page}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* CART============================================= */}
                    <Box>
                        <Badge
                            badgeContent={totalCount}
                            color="secondary"
                            invisible={cart.length === 0} //don't show badge if nothing in cart
                            onClick={() => dispatch(setIsCartOpen({}))} //onClick also applies to child element (keep it here attached to badge parent)
                            sx={{
                                "& .MuiBadge-badge": {
                                    right: 10,
                                    top: 25,
                                    padding: "0 4px",
                                    height: "14px",
                                    minWidth: "13px",
                                    cursor: 'pointer',
                                    // fontSize: '11px'
                                },
                            }}
                        >
                            <IconButton  >
                                <ShoppingBagOutlined />
                            </IconButton>
                        </Badge>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;