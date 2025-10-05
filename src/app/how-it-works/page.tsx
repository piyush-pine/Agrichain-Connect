
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Edit, Search, ShoppingCart, Truck, QrCode, Lock, CircleDollarSign, ShieldCheck } from 'lucide-react';
import { BlockchainBackground } from '@/components/BlockchainBackground';

const farmerSteps = [
    {
        icon: UserPlus,
        title: 'Onboarding & Verification',
        description: 'Farmers sign up with their phone number and verify their identity using Aadhaar. This creates a secure, immutable identity on the blockchain.'
    },
    {
        icon: Edit,
        title: 'List Products',
        description: 'Once verified, farmers can list their produce. Each product is registered as a unique asset on the blockchain, capturing details like origin and category.'
    }
];

const buyerSteps = [
    {
        icon: Search,
        title: 'Discover & Verify',
        description: 'Buyers browse the marketplace and can view the full, blockchain-verified history of any product, ensuring its authenticity and origin.'
    },
    {
        icon: ShoppingCart,
        title: 'Secure Purchase',
        description: 'When an order is placed, the payment is locked into a smart contract escrow. This protects both buyer and seller.'
    }
];

const logisticsSteps = [
    {
        icon: Truck,
        title: 'Shipment & Tracking',
        description: 'The product is shipped. IoT sensors (future feature) can record conditions like temperature, with key data hashed onto the blockchain at checkpoints.'
    },
    {
        icon: QrCode,
        title: 'Delivery Confirmation',
        description: 'Upon arrival, the buyer confirms delivery by scanning a unique QR code. This action is recorded on the blockchain as proof of delivery.'
    }
];

const paymentSteps = [
     {
        icon: CircleDollarSign,
        title: 'Automatic Payment Release',
        description: 'The verified delivery confirmation automatically triggers the smart contract to release the escrowed funds directly to the farmer. No middlemen, no delays.'
    }
]

function StepCard({ icon: Icon, title, description, stepNumber }: { icon: React.ElementType, title: string, description: string, stepNumber: number }) {
    return (
        <Card className="h-full relative overflow-hidden bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
                <div>
                     <Badge variant="outline" className="mb-2">Step {stepNumber}</Badge>
                    <CardTitle>{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

export default function HowItWorksPage() {
    return (
        <div className="relative isolate py-12 md:py-20">
            <BlockchainBackground />
             <div className="container mx-auto px-4 z-10 relative">
                <header className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">How AgriChain Works</h1>
                    <p className="text-lg text-muted-foreground mt-4">
                        A transparent, step-by-step journey from farm to fork, powered by blockchain technology for ultimate trust and efficiency.
                    </p>
                </header>

                <div className="space-y-16">
                    {/* Farmer/MSME Section */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8 text-center text-primary">For Farmers & MSMEs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {farmerSteps.map((step, index) => (
                                <StepCard key={index} {...step} stepNumber={index + 1} />
                            ))}
                        </div>
                    </section>

                    {/* Buyer Section */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8 text-center text-primary">For Buyers</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {buyerSteps.map((step, index) => (
                                <StepCard key={index} {...step} stepNumber={index + 3} />
                            ))}
                        </div>
                    </section>

                    {/* Logistics Section */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8 text-center text-primary">Logistics & Delivery</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {logisticsSteps.map((step, index) => (
                                <StepCard key={index} {...step} stepNumber={index + 5} />
                            ))}
                        </div>
                    </section>

                     {/* Payment Section */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8 text-center text-primary">Payment & Settlement</h2>
                         <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
                           {paymentSteps.map((step, index) => (
                                <StepCard key={index} {...step} stepNumber={index + 7} />
                            ))}
                        </div>
                    </section>
                </div>

                <Card className="mt-20 text-center max-w-3xl mx-auto p-8 bg-green-50 dark:bg-green-900/20 border-primary/20">
                     <CardHeader>
                        <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
                        <CardTitle className="text-2xl">Trust at Every Step</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">
                            Every critical action—from product listing to delivery confirmation—is a transaction recorded on the blockchain. This creates an immutable, auditable, and transparent record that builds trust between all parties, eliminates disputes, and ensures fair and timely payments.
                        </p>
                    </CardContent>
                </Card>
             </div>
        </div>
    );
}
