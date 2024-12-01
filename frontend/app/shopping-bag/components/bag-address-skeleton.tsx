import { Skeleton } from "@nextui-org/react";

export const BagAddressSkeleton = () => (
  <span>
    <Skeleton className="h-3 w-2/5 rounded-lg my-2" />
    <Skeleton className="h-3 w-4/5 rounded-lg" />
  </span>
);
