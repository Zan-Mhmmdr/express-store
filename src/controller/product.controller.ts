import { Request, Response } from "express";
import { createProductService } from "../service/product.service";

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

    const data = req.body;

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}