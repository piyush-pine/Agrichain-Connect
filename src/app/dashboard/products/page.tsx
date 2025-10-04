'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/data';
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// For this demo, we'll just show all mock products as if they belong to the current user.
const userProducts = mockProducts.slice(0, 4);

export default function MyProductsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Products</h1>
                <p className="text-muted-foreground">Manage your product listings.</p>
            </div>
            <Button asChild>
                <Link href="/dashboard/products/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
                </Link>
            </Button>
        </div>

        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="hidden md:table-cell">Stock</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="hidden md:table-cell">
                                <Image
                                    alt={product.name}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.imageUrl}
                                    width="64"
                                    data-ai-hint={product.imageHint}
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                <Link href={`/products/${product.slug}`} className="hover:underline">
                                    {product.name}
                                </Link>
                                <div className="text-sm text-muted-foreground md:hidden">
                                    ${product.price.toFixed(2)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">Active</Badge>
                            </TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.stock} kg</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {userProducts.length === 0 && (
                    <div className="text-center p-8">
                        <h3 className="text-lg font-semibold">No products yet!</h3>
                        <p className="text-muted-foreground mt-2 mb-4">
                            Click "Add New Product" to start selling.
                        </p>
                        <Button asChild>
                            <Link href="/dashboard/products/new">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                            </Link>
                        </Button>
                    </div>
                 )}
            </CardContent>
        </Card>
    </div>
  );
}
