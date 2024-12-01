import { useEffect, useState } from "react";

import { AccountAddress } from "@/models/account-address.model";

export const useFetchAddress = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<AccountAddress>();

  const handleFetch = async () => {
    setIsLoading(true);
    const res = await fetch("/api/address");
    if (res.ok) {
      const data: AccountAddress = await res.json();
      setAddress(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return { isLoading, address };
};
