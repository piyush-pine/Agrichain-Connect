
export interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
}

export type ProductCategory = 'Vegetable' | 'Fruit' | 'Grain' | 'Dairy';

export interface Product {
  id: string;
  slug: string;
  name:string;
  description: string;
  price: number;
  category: ProductCategory;
  farmer: Farmer;
  imageUrl: string;
  imageHint: string;
  blockchainVerified: boolean;
  sustainabilityTags: string[];
  stock: number;
  txHash?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
