'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tours?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/tours');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl px-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
        <Input
          type="text"
          placeholder="Search destinations, tours..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base bg-white text-neutral-900 placeholder:text-neutral-500"
        />
      </div>
      <Button type="submit" size="lg" className="h-12 px-8 w-full sm:w-auto bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90 text-white">
        Search
      </Button>
    </form>
  );
}
