// useAuth.ts
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/lib/context/auth";

interface UseAuthOptions {
  requiredRole?: string;
  redirectTo?: string;
}

export const useAuth = ({
  requiredRole,
  redirectTo = "/",
}: UseAuthOptions = {}) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state update

      if (!auth.isLoggedIn) {
        router.push(redirectTo);
      } else if (requiredRole && auth.role !== requiredRole) {
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [auth.isLoggedIn, auth.role, router, redirectTo, requiredRole]);

  return { isLoading, hasAccess, user: auth };
};
