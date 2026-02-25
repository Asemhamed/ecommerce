
export interface CartItem {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface ShippingAddress {
  city: string;
  details: string;
  phone: string;
}

export interface OrderType {
  cartItems: CartItem[];
  createdAt: string;
  id: number;
  isDelivered: boolean;
  isPaid: boolean;
  paymentMethodType: string;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}