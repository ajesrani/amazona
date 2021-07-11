const { CARD_ADD_ITEM, CARD_REMOVE_ITEM } = require("../constants/cartConstants");

function cartReducer(state={cartItems:[]}, action)
{
    switch(action.type) {
        case CARD_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=> x.id == item.id);
            if(product) {
                return {
                    cartItems: state.cartItems.map(x=> x.id == product.id ? item : x)
                }
            }
            return {cartItems: [...state.cartItems, item]};

        case CARD_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x=> x.id != action.payload)};

        default:
            return state;
    }
}

export {cartReducer}