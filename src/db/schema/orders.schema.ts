import {
  pgTable,
  serial,
  varchar,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { OrderStatusEnum } from "../../enums/order-status.enum.js";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 })
    .notNull()
    .default("0"),
  status: varchar("status", { length: 20 })
    .notNull()
    .default(OrderStatusEnum.PENDING),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
