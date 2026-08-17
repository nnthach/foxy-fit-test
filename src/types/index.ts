export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: Date;
  items: OrderItem[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface CheckoutItemInput {
  productId: number;
  quantity: number;
}

export interface CheckoutInput {
  items: CheckoutItemInput[];
}
