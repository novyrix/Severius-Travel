'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import '../styles/nprogress.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: true,
  trickleSpeed: 100,
  minimum: 0.08,
  easing: 'ease',
  speed: 300
});

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
