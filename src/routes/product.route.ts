import { Router } from "express";
import { createProductController, getProductsController } from "../controller/product.controller";

const productRoutes = Router();

productRoutes.get("/", getProductsController);
// productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", createProductController);
// productRoutes.put("/:id", productController.updateProduct);

export default productRoutes;
