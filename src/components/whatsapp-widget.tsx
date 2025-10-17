"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Hide on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  // WhatsApp business number - update this with your actual number
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254712345678";
  const defaultMessage = "Hello! I'm interested in learning more about your tours.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-20 sm:bottom-6 right-6 z-40"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact us on WhatsApp"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Image 
                  src="/images/whatsapp.svg" 
                  alt="WhatsApp" 
                  width={28} 
                  height={28}
                  className="w-7 h-7"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
          )}
        </button>
      </motion.div>

      {/* Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 z-40 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2">
                  <Image 
                    src="/images/whatsapp.svg" 
                    alt="WhatsApp" 
                    width={32} 
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Severius Travel</h3>
                  <p className="text-sm text-white/80">Typically replies instantly</p>
                </div>
              </div>
            </div>

            {/* Message Preview */}
            <div className="p-4 bg-[#ECE5DD] border-b border-neutral-200">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-sm text-neutral-700">
                  👋 Hi there! How can we help you plan your next adventure?
                </p>
                <p className="text-xs text-neutral-500 mt-2">
                  Click below to start chatting with us on WhatsApp
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4">
              <button
                onClick={openWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <Image 
                  src="/images/whatsapp.svg" 
                  alt="WhatsApp" 
                  width={20} 
                  height={20}
                  className="w-5 h-5"
                />
                Start Chat
              </button>
              <p className="text-xs text-center text-neutral-500 mt-3">
                We're available Mon-Sat, 8AM-6PM EAT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
