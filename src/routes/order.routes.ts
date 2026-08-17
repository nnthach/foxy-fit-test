import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { validateCheckoutBody } from "../middlewares/validate-checkout.middleware.js";

const router = Router();
const controller = new OrderController();

router.post("/orders", validateCheckoutBody, controller.checkout);
router.get("/orders/:id", controller.getOrderDetail);

export default router;
