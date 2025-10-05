
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MoreHorizontal, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const mockOrders = [
  { id: 'ORD-001', date: '2023-10-26', customer: 'Alice Johnson', total: 25.50, status: 'Delivered', address: '123 Market St, Mumbai', items: [{name: 'Fresh Tomatoes', qty: 5}] },
  { id: 'ORD-002', date: '2023-10-25', customer: 'Bob Williams', total: 15.00, status: 'Processing', address: '456 Agri Lane, Pune', items: [{name: 'Crunchy Carrots', qty: 3}] },
  { id: 'ORD-003', date: '2023-10-24', customer: 'Charlie Brown', total: 45.75, status: 'Shipped', address: '789 Farm Rd, Nashik', items: [{name: 'Himachali Apples', qty: 10}] },
  { id: 'ORD-004', date: '2023-10-23', customer: 'Diana Prince', total: 10.00, status: 'Delivered', address: '101 Produce Ave, Delhi', items: [{name: 'Organic Bananas', qty: 2}] },
  { id: 'ORD-005', date: '2023-10-22', customer: 'Ethan Hunt', total: 8.25, status: 'Cancelled', address: '212 Secret St, Goa', items: [{name: 'Crisp Lettuce', qty: 1}] },
];

export default function OrdersPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Orders</h1>
        <p className="text-muted-foreground">Review and manage your sales history.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={
                        order.status === 'Delivered' ? 'default'
                        : order.status === 'Processing' ? 'secondary'
                        : order.status === 'Cancelled' ? 'destructive'
                        : 'outline'
                      }
                      className={order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/orders/${order.id}`}>
                                      <Truck className="mr-2 h-4 w-4" /> Track
                                  </Link>
                              </DropdownMenuItem>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  View Details
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Order Details: {order.id}</AlertDialogTitle>
                              <AlertDialogDescription asChild>
                                  <div className="space-y-4 pt-2 text-sm text-foreground">
                                      <div>
                                          <h4 className="font-semibold mb-1">Customer</h4>
                                          <p className="text-muted-foreground">{order.customer}</p>
                                          <p className="text-muted-foreground">{order.address}</p>
                                      </div>
                                       <div>
                                          <h4 className="font-semibold mb-1">Order Items</h4>
                                          <ul className="list-disc pl-5 text-muted-foreground">
                                            {order.items.map(item => (
                                                <li key={item.name}>{item.qty}kg of {item.name}</li>
                                            ))}
                                          </ul>
                                      </div>
                                  </div>
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-4">
                              <AlertDialogCancel>Close</AlertDialogCancel>
                               <AlertDialogAction className="bg-blue-500 hover:bg-blue-600">
                                <MessageSquare className="mr-2 h-4 w-4" /> Message
                              </AlertDialogAction>
                              <AlertDialogAction>
                                <Phone className="mr-2 h-4 w-4" /> Call Customer
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
