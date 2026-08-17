import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { ProductStockStatusEnum } from "../enums/product-status.enum.js";
import { products } from "../db/schema/index.js";
import { Tx } from "../db/type.js";

export class ProductRepository {
  async findByIdForUpdate(tx: Tx, id: number) {
    const rows = await tx
      .select()
      .from(products)
      .where(eq(products.id, id))
      .for("update");

    return rows[0] ?? null;
  }

  async decreaseStock(tx: Tx, id: number, quantity: number): Promise<void> {
    await tx
      .update(products)
      .set({
        stock: sql`${products.stock} - ${quantity}`,

        status: sql`
          CASE
            WHEN ${products.stock} - ${quantity} = 0
              THEN ${ProductStockStatusEnum.SOLD_OUT}

            WHEN ${products.stock} - ${quantity} <= 10
              THEN ${ProductStockStatusEnum.LOW_STOCK}

            ELSE ${ProductStockStatusEnum.AVAILABLE}
          END
        `,
      })
      .where(eq(products.id, id));
  }
}
