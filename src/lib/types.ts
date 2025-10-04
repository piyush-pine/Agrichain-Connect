export interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
}

export interface Product {
  id: string;
  slug: string;
  name:string;
  description: string;
  price: number;
  category: 'Vegetable' | 'Fruit' | 'Grain' | 'Dairy';
  farmer: Farmer;
  imageUrl: string;
  imageHint: string;
  blockchainVerified: boolean;
  sustainabilityTags: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
