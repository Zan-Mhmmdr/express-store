import { Request, Response } from "express";
import {
  createProductService,
  getProductByIdService,
  getProductsService,
} from "../service/product.service";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await createProductService(data);

    res.json({
      message: "Product created successfully",
      productId: (result as any).insertId,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getProductsService();

    res.json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    res.json({
      message: "Product retrieved successfully",
      product, 
    });

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
