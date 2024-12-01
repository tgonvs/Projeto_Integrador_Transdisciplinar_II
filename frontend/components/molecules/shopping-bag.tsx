"use client";

import { useContext } from "react";

import { usePathname } from "next/navigation";

import { Badge, Link } from "@nextui-org/react";

import { ShoppingBagContext } from "@/contexts/shopping-bag.context";

import { FaShoppingCart } from "react-icons/fa";

export const ShoppingBag = () => {
  let { shoppingBag } = useContext(ShoppingBagContext);
  const path = usePathname();

  return (
    <Link href={`/shopping-bag?source=${path}`} aria-label="Shopping Bag">
      <Badge
        content={shoppingBag.getTotalCount() > 9 ? "9+" : shoppingBag.getTotalCount()}
        size="sm"
        isInvisible={shoppingBag.getTotalCount() <= 0}
        showOutline={false}
        classNames={{
          badge: "bg-gradient-to-tr from-indigo-500 to-pink-500 text-white",
        }}
      >
        <FaShoppingCart className="w-5 h-5 text-default-500" />
      </Badge>
    </Link>
  );
};
