"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Optional for role-based auth
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect if not logged in
    } else if (allowedRoles && !allowedRoles.includes(role ?? "")) {
      router.push("/unauthorized"); // Or your custom error page
    }
  }, [isAuthenticated, role, allowedRoles, router]);

  if (!isAuthenticated) return null; // Avoid flash of protected content

  return <>{children}</>;
};

export default ProtectedRoute;
