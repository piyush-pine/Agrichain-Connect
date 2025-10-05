
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Star, ThumbsUp, Truck } from "lucide-react";
import Link from "next/link";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import Image from "next/image";

const mockShipments = [
  { id: 'ORD-003', status: 'In Transit', origin: 'Nashik, MH', destination: 'Mumbai, MH', estDelivery: 'Today, 5 PM' },
  { id: 'ORD-002', status: 'Pending Pickup', origin: 'Pune, MH', destination: 'Delhi, DL', estDelivery: 'Tomorrow, 2 PM' },
  { id: 'ORD-001', status: 'Delivered', origin: 'Shimla, HP', destination: 'Chandigarh, CH', estDelivery: 'Yesterday' },
  { id: 'ORD-004', status: 'Delayed', origin: 'Nagpur, MH', destination: 'Pune, MH', estDelivery: 'Today, 8 PM' },
];

const chartData = [
  { month: "Jan", deliveries: 186 },
  { month: "Feb", deliveries: 305 },
  { month: "Mar", deliveries: 237 },
  { month: "Apr", deliveries: 73 },
  { month: "May", deliveries: 209 },
  { month: "Jun", deliveries: 214 },
]

const chartConfig = {
  deliveries: {
    label: "Deliveries",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig


export default function LogisticsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Logistics Dashboard</h1>
        <p className="text-muted-foreground">Manage and track your assigned shipments.</p>
      </header>
        
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently in transit or pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">+1.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9/5.0</div>
            <p className="text-xs text-muted-foreground">Based on 250+ reviews</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Delivered</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">All-time completed shipments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Assigned Shipments</CardTitle>
                    <CardDescription>An overview of your active and recent shipments.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Origin</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {mockShipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                        <TableCell className="font-medium">{shipment.id}</TableCell>
                        <TableCell>
                            <Badge variant={
                                shipment.status === 'Delivered' ? 'default'
                                : shipment.status === 'In Transit' ? 'secondary'
                                : shipment.status === 'Delayed' ? 'destructive'
                                : 'outline'
                            }
                            className={`${shipment.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-200' : ''} ${shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-200' : ''}`}
                            >
                            {shipment.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{shipment.origin}</TableCell>
                        <TableCell>{shipment.destination}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/orders/${shipment.id}`}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
               <Card>
                    <CardHeader>
                        <CardTitle>Performance Analytics</CardTitle>
                        <CardDescription>Monthly delivery statistics.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="deliveries" fill="var(--color-deliveries)" radius={8} />
                        </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Real-Time Map</CardTitle>
                        <CardDescription>Live locations of in-transit shipments.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 relative h-[250px] bg-muted/50 dark:bg-muted/30 flex items-center justify-center">
                        <Image src="/map-placeholder.png" alt="Map of shipments" layout="fill" objectFit="cover" className="rounded-b-lg opacity-50 dark:opacity-20" />
                        <p className='z-10 font-medium text-muted-foreground'>Map Placeholder</p>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div>
             {/* Placeholder for future content, like alerts or detailed selected shipment */}
        </div>
      </div>
    </div>
  );
}
