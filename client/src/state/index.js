import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload; //redux allows for state mutation
        },

        addToCart: (state, action) => {
            //ensure positive quantity
            if (action.payload.item.count > 0) {
                //if item already exists, add to existing count
                const isItemInCart = state.cart.find((item) => item.id === action.payload.item.id);
                if (isItemInCart) {
                    state.cart.map((item) => {
                        if (item.id === action.payload.item.id) {
                            item.count += action.payload.item.count;
                        }
                        return item;
                    });
                } else { //add new item to cart
                    state.cart = [...state.cart, action.payload.item];
                }
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => { //edge: max item #?
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            });
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;