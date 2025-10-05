
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Package, Link as LinkIcon, Lock } from 'lucide-react';
import { OrderConfirmationClientContent } from './OrderConfirmationClientContent';

function OrderConfirmationSkeleton() {
    return (
        <Card className="w-full max-w-2xl text-center p-8 animate-pulse">
            <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-muted mb-4" />
                <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
                <div className="h-6 bg-muted rounded w-1/2 mx-auto mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg space-y-4">
                    <div className="h-5 bg-muted-foreground/20 rounded w-full" />
                    <div className="h-5 bg-muted-foreground/20 rounded w-full" />
                    <div className="h-8 bg-muted-foreground/20 rounded w-full mt-2" />
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <div className="h-10 bg-muted rounded w-full sm:w-40" />
                    <div className="h-10 bg-muted rounded w-full sm:w-40" />
                </div>
            </CardContent>
        </Card>
    )
}

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Suspense fallback={<OrderConfirmationSkeleton />}>
            <OrderConfirmationClientContent />
        </Suspense>
    </div>
  );
}
