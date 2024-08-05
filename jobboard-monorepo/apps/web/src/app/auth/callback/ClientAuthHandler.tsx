"use client";

import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "@/lib/context/auth";

export default function ClientAuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authctx = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      console.log(token);
      authctx.login(token);
      router.push("/");
    } else if (error) {
      router.push(`/error?message=${error}`);
    }
  }, [searchParams, router, authctx]);

  return <div>Processing authentication...</div>;
}
