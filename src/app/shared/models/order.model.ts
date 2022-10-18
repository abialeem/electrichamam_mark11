import { Address } from "./address.model";

export interface Orders {
    count: number;
    orders: Order[];
  }
  
  export interface Order {
    id: number;
    user_id: number;
    placed_on: string;
    total_amount: number;
    user_address_id: number;
    status: string;
    shipping_address?: Address;
  }