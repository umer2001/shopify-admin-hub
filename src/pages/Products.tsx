import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProductCard } from "@/components/ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Basic T-Shirt",
    price: 19.99,
    stock: 150,
    status: "In Stock",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Premium Hoodie",
    price: 49.99,
    stock: 75,
    status: "Low Stock",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Denim Jeans",
    price: 79.99,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg"
  }
];

const Products = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Products</h1>
            <div className="flex gap-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
              <SidebarTrigger />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Products;