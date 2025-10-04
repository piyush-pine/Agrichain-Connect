
"use client";

import Link from "next/link";
import { ShoppingCart, Leaf, Globe, User, LogIn } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              Marketplace
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="transition-colors hover:text-primary"
            >
              Admin
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute top-0 right-0 h-5 w-5 justify-center p-0 text-xs"
                  >
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
            {isAuthenticated ? (
               <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <User className="h-5 w-5" />
                  <span className="sr-only">My Profile</span>
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login / Sign Up
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
