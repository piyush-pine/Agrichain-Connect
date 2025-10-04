
'use client';

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Carrot,
  Leaf,
  ShieldCheck,
  Search,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/types";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`} className="block">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
            data-ai-hint={product.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <CardTitle className="text-lg font-headline mb-1">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          From {product.farmer.name}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-bold font-headline text-primary">
          ${product.price.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground">
            /kg
          </span>
        </p>
        {product.blockchainVerified && (
          <div className="flex items-center gap-1 text-green-600">
            <ShieldCheck size={16} />
            <span className="text-xs font-medium">Verified</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default function MarketplacePage() {
  const { products } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center bg-card rounded-lg p-8 md:p-12 mb-12 shadow-md">
        <Leaf className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
          Freshness, Direct from the Source
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          AgriChain Connect links you directly with local farmers, ensuring
          transparent, blockchain-verified quality from farm to table.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard/products/new">
              Become a Seller <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#products">
              Explore Produce
              <Carrot className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="products" className="scroll-mt-20">
        <div className="mb-8 p-6 bg-card rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="search" className="text-sm font-medium">What are you looking for?</label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="search" placeholder="Search for tomatoes, apples..." className="pl-10" />
              </div>
            </div>
            <div>
               <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vegetable">Vegetables</SelectItem>
                  <SelectItem value="fruit">Fruits</SelectItem>
                  <SelectItem value="grain">Grains</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
               <label htmlFor="sort" className="text-sm font-medium">Sort by</label>
               <Select>
                <SelectTrigger id="sort" className="mt-1">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
