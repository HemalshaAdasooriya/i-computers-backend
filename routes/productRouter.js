import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/productController.js';

const productRounter = express.Router();


productRounter.get("/",getAllProducts);
productRounter.post("/",createProduct);
productRounter.delete("/:productID",deleteProduct);
productRounter.put("/:productID",updateProduct);

export default productRounter
