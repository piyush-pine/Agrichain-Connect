
'use client';

import { useProducts } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function TracePage({ params }: { params: { id: string } }) {
    const { products } = useProducts();
    const product = products.find(p => p.id === params.id);

    if (!product) {
        // In a real app, you might fetch this from a server if not in context
        // return notFound();
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Loading Traceability Data...</h1>
                <p className="text-muted-foreground">If this takes too long, the product might not exist.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
             <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-headline">Product Provenance Trace</h1>
                    <p className="text-muted-foreground">Full journey from farm to you, verified on the blockchain.</p>
                </header>

                 <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>Product ID: {product.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-1/3">
                            <Image 
                                src={product.imageUrl}
                                alt={product.name}
                                width={400}
                                height={300}
                                className="rounded-lg object-cover aspect-[4/3]"
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h3 className="font-semibold">Product Details</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Category</p>
                                    <p className="font-medium">{product.category}</p>
                                </div>
                                 <div>
                                    <p className="text-muted-foreground">Listed Price</p>
                                    <p className="font-medium">${product.price.toFixed(2)}/kg</p>
                                </div>
                                 <div>
                                    <p className="text-muted-foreground">Farmer</p>
                                    <p className="font-medium">{product.farmer.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Origin</p>
                                    <p className="font-medium">{product.farmer.location}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline will be added in a future step */}
                 <h2 className="text-2xl font-bold font-headline mb-4 text-center">Shipment Journey</h2>
                 <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                        <p>Shipment data will appear here once an order is placed.</p>
                    </CardContent>
                 </Card>
             </div>
        </div>
    )
}
