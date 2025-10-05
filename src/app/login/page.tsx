
'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Leaf, Loader2, User, ShoppingCart, Truck, UserCog } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

type LoginStep = 'phone' | 'role';
type Role = 'farmer' | 'buyer' | 'logistics' | 'admin';

export default function LoginPage() {
  const [loadingRole, setLoadingRole] = useState<Role | null>(null);
  const [step, setStep] = useState<LoginStep>('phone');
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSendOtp = () => {
    setIsOtpLoading(true);
    toast({
      title: 'Sending OTP...',
      description: 'Please wait a moment.',
    });

    setTimeout(() => {
      setIsOtpLoading(false);
      setStep('role');
      toast({
        title: 'OTP Sent!',
        description: 'Please select your role to continue.',
      });
    }, 1000);
  };

  const handleLogin = (role: Role) => {
    setLoadingRole(role);
    toast({
      title: 'Logging in...',
      description: `Authenticating as ${role}. Please wait.`,
    });

    setTimeout(() => {
      toast({
        title: 'Login Successful!',
        description: 'Redirecting you to your dashboard.',
      });

      switch (role) {
        case 'farmer':
          router.push('/dashboard');
          break;
        case 'buyer':
          router.push('/products');
          break;
        case 'logistics':
          router.push('/logistics');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          router.push('/');
          break;
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Leaf className="mx-auto h-10 w-10 text-primary mb-2" />
          {step === 'phone' ? (
            <>
              <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
              <CardDescription>Enter your phone number to sign in to your account</CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-headline">Select Your Role</CardTitle>
              <CardDescription>Choose how you want to log in to the platform.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 00000 00000" required disabled={isOtpLoading} />
                </div>
                <Button type="button" className="w-full" onClick={handleSendOtp} disabled={isOtpLoading}>
                  {isOtpLoading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
                </Button>
              </div>
              <Separator className="my-6" />
              <div className="text-center">
                 <div className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="/signup" className="underline font-semibold text-primary">
                    Sign up
                    </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg" className="flex-col h-24" onClick={() => handleLogin('farmer')} disabled={!!loadingRole}>
                    {loadingRole === 'farmer' ? <Loader2 className="animate-spin" /> : <User />}
                    <span>Farmer/MSME</span>
                </Button>
                 <Button variant="outline" size="lg" className="flex-col h-24" onClick={() => handleLogin('buyer')} disabled={!!loadingRole}>
                    {loadingRole === 'buyer' ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
                    <span>Buyer</span>
                </Button>
                 <Button variant="outline" size="lg" className="flex-col h-24" onClick={() => handleLogin('logistics')} disabled={!!loadingRole}>
                    {loadingRole === 'logistics' ? <Loader2 className="animate-spin" /> : <Truck />}
                    <span>Logistics</span>
                </Button>
                 <Button variant="outline" size="lg" className="flex-col h-24" onClick={() => handleLogin('admin')} disabled={!!loadingRole}>
                    {loadingRole === 'admin' ? <Loader2 className="animate-spin" /> : <UserCog />}
                    <span>Admin</span>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
