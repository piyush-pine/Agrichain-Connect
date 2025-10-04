import type { Farmer, Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const mockFarmers: Farmer[] = [
  { id: 'farmer-1', name: 'Green Valley Farms', location: 'Nashik, Maharashtra', rating: 4.8 },
  { id: 'farmer-2', name: 'Sunrise Organics', location: 'Pune, Maharashtra', rating: 4.9 },
  { id: 'farmer-3', name: 'Himalayan Orchard', location: 'Shimla, Himachal Pradesh', rating: 4.7 },
];

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(i => i.id === id);
    if (!img) return { imageUrl: 'https://picsum.photos/seed/default/400/300', imageHint: 'produce' };
    return { imageUrl: img.imageUrl, imageHint: img.imageHint };
}

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    slug: 'fresh-tomatoes',
    name: 'Fresh Tomatoes',
    description: 'Juicy, ripe tomatoes grown with organic practices. Perfect for salads, sauces, and sandwiches. These tomatoes are hand-picked to ensure the highest quality and freshness, delivering a farm-to-table experience you can taste.',
    price: 2.50,
    category: 'Vegetable',
    farmer: mockFarmers[0],
    ...getImage('tomatoes'),
    blockchainVerified: true,
    sustainabilityTags: ['Organic', 'Low Water'],
    stock: 150,
  },
  {
    id: 'prod-2',
    slug: 'crunchy-carrots',
    name: 'Crunchy Carrots',
    description: 'Sweet and crunchy carrots, packed with vitamins. Straight from the earth, these carrots have a vibrant color and a crisp texture that makes them ideal for snacking, roasting, or adding to your favorite stews.',
    price: 1.80,
    category: 'Vegetable',
    farmer: mockFarmers[1],
    ...getImage('carrots'),
    blockchainVerified: true,
    sustainabilityTags: ['Heirloom'],
    stock: 200,
  },
  {
    id: 'prod-3',
    slug: 'crisp-lettuce',
    name: 'Crisp Lettuce',
    description: 'Fresh heads of lettuce, perfect for a crisp and refreshing salad. Our lettuce is grown in nutrient-rich soil, giving it a tender yet crunchy texture. Harvested daily for maximum freshness.',
    price: 3.00,
    category: 'Vegetable',
    farmer: mockFarmers[0],
    ...getImage('lettuce'),
    blockchainVerified: false,
    sustainabilityTags: ['Pesticide-Free'],
    stock: 80,
  },
  {
    id: 'prod-4',
    slug: 'himachali-apples',
    name: 'Himachali Apples',
    description: 'Sweet, juicy apples from the orchards of Himachal. These apples are known for their distinctive flavor and crisp bite. A healthy and delicious snack for any time of the day.',
    price: 4.20,
    category: 'Fruit',
    farmer: mockFarmers[2],
    ...getImage('apples'),
    blockchainVerified: true,
    sustainabilityTags: ['Zero Waste', 'Organic'],
    stock: 300,
  },
  {
    id: 'prod-5',
    slug: 'organic-bananas',
    name: 'Organic Bananas',
    description: 'Naturally ripened organic bananas, full of potassium and natural energy. Our bananas are grown without synthetic pesticides or fertilizers, making them a healthy choice for your family.',
    price: 2.10,
    category: 'Fruit',
    farmer: mockFarmers[1],
    ...getImage('bananas'),
    blockchainVerified: true,
    sustainabilityTags: ['Organic'],
    stock: 250,
  },
  {
    id: 'prod-6',
    slug: 'farm-fresh-milk',
    name: 'Farm-Fresh Milk',
    description: 'Creamy and nutritious milk from grass-fed cows. This is milk the way it\'s supposed to be, with a rich flavor that\'s perfect for drinking, cooking, or with your morning cereal. Pasteurized and bottled on the farm.',
    price: 1.50, // Per Litre
    category: 'Dairy',
    farmer: mockFarmers[0],
    ...getImage('milk'),
    blockchainVerified: true,
    sustainabilityTags: ['Grass-Fed'],
    stock: 100,
  },
];
