
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Lock, Loader2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const estimatedTax = subtotal * 0.09;
  const logisticsFee = cart.length > 0 ? 50.0 : 0.0;
  const total = subtotal + estimatedTax + logisticsFee;


  const handleConnectWallet = () => {
    toast({ title: 'Connecting Wallet...', description: 'Please approve the connection in your wallet.' });
    setTimeout(() => {
      setIsWalletConnected(true);
      toast({ title: 'Wallet Connected!', description: 'Your wallet (0x...dEaD) is now connected.' });
    }, 1500);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    toast({
      title: 'Processing Transaction...',
      description: 'Locking funds in escrow on the Polygon network. Please wait.',
    });
    setTimeout(() => {
      const txHash = `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      clearCart();
      setIsProcessing(false);
      toast({
        title: 'Transaction Confirmed!',
        description: 'Your order has been placed and funds are secured in escrow.',
      });
      router.push(`/order-confirmation?tx=${txHash}`);
    }, 3000);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <Card className="max-w-md mx-auto p-8">
                <CardHeader>
                    <CardTitle>Your Cart is Empty</CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="text-muted-foreground mb-4">Start shopping to proceed to checkout.</p>
                    <Button asChild><a href="/products">Continue Shopping</a></Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Satoshi Nakamoto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Input id="address" defaultValue="123 Blockchain Blvd" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="Mumbai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" defaultValue="400001" />
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
               <ul className="divide-y divide-border">
                  {cart.map(item => (
                    <li key={item.product.id} className="flex items-center py-4 gap-4">
                      <Image src={item.product.imageUrl} alt={item.product.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.product.imageHint} />
                      <div className="flex-grow">
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
               </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Confirm & Pay</CardTitle>
              <CardDescription>Secure your order using our blockchain escrow system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>GST (9%)</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between">
                    <span>Logistics Fee</span>
                    <span>${logisticsFee.toFixed(2)}</span>
                  </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {isWalletConnected ? (
                <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Place Order & Lock Funds in Escrow
                    </>
                  )}
                </Button>
              ) : (
                <Button size="lg" className="w-full" onClick={handleConnectWallet}>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Connect Wallet to Continue
                </Button>
              )}
               <p className="text-xs text-muted-foreground text-center mt-4">
                 Transactions are secured on the Polygon Mumbai testnet.
               </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
