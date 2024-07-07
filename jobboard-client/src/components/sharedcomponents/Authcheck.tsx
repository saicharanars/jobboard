"use client";
import AuthContext from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const AuthCheck = ({ children, redirect = true }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      
      if (isMounted) {
        console.log("Final auth state:", auth.isLoggedIn);
        
        if (auth.isLoggedIn) {
          setAuthChecked(true);
        } else {
          if (redirect) {
            router.push('/auth');
          } else {
            setAuthChecked(false);
            setKey(prevKey => prevKey + 1);
          }
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [auth.isLoggedIn, router, redirect]);

  if (!authChecked) {
    return redirect ? <div>Checking authentication...</div> : null;
  }

  return <React.Fragment key={key}>{children}</React.Fragment>;
};

export default AuthCheck;