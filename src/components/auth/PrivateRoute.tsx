"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <div className="flex gap-6">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="flex-grow space-y-2">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/6" />
                </div>
            </div>
        </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
