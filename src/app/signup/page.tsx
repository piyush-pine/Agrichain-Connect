import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
            <Leaf className="mx-auto h-10 w-10 text-primary mb-2" />
            <CardTitle className="text-2xl font-headline">Join AgriChain Connect</CardTitle>
            <CardDescription>Create your account to start buying or selling.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="w-full">
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
                        <Input id="phone" type="tel" placeholder="+91 00000 00000" />
                    </div>
                    <Button className="w-full">Send OTP</Button>
                </div>
            </TabsContent>

            <TabsContent value="verification" className="mt-6">
                <div className="space-y-4">
                     <h3 className="font-semibold">Verify Your Identity</h3>
                     <p className="text-sm text-muted-foreground">Please complete Aadhaar verification for a secure and trusted marketplace experience.</p>
                    <div className="space-y-2">
                        <Label htmlFor="aadhaar">Aadhaar Number</Label>
                        <Input id="aadhaar" placeholder="XXXX XXXX XXXX" />
                    </div>
                    <Button className="w-full">Verify with Aadhaar</Button>
                    <p className="text-center text-xs text-muted-foreground">Your data is encrypted and secure.</p>
                </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
                <div className="space-y-4">
                    <h3 className="font-semibold">Complete Your Profile</h3>
                    <p className="text-sm text-muted-foreground">This information will be displayed to other users.</p>
                     <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location / Pincode</Label>
                        <Input id="location" placeholder="e.g., Pune, 411001" />
                    </div>
                    <Button className="w-full">Create Account</Button>
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
