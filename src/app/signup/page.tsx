
'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";

type Tab = "phone" | "verification" | "profile";

export default function SignupPage() {
    const [currentTab, setCurrentTab] = useState<Tab>("phone");
    const { toast } = useToast();
    const router = useRouter();

    const handleSendOtp = () => {
        // Simulate sending OTP and move to next step
        toast({ title: "OTP Sent!", description: "Check your phone for the verification code." });
        setCurrentTab("verification");
    }

    const handleVerifyAadhaar = () => {
        // Simulate Aadhaar verification and move to next step
        toast({ title: "Aadhaar Verified!", description: "Please complete your profile." });
        setCurrentTab("profile");
    }

    const handleCreateAccount = () => {
        // Simulate account creation and redirect
        toast({ title: "Account Created!", description: "Welcome to AgriChain Connect!" });
        router.push("/dashboard");
    }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
            <Leaf className="mx-auto h-10 w-10 text-primary mb-2" />
            <CardTitle className="text-2xl font-headline">Join AgriChain Connect</CardTitle>
            <CardDescription>Create your account to start buying or selling.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as Tab)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phone">1. Phone</TabsTrigger>
              <TabsTrigger value="verification">2. Verification</TabsTrigger>
              <TabsTrigger value="profile">3. Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="phone" className="mt-6">
                <div className="space-y-4">
                    <h3 className="font-semibold">Enter your Phone Number</h3>
                    <p className="text-sm text-muted-foreground">We'll send you a one-time password (OTP) to verify your number.</p>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+91 00000 00000" defaultValue="+91 98765 43210" />
                    </div>
                    <Button className="w-full" onClick={handleSendOtp}>Send OTP</Button>
                </div>
            </TabsContent>

            <TabsContent value="verification" className="mt-6">
                <div className="space-y-4">
                     <h3 className="font-semibold">Verify Your Identity</h3>
                     <p className="text-sm text-muted-foreground">Please complete Aadhaar verification for a secure and trusted marketplace experience.</p>
                    <div className="space-y-2">
                        <Label htmlFor="aadhaar">Aadhaar Number</Label>
                        <Input id="aadhaar" placeholder="XXXX XXXX XXXX" defaultValue="1234 5678 9012" />
                    </div>
                    <Button className="w-full" onClick={handleVerifyAadhaar}>Verify with Aadhaar</Button>
                    <p className="text-center text-xs text-muted-foreground">Your data is encrypted and secure.</p>
                </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
                <div className="space-y-4">
                    <h3 className="font-semibold">Complete Your Profile</h3>
                    <p className="text-sm text-muted-foreground">This information will be displayed to other users.</p>
                     <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" placeholder="Enter your full name" defaultValue="Demo User" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location / Pincode</Label>
                        <Input id="location" placeholder="e.g., Pune, 411001" defaultValue="Pune, 411057" />
                    </div>
                    <Button className="w-full" onClick={handleCreateAccount}>Create Account</Button>
                </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold text-primary">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
