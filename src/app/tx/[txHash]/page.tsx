
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Copy, FileText, HardDrive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

function InfoRow({ label, value, isHash = false }: { label: string, value: string, isHash?: boolean }) {
    const { toast } = useToast();
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast({ title: 'Copied to clipboard!' });
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border/50">
            <dt className="text-muted-foreground w-full sm:w-1/4">{label}</dt>
            <dd className={`flex items-center gap-2 break-all w-full sm:w-3/4 ${isHash ? 'font-mono text-sm' : 'font-medium'}`}>
                <span>{value}</span>
                {isHash && (
                    <button onClick={handleCopy} title="Copy hash">
                        <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground transition" />
                    </button>
                )}
            </dd>
        </div>
    );
}

export default function TransactionDetailPage({ params }: { params: { txHash: string } }) {
    const { txHash } = params;
    const blockNumber = Math.floor(Math.random() * 1000000) + 50000000;
    const timestamp = `${Math.floor(Math.random() * 59)} secs ago (${new Date().toUTCString()})`;
    const fromAddress = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const toContract = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const value = `${(Math.random() * 0.1).toFixed(6)} MATIC`;
    const fee = `${(Math.random() * 0.001).toFixed(8)} MATIC`;

    return (
        <div className="bg-muted/30 min-h-[calc(100vh-4rem)]">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-6">
                    <div className="flex items-center gap-2">
                         <Image src="/polygon-logo.svg" alt="Polygon Logo" width={32} height={32} />
                        <h1 className="text-2xl font-bold font-headline">Transaction Details</h1>
                    </div>
                </header>

                <Card>
                    <CardContent className="p-6">
                        <dl>
                            <InfoRow label="Transaction Hash" value={txHash} isHash />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border/50">
                                <dt className="text-muted-foreground w-full sm:w-1/4">Status</dt>
                                <dd className="w-full sm:w-3/4">
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/30 dark:text-green-200 dark:hover:bg-green-800/40">
                                        <CheckCircle size={14} className="mr-1" /> Success
                                    </Badge>
                                </dd>
                            </div>
                            <InfoRow label="Block" value={blockNumber.toLocaleString()} />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border/50">
                                <dt className="text-muted-foreground w-full sm:w-1/4">Timestamp</dt>
                                <dd className="flex items-center gap-1.5 w-full sm:w-3/4">
                                    <Clock className="h-4 w-4" />
                                    <span>{timestamp}</span>
                                </dd>
                            </div>

                            <Separator className="my-2" />

                            <InfoRow label="From" value={fromAddress} isHash />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border/50">
                                <dt className="text-muted-foreground w-full sm:w-1/4">Interacted With (To)</dt>
                                <dd className="flex items-center gap-2 w-full sm:w-3/4">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <span className="font-mono text-sm break-all">{toContract}</span>
                                    <button title="Copy contract address">
                                        <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground transition" />
                                    </button>
                                </dd>
                            </div>

                            <Separator className="my-2" />

                            <InfoRow label="Value" value={value} />
                            <InfoRow label="Transaction Fee" value={fee} />

                            <Separator className="my-2" />
                            
                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
                                <dt className="text-muted-foreground w-full sm:w-1/4 flex items-center gap-1.5">
                                    <HardDrive className="h-4 w-4" /> More Details
                                </dt>
                                <dd className="flex items-center gap-2 text-sm w-full sm:w-3/4">
                                    <span className="font-medium">Gas Price:</span> 
                                    <span>{(Math.random() * 20).toFixed(8)} Gwei</span>
                                    <span className="text-muted-foreground">(Gas Limit & Usage by Txn: 2,995,336)</span>
                                </dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
