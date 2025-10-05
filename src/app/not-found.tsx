
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Home } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// A simple, friendly SVG character
function ConfusedCharacter() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      className="text-primary drop-shadow-lg"
    >
      <g transform="translate(10,10)">
        {/* Body */}
        <path d="M25 50 C25 20, 105 20, 105 50 L105 100 C105 120, 25 120, 25 100 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="3"/>
        {/* Screen */}
        <rect x="35" y="35" width="60" height="40" rx="5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Eyes */}
        <line x1="50" y1="50" x2="60" y2="60" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="50" x2="50" y2="60" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="50" x2="90" y2="60" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
        <line x1="90" y1="50" x2="80" y2="60" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
        {/* Mouth */}
        <path d="M55 70 Q 65 65, 75 70" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Antenna */}
        <line x1="65" y1="20" x2="65" y2="5" stroke="hsl(var(--primary))" strokeWidth="2"/>
        <circle cx="65" cy="5" r="4" fill="hsl(var(--primary))" />
      </g>
    </svg>
  );
}


export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-muted/20 p-4">
      <Card className="w-full max-w-xl text-center shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <CardHeader>
           <div className="mx-auto my-6">
             <ConfusedCharacter />
           </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
            Oops! Page Not Found
          </h1>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-lg text-muted-foreground">
            This page took a detour! We can't seem to find what you're looking for.
          </p>
          <div className="flex w-full max-w-sm mx-auto items-center space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search the site..." className="pl-10" />
            </div>
            <Button type="submit" variant="secondary">Search</Button>
          </div>
          <div>
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
