import { useState, useEffect } from 'react';
import { TerminalHeader, NavigationTab } from './components/TerminalHeader';
import { StatusBar } from './components/StatusBar';
import { CodexView } from './components/CodexView';
import { CharacterSheetView } from './components/CharacterSheetView';
import { TransmissionView } from './components/TransmissionView';
import { applyPaletteToDocument } from './theme/palettes';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('works');
  const [currentPalette, setCurrentPalette] = useState<string>('ink');
  const [inverted, setInverted] = useState<boolean>(false);

  useEffect(() => {
    applyPaletteToDocument(currentPalette, inverted);
  }, [currentPalette, inverted]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      <TerminalHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentPalette={currentPalette}
        onPaletteChange={setCurrentPalette}
        inverted={inverted}
        onToggleInvert={() => setInverted((prev) => !prev)}
      />

      <main role="main" className="flex-1 max-w-5xl w-full mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {activeTab === 'works' && <CodexView />}
        {activeTab === 'profile' && <CharacterSheetView />}
        {activeTab === 'contact' && <TransmissionView />}
      </main>

      <StatusBar />
    </div>
  );
}
