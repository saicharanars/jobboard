"use client";
// src/components/sharedcomponents/LayoutComponents.tsx
import React, { useState, useCallback } from "react";
import Navigation from "./Navigation";
import AuthCheck from "./Authcheck";

interface LayoutProps {
  children: React.ReactNode;
}

export const LayoutComponents: React.FC<LayoutProps> = ({ children }) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  // Handle authentication status changes
  const handleAuthStatusChange = useCallback((access: boolean) => {
    setHasAccess(access);
  }, []);

  // Sidebar component
  const Sidebar = () => (
    <div
      className={`hidden md:block ${hasAccess ? "md:col-span-1" : "md:col-span-0"} bg-[#E9EBFD] p-4`}
    >
      {hasAccess && <Navigation />}
    </div>
  );

  // MainContent component
  const MainContent = () => (
    <main
      className={`col-span-1 ${hasAccess ? "md:col-span-4" : "md:col-span-5"} bg-[#E9EBFD] p-1 md:p-4 relative overflow-auto`}
    >
      {children}
    </main>
  );

  return (
    <div className="flex-grow grid grid-cols-1 md:grid-cols-5 bg-[#E9EBFD]">
      <AuthCheck onAuthStatusChange={handleAuthStatusChange}>
        <Sidebar />
      </AuthCheck>
      <MainContent />
    </div>
  );
};
