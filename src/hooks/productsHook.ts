// hooks/useProducts.ts
import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async (): Promise<Product[]> => {
  const frontendUrl = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL;
  const response = await axios.get<Product[]>(`${frontendUrl}/api/products`);
  return response.data;
};

const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useProducts;
