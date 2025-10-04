
'use client';

import { notFound } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Star, Thermometer, Droplets, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    // We need to wait for products to load from context
    // This is a simple loading state. In a real app, you'd use a skeleton loader.
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading product...</p>
      </div>
    );
  }

  const farmer = product.farmer;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
        title: "Added to Cart!",
        description: `${quantity}kg of ${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image */}
        <div>
          <Card className="overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={600}
              className="w-full h-auto object-cover aspect-[4/3]"
              data-ai-hint={product.imageHint}
            />
          </Card>
          <div className="grid grid-cols-2 gap-4 mt-4">
              <Card>
                  <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2 text-sm"><Thermometer size={16}/> Temperature</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p className="text-xl font-bold">4.5°C</p>
                      <p className="text-xs text-muted-foreground">Optimal cold chain</p>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2 text-sm"><Droplets size={16}/> Humidity</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p className="text-xl font-bold">85%</p>
                       <p className="text-xs text-muted-foreground">Maintained for freshness</p>
                  </CardContent>
              </Card>
          </div>
        </div>

        {/* Right Column: Details */}
        <div>
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mt-2 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <p className="text-3xl font-bold font-headline text-primary">
              ${product.price.toFixed(2)}
              <span className="text-base font-normal text-muted-foreground">
                /kg
              </span>
            </p>
            {product.blockchainVerified && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <ShieldCheck size={16} className="mr-2"/>
                    Blockchain Verified
                </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                  {product.sustainabilityTags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
              </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4 flex justify-between items-center">
                <div>
                    <p className="text-sm text-muted-foreground">Sold by</p>
                    <p className="font-semibold">{farmer.name}</p>
                    <p className="text-xs text-muted-foreground">{farmer.location}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500">
                        <Star size={16} className="fill-current"/>
                        <Star size={16} className="fill-current"/>
                        <Star size={16} className="fill-current"/>
                        <Star size={16} className="fill-current"/>
                        <Star size={16} className="fill-muted stroke-amber-500"/>
                    </div>
                    <p className="font-bold text-sm">{farmer.rating.toFixed(1)}</p>
                </div>
            </CardContent>
          </Card>
          
          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row gap-4">
             <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q-1))}>-</Button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => q+1)}>+</Button>
                <span className="text-muted-foreground">kg</span>
             </div>
            <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5"/> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
