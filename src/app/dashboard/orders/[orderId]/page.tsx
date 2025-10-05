
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck, Home, ShieldCheck, Link as LinkIcon, MapPin } from "lucide-react";
import Link from 'next/link';

const mockOrderDetails = {
    id: 'ORD-003',
    date: '2023-10-24',
    customer: 'Charlie Brown',
    total: 800.00,
    status: 'Shipped',
    items: [
        { name: 'Himachali Apples', quantity: 10, price: 4.20 },
    ],
    shippingAddress: '456 Tech Park, Mumbai, India 400051',
    txHash: '0x456def'
};

const initialSteps = [
    { status: 'Order Placed & Escrow Funded', icon: Package, completed: true, blockchain: true, description: "Funds secured in EscrowPayment.sol smart contract." },
    { status: 'Packed at Farm', icon: Package, completed: false, blockchain: false, description: "Your order is being prepared by Green Valley Farms." },
    { status: 'Dispatched', icon: Truck, completed: false, blockchain: false, description: "Shipment has left the farm." },
    { status: 'Checkpoint 1 (Ujjain)', icon: MapPin, completed: false, blockchain: true, description: "Shipment passed through Ujjain checkpoint." },
    { status: 'Checkpoint 2 (Dewas)', icon: MapPin, completed: false, blockchain: true, description: "Shipment passed through Dewas checkpoint." },
    { status: 'Entering Mumbai', icon: Truck, completed: false, blockchain: false, description: "Your order has reached Mumbai city limits." },
    { status: 'Out for Delivery', icon: Home, completed: false, blockchain: false, description: "Your package is on its final leg." },
    { status: 'Delivered', icon: Home, completed: false, blockchain: false, description: "Your fresh produce has arrived." },
    { status: 'Payment Released', icon: CheckCircle, completed: false, blockchain: true, description: "Funds automatically released from escrow to the farmer." },
];

export default function OrderTrackingPage({ params }: { params: { orderId: string }}) {
  const [trackingSteps, setTrackingSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(1);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  const order = mockOrderDetails;

  useEffect(() => {
    if (!simulationStarted || deliveryConfirmed) return;

    if (currentStep >= 7) { // 7 is 'Out for Delivery'
      setSimulationComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setTrackingSteps(prevSteps => 
        prevSteps.map((step, index) => 
          index <= currentStep ? { ...step, completed: true } : step
        )
      );
      setCurrentStep(prev => prev + 1);
    }, 2000); // 2 seconds per step

    return () => clearTimeout(timer);
  }, [currentStep, simulationStarted, deliveryConfirmed]);

  const handleStartSimulation = () => {
    setSimulationStarted(true);
    setTrackingSteps(initialSteps.map((step, index) => index === 0 ? { ...step, completed: true } : { ...step, completed: false }));
    setCurrentStep(1);
    setSimulationComplete(false);
    setDeliveryConfirmed(false);
  };
  
  const handleConfirmDelivery = () => {
    setDeliveryConfirmed(true);
    // Mark all steps including final ones as complete
     setTrackingSteps(prevSteps => 
        prevSteps.map(step => ({...step, completed: true}))
      );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Track Order</h1>
        <p className="text-muted-foreground">Order ID: {order.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Shipment Timeline</CardTitle>
                    {!simulationStarted ? (
                        <Button onClick={handleStartSimulation}>Start Shipment Simulation</Button>
                    ) : (
                         <Button onClick={handleStartSimulation} variant="outline">Restart Simulation</Button>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="relative pl-6">
                        {/* Vertical line */}
                        <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-border"></div>

                        {trackingSteps.slice(0, deliveryConfirmed ? trackingSteps.length : 8).map((step, index) => (
                        <div key={index} className="flex items-start gap-4 mb-8">
                            <div className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full transition-colors duration-500 ${step.completed ? 'bg-primary' : 'bg-muted border'}`}>
                                <step.icon className={`h-5 w-5 transition-colors duration-500 ${step.completed ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="pt-1.5">
                                <p className={`font-semibold transition-colors duration-500 ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.status}</p>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                {step.blockchain && step.completed && (
                                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1 animate-in fade-in">
                                        <ShieldCheck size={14} />
                                        <span>Verified on Polygon</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        ))}
                         {deliveryConfirmed && (
                            <div className="flex items-start gap-4 mb-8 animate-in fade-in duration-500">
                                <div className="relative z-10 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <div className="pt-1.5">
                                    <p className="font-semibold text-foreground">Payment Released to Farmer</p>
                                    <p className="text-sm text-muted-foreground">Funds automatically released from escrow upon verified delivery.</p>
                                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                        <ShieldCheck size={14} />
                                        <span>Verified on Polygon</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                     {simulationComplete && !deliveryConfirmed && (
                        <div className="text-center p-4 border-t animate-in fade-in">
                           <p className="font-semibold mb-2">Shipment is out for delivery!</p>
                           <Button onClick={handleConfirmDelivery}>Confirm Delivery (Simulate QR Scan)</Button>
                        </div>
                    )}
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
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>$720.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>GST (9%)</span>
                            <span>$72.00</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span>Logistics Fee</span>
                            <span>$50.00</span>
                        </div>
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
                        <Link href={`/tx/${order.txHash}`}>
                            <LinkIcon className="mr-2 h-4 w-4" /> View on Explorer
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
