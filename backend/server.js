import express from 'express';
import data from './data';

const app = express();

app.get('/api/products', (req,res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req,res) => {
    const productID = req.params.id;
    const product = data.products.find(x=> x._id == productID);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Product Not found"});
});

app.listen(5000, () => console.log("Server started at http://localhost:5000"));

