import React, { useEffect, useState } from 'react'
import data from '../data';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
    
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(detailsProduct(props.match.params.id));
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
    
    //console.log(props.match.params.id);
    //const product = data.products.find(x => x._id == props.match.params.id);
    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div>
            {loading? (<div>Loading...</div>) : error ? (<div>{error}</div>) :
            (
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product"/>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Stars  ({product.numReviews} Reviews)
                            </li>
                            <li>
                                Price: <b>${product.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>{product.description}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: {product.price}
                            </li>
                            <li>
                                Status: {product.stock>0 ? "In Stock":"Out of Stock"}
                            </li>
                            <li>
                                Qty: 
                                <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                    {[...Array(product.stock).keys()].map(x=>
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    )}
                                    
                                </select>
                            </li>
                            <li>
                                {product.stock>0 && 
                                <button onClick={handleAddToCart} className="button primary">Add to Cart</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductScreen;