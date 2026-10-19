import React, { useState } from 'react';
import { GlyphFrame } from './GlyphFrame';

export const TransmissionView: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [transmitted, setTransmitted] = useState(false);

  const channels = [
    {
      freq: 'FREQ 88.4 MHz',
      name: 'GITHUB ARCHIVES',
      handle: 'github.com/Chakeyy',
      url: 'https://github.com/Chakeyy',
      desc: 'Source repositories, pixel shaders, and game assets.',
    },
    {
      freq: 'FREQ 92.1 MHz',
      name: 'ITCH.IO CARAVAN',
      handle: 'chakeyy.itch.io',
      url: 'https://itch.io',
      desc: 'Playable 1-bit micro-games, sprite packs, and tilesets.',
    },
    {
      freq: 'FREQ 104.7 MHz',
      name: 'SOCIAL RELAY',
      handle: '@Chakeyy',
      url: 'https://github.com/Chakeyy',
      desc: 'Work-in-progress pixel dailies and dithering studies.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) return;
    setTransmitted(true);
  };

  return (
    <div className="space-y-4 font-mono select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Broadcast Channels */}
        <div className="lg:col-span-6 space-y-4">
          <GlyphFrame title="TRANSMISSION ARRAY // BROADCAST FREQUENCIES" badge="SIGNAL: STRONG">
            <div className="space-y-3">
              <p className="text-xs text-[var(--color-fg)] leading-relaxed">
                Tune your receiver to any of the following subspace conduits to inspect additional
                works, commission custom 1-bit assets, or perform the water ritual.
              </p>

              <div className="space-y-2.5 pt-2">
                {channels.map((ch) => (
                  <a
                    key={ch.name}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-[var(--color-dim)] hover:border-[var(--color-bright)] bg-black/40 p-3 transition-all group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[var(--color-dim)] mb-1">
                      <span>[{ch.freq}]</span>
                      <span className="group-hover:text-[var(--color-bright)]">OPEN UPLINK ►</span>
                    </div>
                    <div className="text-xs font-bold text-[var(--color-bright)]">
                      {ch.name} — <span className="underline">{ch.handle}</span>
                    </div>
                    <div className="text-[11px] text-[var(--color-fg)] opacity-80 mt-1">
                      {ch.desc}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </GlyphFrame>
        </div>

        {/* Right: Direct Terminal Message Encoder */}
        <div className="lg:col-span-6">
          <GlyphFrame title="ENCODE DIRECT TRANSMISSION // COMMISSIONS">
            {transmitted ? (
              <div className="p-6 text-center space-y-3 border border-[var(--color-border)] bg-black/50">
                <div className="text-lg font-bold text-[var(--color-bright)]">
                  [ ░▒▓ SIGNAL DISPATCHED ▓▒░ ]
                </div>
                <p className="text-xs text-[var(--color-fg)]">
                  Your packet has been encoded and beamed across the salt flats. Live and drink,{' '}
                  {senderName || 'traveler'}.
                </p>
                <button
                  onClick={() => {
                    setTransmitted(false);
                    setMessageBody('');
                  }}
                  className="px-4 py-1.5 border border-[var(--color-border)] text-xs text-[var(--color-bright)] hover:bg-[var(--color-dim)]"
                >
                  [SEND ANOTHER PACKET]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] text-[var(--color-dim)] mb-1">
                    SENDER CALLSIGN / EMAIL:
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Nomad_77 or traveler@domain.com"
                    className="w-full bg-black/60 border border-[var(--color-border)] p-2 text-[var(--color-bright)] outline-none focus:border-[var(--color-bright)] font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[var(--color-dim)] mb-1">
                    TRANSMISSION PAYLOAD (PROJECT DETAILS / INQUIRY):
                  </label>
                  <textarea
                    rows={5}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Describe your game, sprite specifications, resolution, or commission inquiry..."
                    className="w-full bg-black/60 border border-[var(--color-border)] p-2 text-[var(--color-bright)] outline-none focus:border-[var(--color-bright)] font-mono text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 border border-[var(--color-bright)] bg-[var(--color-dim)] text-[var(--color-bright)] font-bold tracking-wider hover:bg-[var(--color-bright)] hover:text-black transition-colors"
                >
                  [TRANSMIT SIGNAL PACKET ►]
                </button>
              </form>
            )}
          </GlyphFrame>
        </div>
      </div>
    </div>
  );
};
