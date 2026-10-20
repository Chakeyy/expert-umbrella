import { useState, useEffect } from 'react';
import { TerminalHeader, NavigationTab } from './components/TerminalHeader';
import { StatusBar } from './components/StatusBar';
import { CodexView } from './components/CodexView';
import { CharacterSheetView } from './components/CharacterSheetView';
import { TransmissionView } from './components/TransmissionView';
import { applyPaletteToDocument, PALETTES } from './theme/palettes';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('works');
  const [currentPalette, setCurrentPalette] = useState<string>('ink');
  const [inverted, setInverted] = useState<boolean>(false);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>(
    'VIEWING SELECTED 1-BIT WORKS'
  );

  useEffect(() => {
    applyPaletteToDocument(currentPalette, inverted);
  }, [currentPalette, inverted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.key === '1') {
        setActiveTab('works');
        setStatusMessage('VIEWING SELECTED 1-BIT WORKS');
      } else if (e.key === '2') {
        setActiveTab('profile');
        setStatusMessage('VIEWING ARTIST PROFILE & SPECIFICATIONS');
      } else if (e.key === '3') {
        setActiveTab('contact');
        setStatusMessage('VIEWING CONTACT & COMMISSION INQUIRY');
      } else if (e.key === 'i' || e.key === 'I') {
        setInverted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    const messages: Record<NavigationTab, string> = {
      works: 'VIEWING SELECTED 1-BIT WORKS',
      profile: 'VIEWING ARTIST PROFILE & SPECIFICATIONS',
      contact: 'VIEWING CONTACT & COMMISSION INQUIRY',
    };
    setStatusMessage(messages[tab]);
  };

  const handlePaletteChange = (paletteKey: string) => {
    setCurrentPalette(paletteKey);
    const p = PALETTES[paletteKey];
    if (p) {
      setStatusMessage(`PALETTE SET TO ${p.label}`);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-fg)] pb-12 ${
        crtEnabled ? 'crt-overlay' : ''
      }`}
    >
      <TerminalHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentPalette={currentPalette}
        onPaletteChange={handlePaletteChange}
        inverted={inverted}
        onToggleInvert={() => setInverted((prev) => !prev)}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled((prev) => !prev)}
      />

      <main role="main" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'works' && <CodexView />}
        {activeTab === 'profile' && <CharacterSheetView />}
        {activeTab === 'contact' && <TransmissionView />}
      </main>

      <StatusBar message={statusMessage} />
    </div>
  );
}
