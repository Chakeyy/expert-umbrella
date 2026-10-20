import React, { useState } from 'react';
import { GlyphFrame } from './GlyphFrame';

export const TransmissionView: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const links = [
    {
      label: 'GITHUB',
      handle: 'github.com/Chakeyy',
      url: 'https://github.com/Chakeyy',
      desc: 'Code repositories, open-source projects, and pixel art archives.',
    },
    {
      label: 'ITCH.IO',
      handle: 'chakeyy.itch.io',
      url: 'https://itch.io',
      desc: 'Indie game projects, playable prototypes, and 1-bit asset packs.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <GlyphFrame index="03" title="CONTACT & LINKS" badge="DIRECT">
            <div className="space-y-4">
              <p className="text-xs text-[var(--color-fg)] opacity-85 leading-relaxed">
                Available for freelance 1-bit pixel art commissions, game sprite/tileset
                production, and collaborative indie projects.
              </p>

              <div className="space-y-3 pt-1">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-[var(--color-border)] hover:border-[var(--color-fg)] bg-[var(--color-bg)] p-3.5 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[var(--color-dim)] uppercase tracking-widest mb-1">
                      <span>{link.label}</span>
                      <span className="group-hover:text-[var(--color-fg)] font-bold">
                        EXTERNAL LINK ↗
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[var(--color-fg)] tracking-wider">
                      {link.handle}
                    </div>
                    <div className="text-[11px] text-[var(--color-dim)] mt-1">
                      {link.desc}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </GlyphFrame>
        </div>

        {/* Right: Commission Inquiry Brief */}
        <div className="lg:col-span-7">
          <GlyphFrame title="PROJECT & COMMISSION INQUIRY">
            {submitted ? (
              <div className="p-8 text-center space-y-4 border border-[var(--color-border)] bg-[var(--color-bg)]">
                <div className="text-sm font-bold tracking-[0.15em] uppercase">
                  INQUIRY RECORDED
                </div>
                <p className="text-xs text-[var(--color-dim)] max-w-md mx-auto">
                  Thank you{senderName ? `, ${senderName}` : ''}. Your project brief has been
                  prepared.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessageBody('');
                  }}
                  className="px-4 py-2 border border-[var(--color-fg)] text-xs uppercase tracking-wider hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors"
                >
                  NEW INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] text-[var(--color-dim)] uppercase tracking-wider mb-1.5">
                    NAME OR EMAIL
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] p-2.5 text-[var(--color-fg)] outline-none focus:border-[var(--color-fg)] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[var(--color-dim)] uppercase tracking-wider mb-1.5">
                    PROJECT BRIEF (SCOPE, RESOLUTIONS, TIMELINE)
                  </label>
                  <textarea
                    rows={5}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Describe the sprites, environments, UI assets, or illustrations you need..."
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] p-2.5 text-[var(--color-fg)] outline-none focus:border-[var(--color-fg)] text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 border border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                >
                  SEND INQUIRY →
                </button>
              </form>
            )}
          </GlyphFrame>
        </div>
      </div>
    </div>
  );
};
