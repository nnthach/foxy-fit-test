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
      message: "items phải là mảng và không được rỗng",
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
        message: "Mỗi item cần productId (số) và quantity (số nguyên dương)",
      });
      return;
    }
  }

  next();
};
