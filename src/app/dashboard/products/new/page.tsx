
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewProductPage() {
    const { toast } = useToast();
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

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
        // In a real app, you would call the GenAI flow here.
        // For now, we'll simulate a delay and a mock response.
        setTimeout(() => {
            const generatedDesc = `Discover the unparalleled freshness of our ${keywords.toLowerCase()}! Sourced directly from local farms, these products are bursting with flavor and nutrients. Grown using sustainable, organic methods, you can taste the difference that ethical farming makes. Perfect for home-cooked meals, these are guaranteed to be a family favorite.`;
            setDescription(generatedDesc);
            setIsGenerating(false);
            toast({
                title: 'Success!',
                description: 'AI-powered description has been generated.',
            });
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="e.g., Organic Tomatoes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetable">Vegetable</SelectItem>
                    <SelectItem value="fruit">Fruit</SelectItem>
                    <SelectItem value="grain">Grain</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
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
                <Button variant="ghost" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
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
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="price">Price (per kg)</Label>
                    <Input id="price" type="number" placeholder="e.g., 2.50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock (in kg)</Label>
                    <Input id="stock" type="number" placeholder="e.g., 100" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop files here, or</p>
                    <Button variant="outline" className="mt-2">Browse Files</Button>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="outline" type="button">Save as Draft</Button>
                <Button type="submit">List Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
