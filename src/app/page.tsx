
'use client';

import {
  PlayCircle,
  ShieldCheck,
  User,
  Box,
  Truck,
  UserCog,
  Link as LinkIcon,
  Radar,
  FileText,
  TrendingUp,
  Mic,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}

function RoleCard({
  icon: Icon,
  title,
  bgColor,
  href,
}: {
  icon: React.ElementType;
  title: string;
  bgColor: string;
  href: string;
}) {
  return (
    <Link href={href}>
        <Card
        className={`text-center p-8 transition-all hover:shadow-xl hover:-translate-y-1 ${bgColor} h-full`}
        >
        <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
        </Card>
    </Link>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 text-left transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
        </div>
        <CardContent className="p-0 pt-4">
             <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
  );
}


export default function HomePage() {
  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-green-200/30"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          }}
        ></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Blockchain-Powered Agriculture
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">
                Transparent Supply Chain for Indian Agriculture
              </h1>
              <p className="max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground mb-8">
                AgriChain leverages blockchain technology to create a fair,
                transparent, and efficient agricultural supply chain ecosystem
                connecting farmers directly with buyers.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="#">
                    <PlayCircle className="mr-2" /> Watch Demo
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Live Transactions" value="2,847" />
                <StatCard title="Active Farmers" value="1,523" />
                <StatCard title="Products Listed" value="4,892" />
                <StatCard title="Verified Buyers" value="3,124" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white shadow-lg rounded-full p-3 flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-6 w-6 text-green-500"/>
                  <div>
                    <p className="font-semibold">Blockchain Verified</p>
                    <p className="text-xs text-muted-foreground">Immutable records</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              For Everyone in the Supply Chain
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Choose your role to get started
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <RoleCard icon={User} title="Farmers & MSMEs" bgColor="bg-green-50" href="/dashboard"/>
            <RoleCard icon={Box} title="Buyers" bgColor="bg-blue-50" href="/products" />
            <RoleCard icon={Truck} title="Logistics" bgColor="bg-orange-50" href="/logistics" />
            <RoleCard icon={UserCog} title="Admins" bgColor="bg-purple-50" href="/admin" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">
                    Powerful Features
                </h2>
                <p className="text-lg text-muted-foreground mt-4">
                    AgriChain combines cutting-edge technologies to revolutionize agricultural supply chains
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    icon={LinkIcon}
                    title="Blockchain Provenance"
                    description="Every transaction and product movement is recorded on an immutable blockchain ledger ensuring complete transparency."
                />
                <FeatureCard
                    icon={Radar}
                    title="IoT Monitoring (in future)"
                    description="Real-time monitoring of product conditions (temperature, humidity) throughout the supply chain journey."
                />
                <FeatureCard
                    icon={FileText}
                    title="Smart Contracts"
                    description="Automated escrow payments and quality verification through tamper-proof smart contracts."
                />
                <FeatureCard
                    icon={TrendingUp}
                    title="AI Fraud Detection"
                    description="Machine learning algorithms monitor transactions for anomalies and potential fraud."
                />
                <FeatureCard
                    icon={Mic}
                    title="Voice Interface"
                    description="Voice commands and multilingual support for farmers with limited digital literacy."
                />
                <FeatureCard
                    icon={Award}
                    title="Sustainability Rewards"
                    description="Farmers earn tokens for sustainable practices that can be redeemed for benefits."
                />
            </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform agricultural supply chains?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join AgriChain today and be part of the movement towards
            transparency, fairness, and efficiency in Indian agriculture.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/signup">Get Started for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
