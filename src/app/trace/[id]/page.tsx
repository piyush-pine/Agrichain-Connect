
'use client';

import { useProducts } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, Calendar, MapPin, DollarSign, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function TracePage({ params }: { params: { id: string } }) {
    const { products } = useProducts();
    const product = products.find(p => p.id === params.id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Loading Traceability Data...</h1>
                <p className="text-muted-foreground">If this takes too long, the product might not exist or isn't verified.</p>
            </div>
        )
    }

    return (
        <div className="bg-muted/20 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                 <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-headline">Product Provenance Trace</h1>
                        <p className="text-muted-foreground">Full journey from farm to you, verified on the blockchain.</p>
                    </header>

                     <Card className="mb-8 shadow-lg">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className='text-2xl'>{product.name}</CardTitle>
                                    <CardDescription>Product ID: {product.id}</CardDescription>
                                </div>
                                 <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/30 dark:text-green-200 dark:hover:bg-green-800/40 text-base">
                                    <ShieldCheck size={16} className="mr-2"/>
                                    Verified on Blockchain
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-full md:w-1/3">
                                <Image 
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={400}
                                    height={300}
                                    className="rounded-lg object-cover aspect-[4/3] border"
                                    data-ai-hint={product.imageHint}
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground font-semibold flex items-center gap-1"><Calendar size={14} />Listed On</p>
                                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground font-semibold flex items-center gap-1"><MapPin size={14} />Origin</p>
                                        <p className="font-medium">{product.farmer.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground font-semibold flex items-center gap-1"><DollarSign size={14} />Listed Price</p>
                                        <p className="font-medium">${product.price.toFixed(2)}/kg</p>
                                    </div>
                                     <div>
                                        <p className="text-muted-foreground font-semibold">Farmer</p>
                                        <p className="font-medium">{product.farmer.name}</p>
                                    </div>
                                </div>
                                {product.txHash && (
                                     <a href={`https://mumbai.polygonscan.com/tx/${product.txHash}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                        <LinkIcon size={14} />
                                        View Creation Transaction on PolygonScan
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                     <h2 className="text-2xl font-bold font-headline mb-4 text-center">Shipment Journey</h2>
                     <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <p>Shipment data will appear here once an order is placed and shipment begins.</p>
                        </CardContent>
                     </Card>
                 </div>
            </div>
        </div>
    )
}
