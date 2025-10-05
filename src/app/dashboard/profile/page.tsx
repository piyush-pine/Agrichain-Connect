
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Upload } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <p className="text-muted-foreground">Manage your personal and business information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Business & Personal Information</CardTitle>
                <CardDescription>Update your photo and KYC details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <p className="font-semibold text-lg">Demo User</p>
                        <p className="text-muted-foreground">farmer-1</p>
                        <Button variant="outline" size="sm" className="mt-2">
                            <Upload className="mr-2 h-4 w-4" />
                            Change Photo
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Demo User" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 98765 43210" disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="Pune, 411057" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aadhaar">Aadhaar</Label>
                        <Input id="aadhaar" defaultValue="XXXX XXXX 9012" disabled />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="pan">PAN Card</Label>
                        <Input id="pan" defaultValue="ABCDE1234F" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="gstin">GSTIN Number</Label>
                        <Input id="gstin" placeholder="e.g., 22ABCDE1234F1Z5" />
                    </div>
                     <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="fssai">FSSAI License</Label>
                        <Input id="fssai" placeholder="e.g., 10012345678901" />
                    </div>
                </div>
                <div className="flex justify-end">
                        <Button>Save Changes</Button>
                </div>
                </CardContent>
            </Card>
        </div>
         <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                    <CardDescription>Your current KYC and verification levels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <span className="font-medium">Phone Number</span>
                        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                           <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <span className="font-medium">Aadhaar</span>
                         <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                           <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <span className="font-medium">PAN Card</span>
                         <Badge variant="secondary">Not Submitted</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <span className="font-medium">GSTIN</span>
                        <Badge variant="secondary">Not Submitted</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <span className="font-medium">FSSAI License</span>
                        <Badge variant="secondary">Not Submitted</Badge>
                    </div>
                    <Button variant="outline" className="w-full mt-2">Upload Documents</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
