import { z } from "zod";

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z
          .number({
            error: "productId must be a number",
          })
          .int("productId must be an integer")
          .positive("productId must be greater than 0"),

        quantity: z
          .number({
            error: "quantity must be a number",
          })
          .int("quantity must be an integer")
          .positive("quantity must be greater than 0"),
      }),
    )
    .min(1, "The product list cannot be empty"),
});

export type CheckoutDto = z.infer<typeof checkoutSchema>;
