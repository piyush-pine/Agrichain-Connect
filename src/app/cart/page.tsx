
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const estimatedTax = subtotal * 0.09; // 9% GST
  const logisticsFee = cart.length > 0 ? 50.0 : 0.0;
  const total = subtotal + estimatedTax + logisticsFee;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle>Your Cart is Empty</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Items in your cart</CardTitle>
                </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {cart.map((item) => (
                    <li key={item.product.id} className="flex items-center p-6 gap-6">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                        data-ai-hint={item.product.imageHint}
                      />
                      <div className="flex-grow">
                        <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          From {item.product.farmer.name}
                        </p>
                        <p className="text-lg font-semibold mt-1">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.product.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-20 text-center"
                          aria-label={`Quantity for ${item.product.name}`}
                        />
                         <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order before proceeding to secure payment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                <Button asChild size="lg" className="w-full mt-6">
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Secure payments via our blockchain escrow system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
