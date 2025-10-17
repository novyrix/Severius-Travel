'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plane, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock, 
  Mail,
  LucideIcon 
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Users,
  Plane,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  Mail,
};

interface GlassCardProps {
  title: string;
  value: string | number;
  iconName: string; // Changed from icon: LucideIcon
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
  delay?: number;
}

export function GlassCard({
  title,
  value,
  iconName,
  subtitle,
  trend,
  gradient = 'from-blue-500/20 to-purple-500/20',
  delay = 0,
}: GlassCardProps) {
  const Icon = iconMap[iconName] || Users;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden"
    >
      {/* Glassmorphism Card */}
      <div className="relative h-full rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgb(var(--color-gold))]/0 via-[rgb(var(--color-gold))]/50 to-[rgb(var(--color-gold))]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="p-3 rounded-xl bg-gradient-to-br from-[rgb(var(--color-gold))]/20 to-[rgb(var(--color-brown))]/20 backdrop-blur-sm border border-white/30 group-hover:shadow-lg transition-shadow"
            >
              <Icon className="w-6 h-6 text-[rgb(var(--color-gold))]" />
            </motion.div>
            
            {trend && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.3, type: 'spring' }}
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  trend.isPositive
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                    : 'bg-red-500/20 text-red-700 border border-red-500/30'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </motion.div>
            )}
          </div>

          {/* Value */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
            className="mb-2"
          >
            <h3 className="text-4xl font-bold bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] bg-clip-text text-transparent">
              {value}
            </h3>
          </motion.div>

          {/* Title */}
          <p className="text-sm font-medium text-neutral-600 group-hover:text-[rgb(var(--color-brown))] transition-colors">
            {title}
          </p>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-[rgb(var(--color-gold))]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
}

export function GlassContainer({ children, className = '' }: GlassContainerProps) {
  return (
    <div
      className={`rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'gold' | 'brown' | 'blue' | 'green' | 'purple';
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, color = 'gold', delay = 0 }: StatCardProps) {
  const colorMap = {
    gold: {
      bg: 'from-yellow-400/20 to-amber-500/20',
      icon: 'text-yellow-600',
      border: 'border-yellow-500/30',
    },
    brown: {
      bg: 'from-amber-600/20 to-brown-500/20',
      icon: 'text-amber-700',
      border: 'border-amber-500/30',
    },
    blue: {
      bg: 'from-blue-400/20 to-indigo-500/20',
      icon: 'text-blue-600',
      border: 'border-blue-500/30',
    },
    green: {
      bg: 'from-green-400/20 to-emerald-500/20',
      icon: 'text-green-600',
      border: 'border-green-500/30',
    },
    purple: {
      bg: 'from-purple-400/20 to-pink-500/20',
      icon: 'text-purple-600',
      border: 'border-purple-500/30',
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      className="group relative"
    >
      <div className={`relative rounded-xl bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} p-4 hover:shadow-lg transition-all duration-300`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-white/50 ${colors.icon}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-800">{value}</p>
            <p className="text-xs text-neutral-600">{label}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
