import { Box, Button, Divider, IconButton, Typography, Drawer } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen, } from "../../state";
import { useNavigate } from "react-router-dom";

//allow for re-use of css (kind of like component)
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart); //state.sliceName.prop
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const toggleDrawer = (bool) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            dispatch(setIsCartOpen({}))
            // setDrawerOpen(false);
            return;
        }

        dispatch(setIsCartOpen({}))
        //setDrawerOpen(bool);
    };

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.count * item.attributes.price);
    }, 0);


    return (
        <Drawer anchor="right" open={isCartOpen} onClose={toggleDrawer(false)}>
            <Box padding="30px" overflow="auto" height="100%">
                {/* HEADER */}
                <FlexBox mb="15px">
                    <Typography variant="h3" >SHOPPING BAG ({cart.length})</Typography>
                    <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                        <CloseIcon />
                    </IconButton>
                </FlexBox>

                {/* CART LIST */}
                <Box>
                    {cart.map((item) => (
                        <Box key={`${item.attributes.name}-${item.id}`}>
                            <FlexBox p="15px 0">
                                <Box flex="1 1 40%">
                                    {/* shrink:1, grow: 1 */}
                                    <img
                                        alt={item?.name}
                                        width="123px"
                                        height="123px"
                                        src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                    />
                                </Box>
                                <Box flex="1 1 60%">
                                    <FlexBox mb="5px">
                                        <Typography fontWeight="bold">
                                            {item.attributes.name}
                                        </Typography>
                                        <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                            <CloseIcon />
                                        </IconButton>
                                    </FlexBox>
                                    <Typography>{item.attributes.shortDescription}</Typography>
                                    <FlexBox m="15px 0">
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            border={`1.5px solid ${shades.neutral[500]}`}
                                        >
                                            <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography>{item.count}</Typography>
                                            <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                                                <AddIcon />
                                            </IconButton>
                                        </Box>

                                        {/* PRICE */}
                                        <Typography fontWeight="">
                                            ${item.attributes.price}
                                        </Typography>
                                    </FlexBox>
                                </Box>
                            </FlexBox>
                            <Divider />
                        </Box>
                    ))}

                </Box>

                {/* ACTIONS */}
                <Box m="20px 0">
                    <FlexBox m="20px 0">
                        <Typography fontWeight="bold" >SUBTOTAL</Typography>
                        <Typography fontWeight="bold">${totalPrice}</Typography>
                    </FlexBox>
                    <Button
                        sx={{
                            backgroundColor: shades.secondary[600],
                            color: 'white',
                            borderRadius: 0,
                            minWidth: "100%",
                            padding: "20px 40px",
                            fontWeight: "bold",
                            m: "20px 0",
                            "&:hover": {
                                color: 'black',
                                backgroundColor: shades.secondary[500],
                            }
                        }}
                        onClick={() => {
                            navigate("/checkout");
                            dispatch(setIsCartOpen({}));
                        }}
                    >
                        CHECKOUT
                    </Button>
                </Box>
            </Box>
        </Drawer>
    )
}

export default CartMenu

/*
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

export default function TemporaryDrawer() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (bool) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            setDrawerOpen(false);
            return;
        }

        setDrawerOpen(bool);
    };

    const drawerContent = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            DRAWER CONTENTS HERE
        </Box>
    );

    return (
        <>
            <Button onClick={toggleDrawer(true)}>{"right"}</Button>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent()}
            </Drawer>
        </>
    );
}

instead of changing display:none, change drawer {open} prop
*/