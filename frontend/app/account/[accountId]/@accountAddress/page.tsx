import Link from "next/link";

import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/react";

import { getAccountFavoriteAddress } from "@/gateways/account.gateway";

type Params = {
  params: {
    accountId: string;
  };
};

export default async function Page({ params }: Readonly<Params>) {
  const address = await getAccountFavoriteAddress(Number(params.accountId));

  if (address)
    return (
      <Card className="w-full md:w-96 p-4 gap-y-2">
        <p className="flex justify-between">
          <b>CEP</b>
          {address.zipcode}
        </p>
        <p className="flex justify-between">
          <b>Endereço</b>
          <span>
            {address.address}, {address.number}
          </span>
        </p>
        <p className="flex justify-between">
          <b>Complemento</b>
          {address.complement}
        </p>
        <p className="flex justify-between">
          <b>Bairro</b>
          {address.neighborhood}
        </p>
        <p className="flex justify-between">
          <b>Cidade</b>
          {address.city}
        </p>
        <p className="flex justify-between">
          <b>Estado</b>
          {address.state}
        </p>
      </Card>
    );

  return (
    <Card className="flex content-center justify-center w-full md:w-96 p-4 gap-y-2">
      <p className="text-center">
        Parece que você ainda não tem um endereço cadastrado
      </p>
      <Link href="/address/create">
        <Button
          type="submit"
          radius="full"
          fullWidth
          className="bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg self-center"
        >
          Cadastrar endereço
        </Button>
      </Link>
    </Card>
  );
}
