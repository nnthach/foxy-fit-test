import { eq, asc } from "drizzle-orm";
import { orders, orderItems, products } from "../db/schema/index.js";
import { OrderStatusEnum } from "../enums/order-status.enum.js";
import { DB, Tx } from "../db/type.js";

export class OrderRepository {
  async createOrder(tx: Tx, totalAmount: number) {
    const [order] = await tx
      .insert(orders)
      .values({
        totalAmount: totalAmount.toFixed(2),
        status: OrderStatusEnum.PENDING,
      })
      .returning();

    return order;
  }

  async createOrderItem(
    tx: Tx,
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
  ): Promise<void> {
    await tx.insert(orderItems).values({
      orderId,
      productId,
      quantity,
      price: price.toFixed(2),
    });
  }

  async findOrderById(db: DB, id: number) {
    const rows = await db.select().from(orders).where(eq(orders.id, id));
    return rows[0] ?? null;
  }

  async findOrderItemsByOrderId(db: DB, orderId: number) {
    return db
      .select({
        id: orderItems.id,
        productId: orderItems.productId,
        productName: products.name,
        quantity: orderItems.quantity,
        price: orderItems.price,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, orderId))
      .orderBy(asc(orderItems.id));
  }
}
