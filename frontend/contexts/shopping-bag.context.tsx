import { createContext, useEffect, useMemo, useState } from "react";

import { useFetchCupcake } from "@/hooks/use-fetch-cupcake";
import { Cupcake } from "@/models/cupcake.model";
import { ShoppingBag } from "@/models/shopping-bag.model";
import {
  addCupcake as addCupcakeToStorage,
  removeCupcake as removeCupcakeFromStorage,
  clearShoppingBag,
  getShoppingBag,
} from "@/services/shopping-cart.service";


type ContextValue = {
  cupcakes: Cupcake[];
  shoppingBag: ShoppingBag;
  isLoading: boolean;
  addCupcake: (cupcakeId: number) => void;
  removeCupcake: (cupcakeId: number) => void;
  clearBag: () => void;
};

const EMPTY_BAG = new ShoppingBag({ cupcakes: new Map() });

export const ShoppingBagContext = createContext<ContextValue>({
  cupcakes: [] as Cupcake[],
  shoppingBag: EMPTY_BAG,
  isLoading: false,
  addCupcake: () => {},
  removeCupcake: () => {},
  clearBag: () => {},
});

export function ShoppingBagProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [shoppingBag, setShoppingBag] = useState(EMPTY_BAG);

  const { isLoading, cupcakes } = useFetchCupcake();

  const listener = () => {
    const bag = getShoppingBag();
    setShoppingBag(bag);
  };

  useEffect(() => {
    listener();
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  }, []);

  const addCupcake = (cupcakeId: number) => {
    const bag = addCupcakeToStorage(cupcakeId);
    setShoppingBag(bag);
  };

  const removeCupcake = (cupcakeId: number) => {
    const bag = removeCupcakeFromStorage(cupcakeId);
    setShoppingBag(bag);
  };

  const clearBag = () => {
    clearShoppingBag();
    setShoppingBag(EMPTY_BAG);
  };

  const value = useMemo(() => {
    return {
      cupcakes,
      shoppingBag,
      isLoading,
      addCupcake,
      removeCupcake,
      clearBag,
    };
  }, [cupcakes, shoppingBag, isLoading]);

  return (
    <ShoppingBagContext.Provider value={value}>
      {children}
    </ShoppingBagContext.Provider>
  );
}
