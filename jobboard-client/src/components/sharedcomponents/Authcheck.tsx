"use client";
import { useAuth } from "@/lib/hooks/useauth";
import React from "react";
interface AuthCheckProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  children,
  requiredRole,
  redirectTo,
}) => {
  const { isLoading, hasAccess } = useAuth({ requiredRole, redirectTo });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheck;

// ProfilePage.tsx
