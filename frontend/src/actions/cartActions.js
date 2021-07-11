import axios from 'axios';
import Cookie from 'js-cookie';
import { CARD_ADD_ITEM, CARD_REMOVE_ITEM } from '../constants/cartConstants';

const addToCart = (productID, qty) => async (dispatch , getState) => {
    try{
        const {data} = await axios.get("/api/products/" + productID);
        dispatch({ type: CARD_ADD_ITEM, payload: {
            id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            stock: data.stock,
            qty
        } });

        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch(error) {

    }
}

const removeFromCart = (productID) => async (dispatch , getState) => {
    dispatch({ type: CARD_REMOVE_ITEM, payload: productID });

    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export {addToCart , removeFromCart}