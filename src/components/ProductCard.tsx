
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        addToCart(product, 1);
        toast({
            title: "Added to Cart!",
            description: `1kg of ${product.name} has been added.`,
        });
    };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
            data-ai-hint={product.imageHint}
          />
          {product.blockchainVerified && (
            <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-200">
              <ShieldCheck size={14} className="mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
            <span className="text-xs text-muted-foreground">{product.category}</span>
             <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold">{product.farmer.rating.toFixed(1)}</span>
            </div>
        </div>
        <h3 className="font-semibold text-lg truncate mt-1">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">from {product.farmer.name}</p>
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">per kg</p>
          </div>
          <Button variant="outline" size="icon" onClick={handleAddToCart}>
            <ShoppingCart size={18} />
             <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
