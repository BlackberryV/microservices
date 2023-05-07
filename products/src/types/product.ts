export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface ProductDto {
  title: string;
  description: string;
  price: number;
  category: string;
}
