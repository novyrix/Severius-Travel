"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Award } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Worldwide Destinations",
    description: "Explore tours across Africa, Europe, Asia and beyond",
  },
  {
    icon: Calendar,
    title: "Flexible Booking",
    description: "Easy online booking with secure payment options",
  },
  {
    icon: Users,
    title: "Expert Guides",
    description: "Professional local guides for authentic experiences",
  },
  {
    icon: Award,
    title: "Best Value",
    description: "Competitive prices without compromising quality",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function AnimatedFeatures() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-gold))]/10 mb-4"
                >
                  <Icon className="w-8 h-8 text-[rgb(var(--color-gold))]" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
