
"use client";

import Link from "next/link";
import { ShoppingCart, Leaf, Globe, User, LogIn, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-bold font-headline text-primary"
    >
      <Leaf className="h-7 w-7" />
      <span>AgriChain Connect</span>
    </Link>
  );
}

function LanguageToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>English</DropdownMenuItem>
        <DropdownMenuItem>हिंदी (Hindi)</DropdownMenuItem>
        <DropdownMenuItem>मराठी (Marathi)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const { cart } = useCart();
  const isAuthenticated = false; // Mock authentication state

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-2">
            <LanguageToggle />
            <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.length > 0 && (
                        <Badge variant="destructive" className="absolute top-2 right-2 h-4 w-4 justify-center rounded-full p-0 text-xs">
                            {cart.length}
                        </Badge>
                    )}
                    <span className="sr-only">Shopping Cart</span>
                </Link>
            </Button>
          {isAuthenticated ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4"/>
                    Login
                </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
