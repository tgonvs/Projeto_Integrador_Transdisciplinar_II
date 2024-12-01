"use client";

import { Button } from "@/components/atom/button";

import { logoutAction } from "../actions/loggout.action";

import { useFormState } from "react-dom";

type Params = {
  className?: string;
};

export const LogoutForm = (params?: Params) => {
  const [state, formAction] = useFormState(logoutAction, null);

  return (
    <form action={formAction} {...params}>
      <Button type="submit" fullWidth>
        Sair
      </Button>
    </form>
  );
};
