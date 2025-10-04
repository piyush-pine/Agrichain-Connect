
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import Link from "next/link";

const mockOrders = [
  { id: 'ORD-001', date: '2023-10-26', customer: 'Alice Johnson', total: 25.50, status: 'Delivered' },
  { id: 'ORD-002', date: '2023-10-25', customer: 'Bob Williams', total: 15.00, status: 'Processing' },
  { id: 'ORD-003', date: '2023-10-24', customer: 'Charlie Brown', total: 45.75, status: 'Shipped' },
  { id: 'ORD-004', date: '2023-10-23', customer: 'Diana Prince', total: 10.00, status: 'Delivered' },
  { id: 'ORD-005', date: '2023-10-22', customer: 'Ethan Hunt', total: 8.25, status: 'Cancelled' },
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
                      className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                       <Link href={`/dashboard/orders/${order.id}`}>
                        <Truck className="mr-2 h-4 w-4" /> Track
                       </Link>
                    </Button>
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
