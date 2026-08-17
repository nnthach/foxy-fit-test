ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" varchar(20) DEFAULT 'available' NOT NULL;