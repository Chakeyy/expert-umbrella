import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-dim)] text-[11px] py-6 select-none mt-12">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Chakeyy</span>
        <span>1-Bit Pixel Art</span>
      </div>
    </footer>
  );
};
