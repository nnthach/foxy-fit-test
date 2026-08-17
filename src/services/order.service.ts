import { CheckoutInput, Order, OrderItem, Product } from "../types/index.js";
import { AppError } from "../utils/AppError.js";

const mockOrders: Order[] = [
  {
    id: 1,
    status: "PENDING",
    totalAmount: 2247,
    createdAt: new Date(),
    items: [
      {
        productId: 1,
        productName: "iPhone 15 Pro",
        quantity: 2,
        price: 999,
        subtotal: 1998,
      },
      {
        productId: 3,
        productName: "AirPods Pro",
        quantity: 1,
        price: 249,
        subtotal: 249,
      },
    ],
  },
];

const mockProducts: Product[] = [
  { id: 1, name: "iPhone 15 Pro", price: 999, stock: 10 },
  { id: 2, name: "Samsung Galaxy S24", price: 899, stock: 15 },
  { id: 3, name: "AirPods Pro", price: 249, stock: 30 },
  { id: 4, name: "MacBook Air M3", price: 1299, stock: 5 },
  { id: 5, name: "iPad Air (Hết hàng)", price: 599, stock: 0 },
];

export class OrderService {
  async getOrderById(id: number): Promise<Order> {
    const order = mockOrders.find((o) => o.id === id);

    if (!order) {
      throw new AppError(`Không tìm thấy đơn hàng với id=${id}`, 404);
    }

    return order;
  }

  async checkout(input: CheckoutInput): Promise<Order> {
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of input.items) {
      const product = mockProducts.find((p) => p.id === item.productId);

      if (!product) {
        throw new AppError(
          `Sản phẩm với id=${item.productId} không tồn tại`,
          400,
        );
      }

      if (product.stock < item.quantity) {
        throw new AppError(
          `Sản phẩm "${product.name}" không đủ tồn kho (còn ${product.stock}, yêu cầu ${item.quantity})`,
          400,
        );
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });

      product.stock -= item.quantity;
    }

    const newOrder: Order = {
      id: 2,
      status: "PENDING",
      totalAmount,
      createdAt: new Date(),
      items: orderItems,
    };

    mockOrders.push(newOrder);
    return newOrder;
  }
}
