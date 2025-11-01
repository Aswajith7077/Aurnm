"use client";

import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) router.push("/home");
  }, [isSignedIn, router]);

  if (!isSignedIn) return <RedirectToSignIn />;
}
