import { DashboardNav } from "@/components/DashboardNav";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Leaf } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="md:flex">
        <Sidebar>
          <DashboardNav />
        </Sidebar>
        <SidebarInset className="flex-1">
           <header className="p-4 border-b md:hidden flex items-center gap-4 bg-card">
            <SidebarTrigger />
            <div className="flex items-center gap-2 text-lg font-bold font-headline text-primary">
                <Leaf />
                <span>AgriChain Connect</span>
            </div>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
