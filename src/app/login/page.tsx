
'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Leaf, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [loadingMethod, setLoadingMethod] = useState<'otp' | 'google' | 'aadhaar' | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (method: 'otp' | 'google' | 'aadhaar') => {
    setLoadingMethod(method);
    toast({
      title: 'Logging in...',
      description: `Authenticating via ${method === 'otp' ? 'OTP' : method.charAt(0).toUpperCase() + method.slice(1)}. Please wait.`,
    });

    setTimeout(() => {
      toast({
        title: 'Login Successful!',
        description: 'Redirecting you to your dashboard.',
      });
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Leaf className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Enter your phone number to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 00000 00000" required disabled={!!loadingMethod} />
            </div>
            <Button type="button" className="w-full" onClick={() => handleLogin('otp')} disabled={!!loadingMethod}>
              {loadingMethod === 'otp' ? <Loader2 className="animate-spin" /> : 'Send OTP'}
            </Button>
          </div>
          <Separator className="my-6" />
          <div className="text-center">
             <p className="text-sm text-muted-foreground">Or continue with</p>
             <div className="flex items-center justify-center gap-4 mt-4">
                <Button variant="outline" className="w-full" onClick={() => handleLogin('google')} disabled={!!loadingMethod}>
                  {loadingMethod === 'google' ? <Loader2 className="animate-spin" /> : 'Google'}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleLogin('aadhaar')} disabled={!!loadingMethod}>
                  {loadingMethod === 'aadhaar' ? <Loader2 className="animate-spin" /> : 'Aadhaar'}
                </Button>
             </div>
          </div>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline font-semibold text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
