'use client';

import Link from 'next/link';
import React from 'react';
import { event as trackEvent } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  action: string;
  category: string;
  label?: string;
}

export default function TrackedLink({ href, className, children, action, category, label }: TrackedLinkProps) {
  const handleClick = React.useCallback(() => {
    try { trackEvent({ action, category, label }); } catch {}
  }, [action, category, label]);

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}


