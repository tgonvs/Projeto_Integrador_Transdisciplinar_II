"use client";
import { Input } from "@nextui-org/input";

import { Button } from "@/components/atom/button";

import { createAccountAction } from "../actions/create-account.action";

import { useFormState, useFormStatus } from "react-dom";

export default function AccountPage() {
  const [state, formAction] = useFormState(createAccountAction, {});
  const { pending } = useFormStatus();
  return (
    <div className="grow flex flex-col justify-center items-stretch min-h-[50vh] w-screen sm:w-96 px-8">
      <form
        className="flex flex-col justify-center items-center space-y-4"
        action={formAction}
      >
        <h2>Informe seus dados:</h2>
        <Input
          type="email"
          name="email"
          variant="bordered"
          label="Email"
          isRequired
          errorMessage={state.errors?.email}
          isDisabled={pending}
        />
        <Input
          type="text"
          name="firstName"
          variant="bordered"
          label="Nome"
          isRequired
          errorMessage={state.errors?.firstName}
          isDisabled={pending}
        />
        <Input
          type="text"
          name="lastName"
          variant="bordered"
          label="Sobrenome"
          isRequired
          errorMessage={state.errors?.lastName}
          isDisabled={pending}
        />
        <Input
          type="tel"
          name="phone"
          variant="bordered"
          label="Celular"
          isRequired
          errorMessage={state.errors?.phone}
          isDisabled={pending}
        />

        {state.errors?.request && (
          <h2 className="text-center text-red-500">{state.errors?.request}</h2>
        )}

        <Button type="submit" extraClassNames="w-4/5" isLoading={pending}>
          Criar
        </Button>
      </form>
    </div>
  );
}
