"use client";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

import { Button } from "@/components/atom/button";

import { findAccountByMailAction } from "../actions/find-account-by-mail.action";

import { useFormState, useFormStatus } from "react-dom";

export default function AccountPage() {
  const [state, formAction] = useFormState(findAccountByMailAction, {});
  const { pending } = useFormStatus();
  return (
    <div className="grow flex flex-col justify-center items-center min-h-[50vh] w-screen sm:w-96 px-8">
      <form
        className="flex flex-col justify-center items-center space-y-4"
        action={formAction}
      >
        <h2>Busque pelo seu email cadastrado!</h2>
        {!pending && state.errorMessage && (
          <h2 className="text-center">{state.errorMessage}</h2>
        )}
        <Input
          type="email"
          name="mail"
          variant="bordered"
          label="Email"
          isDisabled={pending}
        />
        <Button type="submit" extraClassNames="w-4/5" isLoading={pending}>
          Buscar
        </Button>
      </form>
      <Link className="m-2" href="/account/create">
        Criar conta
      </Link>
    </div>
  );
}
