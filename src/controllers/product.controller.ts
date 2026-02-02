import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const product = await productService.createProduct(name, price, stock);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (_: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await productService.getProductById(id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price, stock } = req.body;
  const result = await productService.updateProduct(id, name, price, stock);
  res.json(result);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await productService.deleteProduct(id);
  res.json(result);
};
