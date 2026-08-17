import { db, pool } from "./index.js";
import { products } from "./schema/index.js";

async function seed() {
  console.log("Seeding database...");

  await db
    .insert(products)
    .values([
      {
        name: "iPhone 15 Pro",
        price: "999.00",
        stock: 10,
        status: "low_stock",
      },
      {
        name: "Samsung Galaxy S24",
        price: "899.00",
        stock: 15,
        status: "available",
      },
      {
        name: "AirPods Pro",
        price: "249.00",
        stock: 30,
        status: "available",
      },
      {
        name: "MacBook Air M3",
        price: "1299.00",
        stock: 5,
        status: "low_stock",
      },
      {
        name: "iPad Air",
        price: "599.00",
        stock: 0,
        status: "sold_out",
      },
    ])
    .onConflictDoNothing();

  console.log("Database seeded successfully.");

  await pool.end();
}

seed().catch(async (error: unknown) => {
  console.error("Database seed failed:", error);
  await pool.end();
  process.exit(1);
});
