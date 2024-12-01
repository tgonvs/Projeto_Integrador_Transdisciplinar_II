import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CookiesKeys } from "@/types/cookies-keys.enum";

export default function AccountPage() {
  const account = cookies().get(CookiesKeys.accountId);
  if (account?.value) return redirect(`/account/${account.value}`);
  return redirect(`/account/login`);
}
