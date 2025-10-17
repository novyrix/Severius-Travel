"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Compass, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[rgb(78,52,46)] via-[rgb(156,102,91)] to-[rgb(212,175,55)] opacity-10"
      />
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-20 h-20 rounded-full bg-[rgb(212,175,55)] opacity-20 blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[15%] w-32 h-32 rounded-full bg-[rgb(78,52,46)] opacity-20 blur-xl"
      />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-9xl mb-4"
          >
            🦅
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[rgb(78,52,46)] to-[rgb(212,175,55)] bg-clip-text text-transparent"
          >
            404
          </motion.h1>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
        >
          Lost in the Wilderness?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-neutral-600 mb-8 max-w-md mx-auto"
        >
          The page you are looking for has wandered off the beaten path.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[rgb(78,52,46)] to-[rgb(156,102,91)] text-white font-semibold rounded-lg shadow-lg">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[rgb(78,52,46)] font-semibold rounded-lg border-2 border-[rgb(78,52,46)] hover:bg-[rgb(78,52,46)] hover:text-white transition-all">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">Quick Links</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tours" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[rgb(78,52,46)] hover:text-[rgb(212,175,55)]"><Compass className="w-4 h-4" />Browse Tours</Link>
            <Link href="/about" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[rgb(78,52,46)] hover:text-[rgb(212,175,55)]">About Us</Link>
            <Link href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[rgb(78,52,46)] hover:text-[rgb(212,175,55)]">Contact</Link>
            <Link href="/faq" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[rgb(78,52,46)] hover:text-[rgb(212,175,55)]"><Search className="w-4 h-4" />FAQs</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
