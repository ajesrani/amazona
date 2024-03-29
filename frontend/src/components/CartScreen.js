import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    
    const productID = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();

    useEffect( () => {
        if(productID)
            dispatch(addToCart(productID, qty));
    }, [])

    const removeFromCartHandler = (productID) => {
        dispatch(removeFromCart(productID));
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
      }

    return (
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>
            {
              cartItems.length === 0 ?
              <div>Cart is empty</div> :
              cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.id}>{item.name}</Link>
                  </div>
                  <div>Qty:
                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.id, e.target.value))}>
                      {[...Array(item.stock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.id)} >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>)
            }
          </ul>
        </div>
        <div className="cart-action">
          <h3>Subtotal({cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items) :
            $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    )
}

export default CartScreen;