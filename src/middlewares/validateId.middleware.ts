import { Request, Response, NextFunction } from "express";

const validateIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({
      success: false,
      message: "ID must be a valid number",
    });
    return;
  }

  next();
};

export default validateIdMiddleware;
