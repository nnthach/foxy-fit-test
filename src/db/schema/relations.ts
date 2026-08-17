import { relations } from "drizzle-orm";
import { orders } from "./orders.schema.js";
import { orderItems } from "./order-items.schema.js";
import { products } from "./products.schema.js";

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
