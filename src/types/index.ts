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
  status: string;
}

export interface CheckoutItemInput {
  productId: number;
  quantity: number;
}

export interface CheckoutInput {
  items: CheckoutItemInput[];
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: Date;
  items: OrderItemResponse[];
}

export interface MergedItem {
  productId: number;
  quantity: number;
}

export interface OrderItemData {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}
