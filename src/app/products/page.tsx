
'use client';

import { useProducts } from '@/context/ProductContext';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function MarketplacePage() {
  const { products } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline mb-2">Marketplace</h1>
        <p className="text-muted-foreground">Browse fresh produce directly from the farm.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for products..." className="pl-10" />
        </div>
        <div className="flex gap-4">
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Vegetable">Vegetables</SelectItem>
                    <SelectItem value="Fruit">Fruits</SelectItem>
                    <SelectItem value="Grain">Grains</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by relevance" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="relevance">Sort by relevance</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">Check back later for more fresh produce!</p>
        </div>
      )}
    </div>
  );
}
