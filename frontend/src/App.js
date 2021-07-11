import React from 'react';
import data from './data';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './actions/exampleActions';

function App() {

  const counter = useSelector(state => state.counter);
  
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  let cartItemslen = 0
  for(var i=0; i<cartItems.length; i++)
    cartItemslen += Number(cartItems[i].qty);
  
  const dispatch = useDispatch();

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
    dispatch(increment(5));
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
              <button onClick={openMenu}>&#9776;</button>
              <Link to="/">amazona</Link>
          </div>
          <div className="header-links">
              <Link to="/cart">Cart ({cartItemslen})</Link>
              <a href="signin.html">Sign In</a>
          </div>  
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
              <li><a href="index.html">Pants</a></li>
              <li><a href="index.html">Shirts</a></li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
            All right reserved. {counter}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
