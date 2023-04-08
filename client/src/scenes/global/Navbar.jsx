import { useDispatch, useSelector } from 'react-redux'
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined, } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";

const pages = ['Shop', 'Cart', 'Events', 'Gallery', 'Appointments'];
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

    return (
        <>
            <AppBar position="fixed" zIndex="2">
                <Container maxWidth="xl">
                    <Toolbar disableGutters width="80%"
                        margin="auto"
                        display="flex"
                        // justifycontent="space-between"
                        alignitems="center">
                        {/* MD+ */}
                        <Typography
                            variant={isMedScreen ? "h1" : isSmlScreen ? "h2" : "h3"}
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: shades.secondary[500],
                                textDecoration: 'none',
                            }}
                        >
                            THE HOOD
                        </Typography>
                        <Box
                            pr='20px'
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
                            display="flex"
                            justifyContent="right"
                            columnGap={isSmlScreen ? "30px" : "2px"}
                            zIndex="2">
                            {pages.map((page) => (
                                page === 'Cart' ? (
                                    <Badge
                                        key={page}
                                        badgeContent={cart.length}
                                        color="secondary"
                                        invisible={cart.length === 0} //don't show badge if nothing in cart
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                right: 5,
                                                top: 25,
                                                padding: "0 4px",
                                                height: "14px",
                                                minWidth: "13px",
                                                // fontSize: '11px'
                                            },
                                        }}
                                    >
                                        <Button

                                            onClick={() => dispatch(setIsCartOpen({}))}
                                            // onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {page}
                                        </Button>
                                    </Badge>
                                ) : (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                )
                            ))}
                        </Box>
                        {/* XS */}
                        {/* <Typography
                            variant="h2"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: shades.secondary[500],
                                textDecoration: 'none',
                            }}
                        >
                            THE HOOD
                        </Typography> */}
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
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* 
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="60px"
            backgroundColor="rgba(0, 0, 0, 1)"
            color="black"
            position="fixed"
            top="0"
            left="0"
            zIndex="1"
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    onClick={() => navigate("/")}
                    sx={{ "&:hover": { cursor: "pointer" } }} //sx: sudo selector
                    color={shades.secondary[500]}
                >
                    <h1>THE HOOD</h1>
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap="30px"
                    zIndex="2"
                >
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>

                    <IconButton >
                        <PersonOutline />
                    </IconButton>
                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0} //don't show badge if nothing in cart
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px",
                                // fontSize: '11px'
                            },
                        }}
                    >
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))} >
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>

                    <IconButton >
                        <MenuOutlined/>
                    </IconButton>

                    <Typography color='white'>Gallery</Typography>
                </Box>
            </Box>
        </Box> */}
        </>
    )
}

export default Navbar;