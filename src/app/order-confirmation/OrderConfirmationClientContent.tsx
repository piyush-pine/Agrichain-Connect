
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Package, Link as LinkIcon, Lock } from 'lucide-react';

export function OrderConfirmationClientContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const txHash = searchParams.get('tx');

    useEffect(() => {
        if (!txHash) {
            router.replace('/');
        }
    }, [txHash, router]);

    if (!txHash) {
        // This will be handled by the skeleton fallback in the parent component
        return null;
    }

    const shortTxHash = `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;

    return (
        <Card className="w-full max-w-2xl text-center p-8">
            <CardHeader>
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <CardTitle className="text-3xl font-headline">Order Confirmed!</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                    Thank you for your purchase. Your order is being processed.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg text-left space-y-3">
                    <p className="flex justify-between items-center">
                        <span className="font-semibold">Order Status:</span>
                        <span className='font-medium text-primary flex items-center gap-2'>
                            <Lock size={14} /> Funds Secured in Escrow
                        </span>
                    </p>
                    <p className="flex justify-between items-center">
                        <span className="font-semibold">Blockchain Transaction:</span>
                        <Link
                            href={`/tx/${txHash}`} 
                            className="flex items-center gap-1 text-primary hover:underline"
                        >
                            {shortTxHash} <LinkIcon size={14} />
                        </Link>
                    </p>
                    <p className="text-xs text-muted-foreground pt-2">
                        Your payment is locked in our `EscrowPayment.sol` smart contract. Funds will be automatically released to the farmer upon successful delivery, verified by our `IoTConditionRegistry.sol` for quality assurance.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild>
                        <Link href="/dashboard/orders">
                            <Package className="mr-2 h-4 w-4"/>
                            View My Orders
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
