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
            <Box padding="20px" overflow="auto" height="100%"> {/*  minWidth='380px' */}
                {/* HEADER */}
                <FlexBox mb="15px" sx={{ display: 'flex', flexDirection: 'row-reverse' }}> {/* reverse direction so X is always right*/}
                    <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                        <CloseIcon />
                    </IconButton>
                    {cart.length > 0 ?
                        (
                            <Typography variant="h3" color={shades.secondary[600]}>SHOPPING BAG&nbsp;
                                <span style={{ color: shades.neutral[500] }}>({cart.length})</span>
                            </Typography>
                        ) : ""}
                </FlexBox>

                {/* CART LIST */}
                <Box>
                    {cart.map((item) => (
                        <Box key={`${item.attributes.name}-${item.id}`}>
                            <FlexBox p="15px 0">
                                <Box flex="1 1 40%" >{/* shrink:1, grow: 1 */}
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
                                            <CloseIcon fontSize='small' />
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

                {/* TOTAL & CHECKOUT */}
                <Box m="20px 0">
                    {cart.length > 0 ?
                        (
                            <>
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
                            </>
                        ) : (
                            <Button variant="outlined"
                                disabled
                                sx={{
                                    "&:disabled": {
                                        // backgroundColor: shades.neutral[700],
                                        color: 'white',
                                        borderRadius: 0,
                                        border: '1px solid black',
                                        minWidth: "100%",
                                        padding: "20px 40px",
                                        fontWeight: "bold",
                                        m: "20px 0",
                                    }
                                }}>
                                Your Bag Is Empty
                            </Button>
                        )
                    }
                </Box>
            </Box>
        </Drawer>
    )
}

export default CartMenu;