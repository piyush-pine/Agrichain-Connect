
"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-bold font-headline text-primary"
    >
      <Leaf className="h-7 w-7" />
      <span>AgriChain</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">How It Works</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
        </nav>
        <div className="flex items-center justify-end space-x-2 md:w-auto w-full">
            <Button asChild variant="ghost">
                <Link href="/login">
                    Login
                </Link>
            </Button>
             <Button asChild>
                <Link href="/signup">
                    Register
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
