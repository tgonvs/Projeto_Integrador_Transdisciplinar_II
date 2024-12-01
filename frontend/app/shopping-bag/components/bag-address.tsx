import { Link } from "@nextui-org/link";

import { AccountAddress } from "@/models/account-address.model";

type Props = {
  address?: AccountAddress;
};

export const BagAddress = ({ address }: Props) =>
  address ? (
    <span>
      {address?.address}, {address?.number} - {address?.zipcode}
    </span>
  ) : (
    <Link className="self-end" href="/account">
      Cadastrar endereço
    </Link>
  );
