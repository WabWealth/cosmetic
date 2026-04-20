'use client';

import Navigation from '@/components/Navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Auth is temporarily disabled: always show app content.
  return (
    <>
      <Navigation />
      <main className="pt-20">{children}</main>
    </>
  );
}

