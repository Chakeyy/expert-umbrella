import React from 'react';

export const TransmissionView: React.FC = () => {
  const links = [
    { label: 'GitHub', handle: 'github.com/Chakeyy', url: 'https://github.com/Chakeyy' },
    { label: 'Itch.io', handle: 'chakeyy.itch.io', url: 'https://itch.io' },
  ];

  return (
    <div className="max-w-xl space-y-8 py-4 select-none">
      <div className="space-y-2">
        <h1 className="text-sm font-bold tracking-[0.15em] uppercase">
          Contact
        </h1>
        <p className="text-xs text-[var(--color-dim)]">
          For commissions, game asset inquiries, or collaborations.
        </p>
      </div>

      <div className="divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)] text-xs">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-3.5 hover:opacity-75 transition-opacity"
          >
            <span className="text-[var(--color-dim)]">{link.label}</span>
            <span className="font-medium text-[var(--color-fg)]">
              {link.handle} ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
