// hooks/useOrders.ts
import { Order } from "@/types/Order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async (): Promise<Order[]> => {
  const frontendUrl = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL;
  const response = await axios.get<Order[]>(`${frontendUrl}/api/orders`);
  return response.data;
};

const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 5 * 60 * 1000,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useOrders;
