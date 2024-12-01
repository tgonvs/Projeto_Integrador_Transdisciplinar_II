import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { listOrder } from "@/gateways/order.gateway";
import { CookiesKeys } from "@/types/cookies-keys.enum";

import { OrderCard } from "./components/order-card";

export default async function Page() {
  const account = cookies().get(CookiesKeys.accountId);
  if (!account) return redirect(`/account/login`);

  const orders = await listOrder(Number(account.value));

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
