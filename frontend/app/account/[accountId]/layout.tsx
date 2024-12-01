import { ReactNode } from "react";

import { LogoutForm } from "../components/logout-form";

export default function Layout({
  accountInfo,
  accountAddress,
}: Readonly<{ accountInfo: ReactNode; accountAddress: ReactNode }>) {
  return (
    <section className="grow flex flex-col justify-around items-center w-full gap-4">
      <div className="grow flex flex-row flex-wrap justify-center w-full gap-4 px-4">
        {accountInfo}
        {accountAddress}
      </div>
      <LogoutForm className="w-64"/>
    </section>
  );
}
