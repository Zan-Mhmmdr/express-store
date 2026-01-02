import { Request, Response, NextFunction } from "express";

const validateUserBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string") {
    res.status(400).json({
      success: false,
      message: "Name is required and must be a string",
    });
    return;
  }

  if (!email || typeof email !== "string") {
    res.status(400).json({
      success: false,
      message: "Email is required and must be a string",
    });
    return;
  }

  next();
};

export default validateUserBodyMiddleware;
