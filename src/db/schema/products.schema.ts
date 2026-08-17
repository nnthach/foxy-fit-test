import {
  pgTable,
  serial,
  varchar,
  numeric,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { ProductStockStatusEnum } from "../../enums/product-status.enum.js";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  stock: integer("stock").notNull(),
  status: varchar("status", { length: 20 })
    .notNull()
    .default(ProductStockStatusEnum.AVAILABLE),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
