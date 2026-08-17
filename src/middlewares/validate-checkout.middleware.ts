import { Request, Response, NextFunction } from "express";

export const validateCheckoutBody = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({
      success: false,
      message: "items must be a non-empty array",
    });
    return;
  }

  for (const item of items) {
    if (
      typeof item.productId !== "number" ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "Each item must have a positive integer productId and quantity",
      });
      return;
    }
  }

  next();
};
