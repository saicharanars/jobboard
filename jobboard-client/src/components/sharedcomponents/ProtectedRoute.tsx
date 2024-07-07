"use client";
import AuthContext from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const ProtectedRoute = (WrappedComponent) => {
  return function WithAuth(props) {
    const auth = useContext(AuthContext);
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
      let isMounted = true;

      const checkAuth = async () => {
        // Wait for next tick to ensure we have the latest auth state
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
      return <div>Checking authentication...</div>; // Or any loading indicator
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;