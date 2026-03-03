import { Router } from "express";
import { createProductController, getProductByIdController, getProductsController } from "../controller/product.controller";

const productRoutes = Router();

productRoutes.get("/", getProductsController);
productRoutes.get("/:id", getProductByIdController);
productRoutes.post("/", createProductController);
// productRoutes.put("/:id", productController.updateProduct);

export default productRoutes;
