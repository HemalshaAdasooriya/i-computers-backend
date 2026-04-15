import Product from "../models/Product.js";
import { isAdmin } from "./userController.js";
 


export function createProduct(req,res){
    if(!isAdmin(req)){
    res.status(403).json({
        message : "Forbidden"
    });
    return
}

    const product = new Product(req.body)
    product.save().then(
        ()=>{
            res.json({
                message : "Product created successfully"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message : "Error creating product",
                error : error.message
            })
        }
    )   
}

export async function getAllProducts(req,res){
    if(isAdmin(req)){
        Product.find().then(
            (Products)=>{
                res.json(Products)
            }
        )
        .catch((error) => {
            res.status(500).json({
                message : "Error fetching products",
                error : error.message
            })
        })
    }else{
        Product.find({isAvailable : true})
        .then(
            (Products)=>{
                res.json(Products)
            }
        )
        .catch((error) => {
            res.status(500).json({
                message : "Error fetching products",
                error : error.message
            })
        })
    }
}


export function deleteProduct(req,res){
    if(!isAdmin(req)){
    req.status(403).json({
        message : "only admin can delete products"
    });
    return
}

    const productID= req.params.productID

    Product.deleteOne({productID : productID}).then(
        ()=>{
            res.json({
                message : "Product deleted successfully"
            }) 
        }
    )
}

export function updateProduct(req,res){
    if(!isAdmin(req)){
    req.status(403).json({
        message : "only admin can update products"
    });
    return
    }

    const productID= req.params.productID
    Product.updateOne({productID : productID},req.body).then(
        ()=>{
            res.json({
                message : "Product updated successfully"
            }) 
        }
    )

}
export function getProductByID(req,res){
    const productID= req.params.productID
    Product.findOne({productID : productID}).then(
        (product)=>{
            if(product == null){
                res.status(404).json({
                    message : "Product not found"
                })
            }else{
                res.json(product)
            }
    }).catch((error) => {
        res.status(500).json({
            message : "Error fetching product",
            error : error.message
        })
    })
}
