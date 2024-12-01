import { useEffect, useState } from "react";

import { Store } from "@/models/store.model";

export const useFetchStore = (zipcode?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState<Store>();

  const handleFetch = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/store?zipcode=${zipcode}`);
    if (res.ok) {
      const data: Store = await res.json();
      setStore(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!zipcode) return;
    handleFetch();
  }, [zipcode]);

  return { isLoading, store };
};
