import { RegisterForm } from "@/components/register-form";
import { Plane } from "lucide-react";
import Link from "next/link";
import { registerMetadata } from "@/lib/metadata";

export const metadata = registerMetadata;

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--color-brown))] via-[rgb(156,102,91)] to-[rgb(var(--color-gold))] flex items-center justify-center py-12 px-6">
      {/* Logo/Back to Home */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
      >
        <Plane className="w-8 h-8" />
        <span className="text-xl font-bold hidden md:block">Severius Travel</span>
      </Link>

      <RegisterForm />
    </div>
  );
}
