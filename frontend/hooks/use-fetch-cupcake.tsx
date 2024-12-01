import { useEffect, useState } from "react";

import { Cupcake } from "@/models/cupcake.model";

export const useFetchCupcake = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);

  const handleFetch = async () => {
    setIsLoading(true);
    const res = await fetch("/api/cupcake");
    const data: Cupcake[] = await res.json();
    setCupcakes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return { isLoading, cupcakes };
};
