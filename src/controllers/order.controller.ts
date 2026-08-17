import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service.js";
import { AppError } from "../utils/AppError.js";

export class OrderController {
  private readonly orderService = new OrderService();

  getOrderDetail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const orderId = Number(req.params.id);

      if (!Number.isInteger(orderId) || orderId <= 0) {
        throw new AppError("id đơn hàng không hợp lệ", 400);
      }

      const order = await this.orderService.getOrderById(orderId);

      res.status(200).json({ success: true, data: order });
    } catch (error) {
      next(error); // đẩy lỗi ra middleware xử lý tập trung (bước 6)
    }
  };

  checkout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const order = await this.orderService.checkout(req.body);
      res
        .status(201)
        .json({ success: true, message: "Đặt hàng thành công", data: order });
    } catch (error) {
      next(error);
    }
  };
}
