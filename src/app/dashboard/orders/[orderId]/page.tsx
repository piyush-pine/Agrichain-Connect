
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Circle, Package, Truck, Home, ShieldCheck, Link as LinkIcon } from "lucide-react";
import Link from 'next/link';

const mockOrderDetails = {
    id: 'ORD-001',
    date: '2023-10-26',
    customer: 'Alice Johnson',
    total: 25.50,
    status: 'Delivered',
    items: [
        { name: 'Fresh Tomatoes', quantity: 5, price: 2.50 },
        { name: 'Crunchy Carrots', quantity: 3, price: 1.80 },
    ],
    shippingAddress: '123 Main St, Anytown, USA 12345',
    txHash: '0x123...abc'
};

const trackingSteps = [
    { status: 'Order Placed & Escrow Funded', icon: Package, completed: true, blockchain: true, description: "Funds secured in EscrowPayment.sol smart contract." },
    { status: 'Processing by Farmer', icon: Circle, completed: true, blockchain: false, description: "Green Valley Farms is preparing your order." },
    { status: 'Shipped', icon: Truck, completed: true, blockchain: false, description: "Your order is on its way." },
    { status: 'In Transit - Quality Verified', icon: ShieldCheck, completed: true, blockchain: true, description: "IoT data hash for temperature & humidity logged to IoTConditionRegistry.sol." },
    { status: 'Delivered', icon: Home, completed: true, blockchain: false, description: "Your fresh produce has arrived." },
    { status: 'Payment Released to Farmer', icon: CheckCircle, completed: true, blockchain: true, description: "Funds automatically released from escrow upon verified delivery." },
];

export default function OrderTrackingPage({ params }: { params: { orderId: string }}) {
  // In a real app, you would fetch order details based on params.orderId
  const order = mockOrderDetails;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Track Order</h1>
        <p className="text-muted-foreground">Order ID: {order.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Shipment Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative pl-6">
                        {/* Vertical line */}
                        <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-border"></div>

                        {trackingSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4 mb-8">
                            <div className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full ${step.completed ? 'bg-primary' : 'bg-muted border'}`}>
                                <step.icon className={`h-5 w-5 ${step.completed ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="pt-1.5">
                                <p className={`font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.status}</p>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                {step.blockchain && (
                                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                        <ShieldCheck size={14} />
                                        <span>Verified on Polygon</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                     <CardDescription>
                        Placed on {order.date}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {order.items.map(item => (
                            <div key={item.name} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{item.name} (x{item.quantity})</span>
                                <span>${(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-4" />
                     <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4" />
                     <div>
                        <h4 className="font-semibold mb-2">Shipping To</h4>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                    </div>
                     <Separator className="my-4" />
                    <Button asChild variant="outline" className="w-full">
                        <a href={`https://mumbai.polygonscan.com/tx/${order.txHash}`} target="_blank" rel="noopener noreferrer">
                            <LinkIcon className="mr-2 h-4 w-4" /> View on PolygonScan
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
