import { Card } from "@nextui-org/react";

import { getAccount } from "@/gateways/account.gateway";

type Params = {
  params: {
    accountId: string;
  };
};

export default async function Page({ params }: Readonly<Params>) {
  const account = await getAccount(Number(params.accountId));

  if (account)
    return (
      <Card className="w-full md:w-80 p-4 gap-y-2">
        <p className="text-center text-lg font-semibold">
          {account.firstName} {account.lastName}
        </p>
        <p className="flex justify-between">
          <b>Email</b>
          {account.email}
        </p>
        <p className="flex justify-between">
          <b>Telefone</b>
          {account.phone}
        </p>
      </Card>
    );
}
