"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Plane, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // In development, show the reset URL
        if (data.resetUrl) {
          setResetUrl(data.resetUrl);
        }
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>

            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Check Your Email
            </h1>

            <p className="text-neutral-600 mb-6">
              If an account exists with <strong>{email}</strong>, you will receive password reset
              instructions shortly.
            </p>

            {resetUrl && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2 font-semibold">
                  Development Mode - Reset Link:
                </p>
                <a
                  href={resetUrl}
                  className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {resetUrl}
                </a>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => window.location.href = "/login"}
                className="w-full h-12 bg-[rgb(var(--color-brown))] hover:bg-[rgb(var(--color-brown))]/90"
              >
                Back to Login
              </Button>

              <Button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                  setResetUrl("");
                }}
                variant="outline"
                className="w-full h-12"
              >
                Send Another Email
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-neutral-50 to-neutral-100">
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
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Reset Password</h1>
            <p className="text-neutral-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {/* Back to Login Link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-[rgb(var(--color-brown))] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[rgb(var(--color-brown))] hover:bg-[rgb(var(--color-brown))]/90 text-white font-semibold text-base"
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>
          </form>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-neutral-200"
          >
            <p className="text-xs text-neutral-500 text-center">
              Remember your password?{" "}
              <Link href="/login" className="text-[rgb(var(--color-gold))] hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
