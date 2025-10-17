import { Metadata } from "next";
import { Suspense } from "react";
import { LoginFormNew } from "@/components/login-form-new";

export const metadata: Metadata = {
  title: "Login | Severius Travel",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <LoginFormNew />
    </Suspense>
  );
}