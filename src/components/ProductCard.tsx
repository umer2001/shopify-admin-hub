import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="space-y-2">
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <span
            className={`inline-block px-2 py-1 text-xs rounded-full ${
              product.status === "In Stock"
                ? "bg-green-100 text-green-800"
                : product.status === "Low Stock"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.status}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}