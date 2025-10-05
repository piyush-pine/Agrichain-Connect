
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
import { useState, useEffect } from 'react';
import { useTranslation } from '@/context/LanguageContext';

function StatCard({ title, value }: { title: string; value: string }) {
  const initialValue = parseInt(value.replace(/,/g, ''), 10);
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1500); // Increment every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-primary">{count.toLocaleString()}</p>
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
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
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
  const { t } = useTranslation();

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-green-200/30 dark:from-green-900/10 dark:to-green-900/20"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          }}
        ></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 dark:bg-green-800/30 dark:text-green-200">
                {t('home.hero.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-foreground">
                {t('home.hero.title')}
              </h1>
              <p className="max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground mb-8">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link href="/signup">{t('home.hero.getStarted')}</Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="#">
                    <PlayCircle className="mr-2" /> {t('home.hero.watchDemo')}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <StatCard title={t('home.stats.transactions')} value="2,847" />
                <StatCard title={t('home.stats.farmers')} value="1,523" />
                <StatCard title={t('home.stats.products')} value="4,892" />
                <StatCard title={t('home.stats.buyers')} value="3,124" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card shadow-lg rounded-full p-3 flex items-center gap-2 text-sm">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold">{t('home.stats.verified')}</p>
                  <p className="text-xs text-muted-foreground">{t('home.stats.immutable')}</p>
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
              {t('home.roles.title')}
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              {t('home.roles.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <RoleCard icon={User} title={t('home.roles.farmers')} bgColor="bg-green-50 dark:bg-green-900/20" href="/dashboard" />
            <RoleCard icon={Box} title={t('home.roles.buyers')} bgColor="bg-blue-50 dark:bg-blue-900/20" href="/products" />
            <RoleCard icon={Truck} title={t('home.roles.logistics')} bgColor="bg-orange-50 dark:bg-orange-900/20" href="/logistics" />
            <RoleCard icon={UserCog} title={t('home.roles.admins')} bgColor="bg-purple-50 dark:bg-purple-900/20" href="/admin" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              {t('home.features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={LinkIcon}
              title={t('home.features.provenance.title')}
              description={t('home.features.provenance.description')}
            />
            <FeatureCard
              icon={Radar}
              title={t('home.features.iot.title')}
              description={t('home.features.iot.description')}
            />
            <FeatureCard
              icon={FileText}
              title={t('home.features.contracts.title')}
              description={t('home.features.contracts.description')}
            />
            <FeatureCard
              icon={TrendingUp}
              title={t('home.features.fraud.title')}
              description={t('home.features.fraud.description')}
            />
            <FeatureCard
              icon={Mic}
              title={t('home.features.voice.title')}
              description={t('home.features.voice.description')}
            />
            <FeatureCard
              icon={Award}
              title={t('home.features.rewards.title')}
              description={t('home.features.rewards.description')}
            />
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/signup">{t('home.cta.getStarted')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
