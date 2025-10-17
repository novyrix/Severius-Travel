'use client';

export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className={`inline-block ${sizes[size]} ${className} border-t-[rgb(var(--color-gold))] border-r-transparent border-b-[rgb(var(--color-brown))] border-l-transparent rounded-full animate-spin`} />
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-t-[rgb(var(--color-gold))] border-r-transparent border-b-[rgb(var(--color-brown))] border-l-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 w-20 h-20 border-4 border-t-transparent border-r-[rgb(var(--color-gold))]/30 border-b-transparent border-l-[rgb(var(--color-brown))]/30 rounded-full animate-spin-slow" />
        </div>
        <p className="text-[rgb(var(--color-brown))] font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export function CardLoader() {
  return (
    <div className="w-full p-8 flex justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export function ButtonLoader() {
  return <LoadingSpinner size="sm" className="mr-2" />;
}
