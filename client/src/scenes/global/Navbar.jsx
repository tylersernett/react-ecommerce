import { useDispatch, useSelector } from 'react-redux'
import { Badge, Box, IconButton } from "@mui/material";
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined, } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart); //state.sliceName.prop

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="60px"
            // backgroundColor="rgba(255, 255, 255, 0.5)"
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
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar