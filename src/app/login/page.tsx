import { Suspense } from "react";
import { LoginFormNew } from "@/components/login-form-new";
import { loginMetadata } from "@/lib/metadata";

export const metadata = loginMetadata;

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <LoginFormNew />
    </Suspense>
  );
}