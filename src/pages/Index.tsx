import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MetricCard } from "@/components/MetricCard";
import { RevenueChart } from "@/components/RevenueChart";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <SidebarTrigger />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <MetricCard
              title="Total Revenue"
              value="$90,231.89"
              icon={<DollarSign className="h-4 w-4 text-gray-500" />}
              trend={{ value: "+20.1%", positive: true }}
            />
            <MetricCard
              title="Customers"
              value="2,350"
              icon={<Users className="h-4 w-4 text-gray-500" />}
              trend={{ value: "+15.1%", positive: true }}
            />
            <MetricCard
              title="New Orders"
              value="156"
              icon={<ShoppingCart className="h-4 w-4 text-gray-500" />}
              trend={{ value: "-5.1%", positive: false }}
            />
            <MetricCard
              title="Growth"
              value="+12.5%"
              icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
              trend={{ value: "+2.1%", positive: true }}
            />
          </div>

          <RevenueChart />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
