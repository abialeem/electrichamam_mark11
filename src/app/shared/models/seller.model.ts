export interface Sellers {
    count: number;
    sellers: Seller[];
  }
  
  export interface Seller {
    id: number;
    name: string;
    image: string;
    description: string;
    products_count: number;
  }
   