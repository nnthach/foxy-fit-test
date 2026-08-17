import { db } from "../db/index.js";
import { CheckoutDto } from "../dtos/checkout.dto.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import {
  CheckoutItemInput,
  MergedItem,
  OrderItemData,
  OrderResponse,
} from "../types/index.js";
import { AppError } from "../utils/AppError.js";

export class OrderService {
  private readonly productRepo = new ProductRepository();
  private readonly orderRepo = new OrderRepository();

  private mergeDuplicateItems(items: CheckoutItemInput[]): MergedItem[] {
    const map = new Map<number, number>();

    for (const item of items) {
      map.set(item.productId, (map.get(item.productId) ?? 0) + item.quantity);
    }

    return Array.from(map.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }

  async getOrderById(id: number): Promise<OrderResponse> {
    const order = await this.orderRepo.findOrderById(db, id);

    if (!order) {
      throw new AppError(`Order with id=${id} not found`, 404);
    }

    const items = await this.orderRepo.findOrderItemsByOrderId(db, id);

    return {
      id: order.id,
      status: order.status,
      totalAmount: Number(order.totalAmount),
      createdAt: order.createdAt,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: Number(item.price),
        subtotal: Number(item.price) * item.quantity,
      })),
    };
  }

  async checkout(input: CheckoutDto): Promise<OrderResponse> {
    // merge duplicate product by id
    const mergedItems = this.mergeDuplicateItems(input.items).sort(
      (a, b) => a.productId - b.productId,
    );

    // start transaction
    return db.transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData: OrderItemData[] = [];

      // reverse product
      for (const item of mergedItems) {
        // get each product
        const product = await this.productRepo.findByIdForUpdate(
          tx,
          item.productId,
        );

        // wrong id
        if (!product) {
          throw new AppError(
            `Product with id=${item.productId} does not exist`,
            400,
          );
        }

        // check stock
        if (product.stock < item.quantity) {
          throw new AppError(
            `Product "${product.name}" does not have enough stock (available: ${product.stock}, requested: ${item.quantity})`,
            400,
          );
        }

        // calculate price
        const price = Number(product.price);
        const subtotal = price * item.quantity;

        totalAmount += subtotal;

        orderItemsData.push({
          productId: product.id,
          productName: product.name,
          quantity: item.quantity,
          price,
        });

        // decrease stock in product table
        await this.productRepo.decreaseStock(tx, product.id, item.quantity);
      }

      // create order table
      const order = await this.orderRepo.createOrder(tx, totalAmount);

      // create order-items table
      for (const item of orderItemsData) {
        await this.orderRepo.createOrderItem(
          tx,
          order.id,
          item.productId,
          item.quantity,
          item.price,
        );
      }

      // return result
      return {
        id: order.id,
        status: order.status,
        totalAmount,
        createdAt: order.createdAt,
        items: orderItemsData.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
      };
    });
  }
}
