import { Divider, Skeleton } from "@nextui-org/react";

type Props = {
  isLastItem: boolean;
};

export const BagItemSkeleton = ({ isLastItem }: Props) => (
  <div className="w-full flex flex-col items-center gap-2">
    <div className="w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-2/5 rounded-lg self-end" />
      </div>
    </div>
    {isLastItem && <Divider className="w-4/5 m-1" />}
  </div>
);
