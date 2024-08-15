const express = require('express');

const productRoutes = express.Router();
const dbo = require('../db/connection');

productRoutes.route('/products').post(function(req, res){

    const dbConnect = dbo.getDb();

    const newProductDocument = {
        _id: req.body.id,
        product_name: req.body.firstname,
        description: req.body.lastname,
        price: req.body.price
    };

    dbConnect
    .collection('products')
    .insertOne(newProductDocument, function(err, result){
        if(err){
            res.status(400).send('Error inserting new product!');

        }else{
            console.log('Added a new product with id '+ result.insertedId);
            res.status(200).send();
        }
    })
});

productRoutes.route('/products/MultipleElements').post(function(req, res){

    const dbConnect = dbo.getDb();

    const productList = req.body;

    dbConnect
    .collection('products')
    .insertMany(productList, function(err, result){
        if(err){
            res.status(400).send('Error inserting new product!');

        }else{
            console.log('Added a new product with id '+ result.insertedId);
            res.status(200).send();
        }
    })
});


productRoutes.route('/products').get(function(req, res){

    //const filter = { id:  "009"};
    const dbConnect = dbo.getDb();
    //console.log(filter);
    dbConnect
    .collection('products')
    .find({})
    .limit(50)
    .toArray(function(err, result){
        if(err){
            res.status(400).send('Erroe fetching products!');
        }else{
            res.json(result);
        }
    });


});
productRoutes.route('/products/:price').get(function(req, res){

    const filter = { price: {$lt: parseInt(req.params.price)} };
    const dbConnect = dbo.getDb();
    console.log(filter);
    dbConnect
    .collection('products')
    .find(filter)
    .limit(50)
    .toArray(function(err, result){
        if(err){
            res.status(400).send('Erroe fetching products!');
        }else{
            res.json(result);
        }
    });


});
productRoutes.route('/products/:lastName').get(function(req, res){

    const filter = req.params.lastName
    const dbConnect = dbo.getDb();
    
    dbConnect
    .collection('products')
    .find({lastname: filter })
    .limit(50)
    .toArray(function(err, result){
        if(err){
            res.status(400).send('Error fetching products!');
        }else{
            res.json(result);
        }
    });


});



productRoutes.route('/products/:id').put(function(req, res){

    const dbConnect = dbo.getDb();

    const filter = { id: req.params.id };


    const update = {
        $set:{
         
            "product_name": req.body.firstname,
            "description": req.body.lastname,
            "price": req.body.price
        }
       
    };

    dbConnect
    .collection('products')
    .updateOne(filter, update, function(err, result){
        if(err){
            res.status(400).send('Error updating product with id ' + filter._id);

        }else{
            console.log('Product updated');
            res.status(204).send();
        }
    })
});


productRoutes.route('/products').delete(function(req, res){

    const dbConnect = dbo.getDb();

    const filter = { _id:  "639210b0893028e11d413616"};
    console.log(filter);

    
    dbConnect
    .collection('products')
    .deleteOne(filter, function(err, result){
        if(err){
            res.status(400).send('Error deleting product with id ' + filter.id);

        }else{
            console.log('1 document deleted');
            console.log(filter);
            console.log(result);
            res.status(204).send();
        }
    })
});



module.exports = productRoutes;
