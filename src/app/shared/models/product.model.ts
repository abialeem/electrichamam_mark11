export interface Products {
    count: number;
    products: Product[];
  }
  
  export interface Product {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    seller_id: string;
    cat_id?: number ;
    images?: string;
  }
   