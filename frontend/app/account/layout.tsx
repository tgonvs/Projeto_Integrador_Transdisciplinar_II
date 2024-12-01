import { ReactNode } from "react";

import { title } from "@/components/primitives";


export default function Layout({ children }: { children: ReactNode }) {

  return (
    <section className="grow flex flex-col justify-around items-center space-y-4">
      <h1 className={title()}>Conta</h1>
      {children}
    </section>
  );
}
