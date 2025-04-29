export interface Product {
  id: number; // facultatif lors de la création
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  created_at?: string;
  updated_at?: string;
}
