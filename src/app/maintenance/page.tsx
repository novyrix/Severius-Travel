import { Wrench, Clock, Mail, Twitter, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-yellow-50" />
      
      {/* Animated Blur Blobs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[rgb(var(--color-gold))]/20 to-[rgb(var(--color-brown))]/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* Glass Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl p-8 md:p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[rgb(var(--color-gold))]/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-[rgb(var(--color-brown))]/10 to-transparent rounded-full blur-2xl" />

          <div className="relative space-y-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-[rgb(var(--color-gold))] to-[rgb(var(--color-brown))] p-1"
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Wrench className="w-12 h-12 text-[rgb(var(--color-brown))]" />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-4 bg-gradient-to-r from-[rgb(var(--color-gold))]/20 to-[rgb(var(--color-brown))]/20 rounded-full blur-xl -z-10"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] bg-clip-text text-transparent">
                Under Maintenance
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                We're currently performing scheduled maintenance to improve your experience. 
                We'll be back shortly!
              </p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[rgb(var(--color-gold))]/20 to-[rgb(var(--color-brown))]/20 backdrop-blur-sm border border-white/30">
                <Clock className="w-5 h-5 text-[rgb(var(--color-brown))]" />
                <div className="flex items-center gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[rgb(var(--color-brown))]">02</div>
                    <div className="text-xs text-gray-600">Hours</div>
                  </div>
                  <span className="text-2xl text-[rgb(var(--color-brown))]">:</span>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[rgb(var(--color-brown))]">30</div>
                    <div className="text-xs text-gray-600">Minutes</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-3 max-w-xl mx-auto"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm text-gray-700">
                  <strong>Server Status:</strong> All systems operational
                </p>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <p className="text-sm text-gray-700">
                  <strong>Current Task:</strong> Upgrading database systems
                </p>
              </div>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="space-y-4"
            >
              {/* Email */}
              <div className="flex justify-center">
                <a
                  href="mailto:support@severiustours.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[rgb(var(--color-gold))] to-[rgb(var(--color-brown))] text-white font-semibold hover:scale-105 transition-transform shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Contact Support
                </a>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-[rgb(var(--color-brown))] hover:bg-white/80 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-[rgb(var(--color-brown))] hover:bg-white/80 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-[rgb(var(--color-brown))] hover:bg-white/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center text-sm text-gray-600"
            >
              <p>Thank you for your patience! 🙏</p>
              <p className="mt-1">
                Follow us on social media for real-time updates
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="h-1 mt-6 rounded-full bg-gradient-to-r from-transparent via-[rgb(var(--color-gold))] to-transparent"
        />
      </motion.div>
    </div>
  );
}
