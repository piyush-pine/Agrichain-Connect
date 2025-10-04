
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, UserCheck, BarChart, Users, Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


const initialVerifications = [
  { id: 'usr_001', name: 'Ravi Kumar', type: 'Aadhaar', status: 'Pending' },
  { id: 'usr_002', name: 'Sunita Devi', type: 'Product', status: 'Pending' },
];

const mockFraudAlerts = [
  { id: 'lst_101', product: 'Organic Honey', seller: 'FarmFresh Co.', reason: 'Price Anomaly', score: 0.92 },
  { id: 'lst_102', product: 'Basmati Rice', seller: 'Grains & More', reason: 'Duplicate Listing', score: 0.78 },
];

export default function AdminDashboardPage() {
    const [verifications, setVerifications] = useState(initialVerifications);
    const { toast } = useToast();

    const handleReview = (id: string, approved: boolean) => {
        setVerifications(verifications.filter(v => v.id !== id));
        toast({
            title: `Verification ${approved ? 'Approved' : 'Rejected'}`,
            description: `The item has been processed and removed from the queue.`,
        });
    };


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage platform activities.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifications.length}</div>
            <p className="text-xs text-muted-foreground">Action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFraudAlerts.length}</div>
            <p className="text-xs text-muted-foreground">High-priority alerts</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blockchain Transactions</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Verification Queue</CardTitle>
            <CardDescription>Review and approve pending user and product verifications.</CardDescription>
          </CardHeader>
          <CardContent>
            {verifications.length > 0 ? (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Verification Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {verifications.map(v => (
                    <TableRow key={v.id}>
                        <TableCell className="font-medium">{v.name}</TableCell>
                        <TableCell>{v.type}</TableCell>
                        <TableCell><Badge variant="outline">{v.status}</Badge></TableCell>
                        <TableCell className="text-right">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">Review</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Review {v.type} Verification</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Review the details for {v.name}'s {v.type.toLowerCase()} verification. This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleReview(v.id, false)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    <X className="mr-2 h-4 w-4" /> Reject
                                </AlertDialogAction>
                                <AlertDialogAction onClick={() => handleReview(v.id, true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                   <Check className="mr-2 h-4 w-4" /> Approve
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            ) : (
                <div className="text-center p-8 text-muted-foreground">
                    <UserCheck className="mx-auto h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold">Queue Clear!</h3>
                    <p>No pending verifications at the moment.</p>
                </div>
            )}
            
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Fraud Alerts</CardTitle>
            <CardDescription>Potentially fraudulent listings detected by our AI model.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFraudAlerts.map(alert => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.product}</TableCell>
                    <TableCell>{alert.reason}</TableCell>
                    <TableCell>
                      <Badge variant={alert.score > 0.9 ? 'destructive' : 'secondary'}>
                        {(alert.score * 100).toFixed(0)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Investigate</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
