"use client";
import { useAuth } from "@/lib/hooks/useauth";
import React, { useEffect } from "react";

interface AuthCheckProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
  onAuthStatusChange?: (hasAccess: boolean) => void;
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  children,
  requiredRole,
  redirectTo,
  onAuthStatusChange,
}) => {
  const { isLoading, hasAccess } = useAuth({ requiredRole, redirectTo });

  useEffect(() => {
    if (onAuthStatusChange) {
      onAuthStatusChange(hasAccess);
    }
  }, [hasAccess, onAuthStatusChange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheck;
