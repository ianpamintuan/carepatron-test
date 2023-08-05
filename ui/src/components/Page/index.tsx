import React from 'react';

interface PageProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Page({ children, className }: PageProps) {
  return (
    <div style={{ margin: 'auto', marginTop: 24, maxWidth: '700px' }} className={className}>
      {children}
    </div>
  );
}
