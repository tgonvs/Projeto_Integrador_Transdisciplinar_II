import { useContext, useState } from "react";

import { useRouter } from "next/navigation";

import { ShoppingBagContext } from "@/contexts/shopping-bag.context";
import { OrderService } from "@/gateways/order.gateway";

export const useCreateOrder = () => {
  const { clearBag } = useContext(ShoppingBagContext);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleCreateOrder = async (
    data: Omit<OrderService.OrderCreateDTO, "accountId">
  ) => {
    setIsLoading(true);
    const res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      clearBag();
      router.push("/order");
    }
    setIsLoading(false);
  };

  return { isLoading, handleCreateOrder };
};
