"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Plane } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LoginFormNew() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get return URL from query params
  const returnUrl = searchParams.get("returnUrl") || searchParams.get("callbackUrl");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        // Fetch user session to determine role
        const response = await fetch("/api/auth/session");
        const sessionData = await response.json();

        if (sessionData?.user) {
          // Determine redirect based on role and return URL
          let redirectPath = "/dashboard";

          if (returnUrl) {
            // If there's a return URL, use it
            redirectPath = returnUrl;
          } else if (sessionData.user.role === "ADMIN") {
            // Admin goes to admin dashboard
            redirectPath = "/admin";
          } else {
            // Regular user goes to dashboard
            redirectPath = "/dashboard";
          }

          router.push(redirectPath);
          router.refresh();
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-brown))]/90 to-[rgb(var(--color-gold))]/70" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Plane className="w-16 h-16 mb-6 text-[rgb(var(--color-gold))]" />
            <h1 className="text-5xl font-bold mb-4">
              Welcome Back to Severius Travel
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Continue your journey to discover amazing destinations around the world.
              Your next adventure awaits.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Plane className="w-8 h-8 text-[rgb(var(--color-gold))]" />
            <span className="text-2xl font-bold text-[rgb(var(--color-brown))]">
              Severius Travel
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))] mb-2">
              Sign in to your account
            </h2>
            <p className="text-neutral-600">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="pl-11 h-12 border-neutral-300 focus:border-[rgb(var(--color-gold))] focus:ring-[rgb(var(--color-gold))]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-11 pr-11 h-12 border-neutral-300 focus:border-[rgb(var(--color-gold))] focus:ring-[rgb(var(--color-gold))]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[rgb(var(--color-gold))] border-neutral-300 rounded focus:ring-[rgb(var(--color-gold))]"
                />
                <span className="ml-2 text-sm text-neutral-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-[rgb(var(--color-gold))] hover:text-[rgb(var(--color-brown))] font-medium"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[rgb(var(--color-brown))] hover:bg-[rgb(var(--color-brown))]/90 text-white font-semibold text-base"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[rgb(var(--color-gold))] hover:text-[rgb(var(--color-brown))] font-medium"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
