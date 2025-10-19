"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Plane } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      console.log("📦 Registration API response:", {
        ok: response.ok,
        status: response.status,
        data: data
      });

      if (!response.ok) {
        setError(data.error || data.message || "Failed to create account");
        setIsLoading(false);
        return;
      }

      // Account created successfully
      if (data.success && data.autoLogin) {
        console.log("🔄 Starting auto-login process...");
        console.log("📧 Email:", formData.email);
        console.log("🔑 Password length:", formData.password.length);
        
        // Auto-login the user
        const { signIn } = await import("next-auth/react");
        
        // IMPORTANT: Use the exact same email that was stored (lowercase)
        const loginResult = await signIn("credentials", {
          email: formData.email.toLowerCase(), // ✅ Normalize to match DB
          password: formData.password,
          redirect: false,
        });

        console.log("🔐 Login result:", loginResult);

        if (loginResult?.error) {
          console.error("❌ Auto-login failed:", loginResult.error);
          
          // Show helpful error message
          setError(`Account created successfully! However, auto-login failed. Please login manually with email: ${formData.email.toLowerCase()}`);
          setIsLoading(false);
          
          // Redirect to login page with email pre-filled
          setTimeout(() => {
            router.push(`/login?registered=true&email=${encodeURIComponent(formData.email.toLowerCase())}`);
          }, 3000);
          return;
        }

        if (loginResult?.ok) {
          console.log("✅ User registered and logged in successfully");
          
          // Wait a moment for session to be established
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Refresh router to get new session
          router.refresh();
          
          // Redirect to dashboard
          window.location.href = "/dashboard";
        } else {
          console.error("❌ Login result not ok:", loginResult);
          setError("Account created but login failed. Please login manually.");
          setIsLoading(false);
          setTimeout(() => router.push("/login?registered=true"), 2000);
        }
      } else {
        console.log("⚠️ Auto-login flag not set, redirecting to login");
        // Fallback to login page if auto-login flag is not set
        router.push("/login?registered=true");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] mb-4"
          >
            <Plane className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Account</h1>
          <p className="text-neutral-600">
            Join Severius Travel and start your adventure
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200"
          >
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 h-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10 pr-10 h-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[rgb(var(--color-brown))] hover:bg-[rgb(var(--color-brown))]/90 text-white font-semibold text-base"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[rgb(var(--color-gold))] hover:text-[rgb(var(--color-brown))] font-medium"
            >
              Sign in
            </a>
          </p>
        </div>

        {/* Terms Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-6 border-t border-neutral-200"
        >
          <p className="text-xs text-neutral-500 text-center">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-[rgb(var(--color-gold))] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[rgb(var(--color-gold))] hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
