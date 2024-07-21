"use client";

import AuthContext from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const AuthCheck = ({ children, redirect = true, role = "" }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      if (isMounted) {
        console.log(
          "Final auth state:",
          auth.isLoggedIn,
          auth.token,
          auth.role
        );

        if (auth.isLoggedIn) {
          if (role && auth.role !== role) {
            // User is logged in but doesn't have the required role
            setHasAccess(false);
          } else {
            setHasAccess(true);
          }
        } else {
          setHasAccess(false);
          if (redirect) {
            router.push("/auth");
          }
        }
        setAuthChecked(true);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [auth.isLoggedIn, auth.role, router, redirect, role, auth.token]);

  if (!authChecked) {
    return redirect ? <div>Checking authentication...</div> : null;
  }

  if (!hasAccess) {
    return null; // Don't render children if user doesn't have access
  }

  return <>{children}</>;
};

export default AuthCheck;
