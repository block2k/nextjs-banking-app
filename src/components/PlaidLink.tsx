import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { Button } from "./ui/button";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token: process.env.NEXT_PUBLIC_PLAID_PUBLIC_KEY!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    (async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    })();
  }, [user]);

  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} className="plaidlink-primary" disabled={!ready}>
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
