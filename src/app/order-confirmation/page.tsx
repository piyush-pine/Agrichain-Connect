
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Package, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const txHash = searchParams.get('tx');

    if (!txHash) {
        // In a real app you might want a more robust handling
        if (typeof window !== 'undefined') {
            router.replace('/');
        }
        return null;
    }

    const shortTxHash = txHash ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}` : 'N/A';

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
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
                    <a 
                        href={`https://mumbai.polygonscan.com/tx/${txHash}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-primary hover:underline"
                    >
                        {shortTxHash} <LinkIcon size={14} />
                    </a>
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
    </div>
  );
}
