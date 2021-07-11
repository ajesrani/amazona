import {createStore , combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { counterReducer , loggedReducer , bugReducer } from './reducers/exampleReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const cnt = localStorage.getItem("counter")
const initialState = { cart: {cartItems} , counter: cnt};

// Reducer is fn that get state, action and return new state based on that action 
const reducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    bugs: bugReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

// record the actions dispatched and see the state in chrome extension 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// thunk is the middleware for redux, allows to run async operation inside action in the redux
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
