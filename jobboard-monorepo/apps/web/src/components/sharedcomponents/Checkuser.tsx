"use client";

import AuthContext from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, ReactNode } from "react";

interface CheckuserProps {
  children: ReactNode;
}

const Checkuser: React.FC<CheckuserProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      if (isMounted) {
        console.log("Final auth state:", auth.isLoggedIn);

        if (!auth.isLoggedIn) {
          router.push('/auth');
        } else {
          setAuthChecked(true);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [auth.isLoggedIn, router]);

  if (!authChecked) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
};

export default Checkuser;