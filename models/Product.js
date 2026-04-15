import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productID : {
            type : String,
            required : true,    
            unique : true
        },
        name : {
            type : String,
            required : true
        },
        altNames : {
            type : [String],
            default : []        
        },
        price : {
            type : Number,
            required : true
        },
        labelledPrice : {
            type : Number,
            required : true
        },
        images : {
            type : [String],
            required : true
        },
        catogery : {
            type : String,
            required : true
        },
        brand : {
            type : String,
            required : true,
            default : "No brand"
        },
        modelNumber : {
            type : String,
            default : "Standard",
            required : true
        },
        stock : {
            type : Number,
            required : true,
            default : 0
        },
        isAvailable : {
            type : Boolean,
            default : true
        }
    }
) 

const Product = mongoose.model("Product", productSchema)
export default Product