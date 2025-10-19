'use client';

export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] py-6 md:py-12 my-4 md:my-8">
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="flex items-center space-x-8 md:space-x-16 px-4 md:px-8">
          {Array(10).fill(null).map((_, i) => (
            <span
              key={i}
              className="text-xl md:text-3xl lg:text-4xl font-bold text-white/90 tracking-wider inline-block"
            >
              THIS IS HOW YOUR NEXT SAFARI BEGINS ✨
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-8 md:space-x-16 px-4 md:px-8">
          {Array(10).fill(null).map((_, i) => (
            <span
              key={i}
              className="text-xl md:text-3xl lg:text-4xl font-bold text-white/90 tracking-wider inline-block"
            >
              THIS IS HOW YOUR NEXT SAFARI BEGINS ✨
            </span>
          ))}
        </div>
      </div>
      
      {/* Add glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
}
