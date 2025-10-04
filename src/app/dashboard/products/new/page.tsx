
'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { useProducts } from '@/context/ProductContext';
import { mockFarmers } from '@/lib/data';
import type { ProductCategory } from '@/lib/types';

export default function NewProductPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { addProduct } = useProducts();

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState<ProductCategory | ''>('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGenerateDescription = async () => {
        if (!keywords) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter some keywords first.',
            });
            return;
        }
        setIsGenerating(true);
        try {
            const result = await generateProductDescription({ keywords });
            if (result.description) {
                setDescription(result.description);
                toast({
                    title: 'Success!',
                    description: 'AI-powered description has been generated.',
                });
            } else {
                 throw new Error("AI did not return a description.");
            }
        } catch (error) {
            console.error("Failed to generate description:", error);
            toast({
                variant: 'destructive',
                title: 'Generation Failed',
                description: 'Could not generate a description. Please try again.',
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!productName || !category || !price || !stock || !description || !imagePreview) {
            toast({
                variant: 'destructive',
                title: 'Incomplete Form',
                description: 'Please fill out all fields and upload an image.',
            });
            return;
        }
        
        setIsSubmitting(true);

        toast({
            title: 'Submitting...',
            description: 'Listing your new product on the marketplace.',
        });

        // Simulate form submission
        setTimeout(() => {
            const newProduct = {
                id: `prod-${Date.now()}`,
                slug: productName.toLowerCase().replace(/\s+/g, '-'),
                name: productName,
                description: description,
                price: parseFloat(price),
                category: category as ProductCategory,
                farmer: mockFarmers[0], // Assuming the first farmer is the current user
                imageUrl: imagePreview,
                imageHint: productName,
                blockchainVerified: false, // Default to not verified
                sustainabilityTags: keywords.split(',').map(k => k.trim()).filter(Boolean),
                stock: parseInt(stock),
            };

            addProduct(newProduct);

            setIsSubmitting(false);
            toast({
                title: 'Product Listed!',
                description: `${productName} is now available for sale.`,
            });
            router.push('/dashboard/products');
        }, 1500);
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>List a New Product</CardTitle>
          <CardDescription>
            Fill in the details below to add a new product to the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input 
                    id="product-name" 
                    placeholder="e.g., Organic Tomatoes" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as ProductCategory)} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vegetable">Vegetable</SelectItem>
                    <SelectItem value="Fruit">Fruit</SelectItem>
                    <SelectItem value="Grain">Grain</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">
                Description Keywords
              </Label>
              <Input 
                id="keywords" 
                placeholder="e.g., organic, fresh, locally grown" 
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter comma-separated keywords for AI description generation.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description">Product Description</Label>
                <Button variant="ghost" size="sm" type="button" onClick={handleGenerateDescription} disabled={isGenerating}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'AI Suggestion'}
                </Button>
              </div>
              <Textarea
                id="description"
                placeholder="Describe your product..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="price">Price (per kg)</Label>
                    <Input 
                        id="price" 
                        type="number" 
                        placeholder="e.g., 2.50" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock (in kg)</Label>
                    <Input 
                        id="stock" 
                        type="number" 
                        placeholder="e.g., 100" 
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="product-image-upload">Product Images</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <input id="product-image-upload" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    {imagePreview ? (
                        <div className="relative w-32 h-32 mx-auto">
                            <Image src={imagePreview} alt="Product preview" fill className="rounded-md object-cover" />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer" onClick={() => document.getElementById('product-image-upload')?.click()}>
                             <Upload className="mx-auto h-12 w-12" />
                             <p className="mt-2 text-sm">
                                Drag & drop or click to upload
                            </p>
                        </div>
                    )}
                   
                    <Button variant="outline" className="mt-4" type="button" onClick={() => document.getElementById('product-image-upload')?.click()}>Browse Files</Button>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.push('/dashboard/products')}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Listing Product...' : 'List Product'}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
