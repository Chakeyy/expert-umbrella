import { useState, useEffect } from 'react';
import { TerminalHeader, NavigationTab } from './components/TerminalHeader';
import { StatusBar } from './components/StatusBar';
import { CodexView } from './components/CodexView';
import { WandererView } from './components/WandererView';
import { CharacterSheetView } from './components/CharacterSheetView';
import { TransmissionView } from './components/TransmissionView';
import { applyPaletteToDocument, PALETTES } from './theme/palettes';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('codex');
  const [currentPalette, setCurrentPalette] = useState<string>('phosphor');
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>(
    'ARCHIVE ONLINE // LIVE AND DRINK, TRAVELER.'
  );

  useEffect(() => {
    applyPaletteToDocument(currentPalette);
  }, [currentPalette]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      if (e.key === '1') {
        setActiveTab('codex');
        setStatusMessage('SECTOR: ARCHIVES CODEX // BROWSE 1-BIT RELICS.');
      } else if (e.key === '2') {
        setActiveTab('wanderer');
        setStatusMessage('SECTOR: OVERWORLD // USE [WASD / ARROWS] TO EXPLORE.');
      } else if (e.key === '3') {
        setActiveTab('dossier');
        setStatusMessage('SECTOR: CHARACTER DOSSIER // INSPECTING ARTIFICER STATS.');
      } else if (e.key === '4') {
        setActiveTab('transmission');
        setStatusMessage('SECTOR: TRANSMISSION ARRAY // READY TO ENCODE SIGNAL.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    const messages: Record<NavigationTab, string> = {
      codex: 'SECTOR: ARCHIVES CODEX // BROWSE 1-BIT RELICS.',
      wanderer: 'SECTOR: OVERWORLD // USE [WASD / ARROWS] TO EXPLORE.',
      dossier: 'SECTOR: CHARACTER DOSSIER // INSPECTING ARTIFICER STATS.',
      transmission: 'SECTOR: TRANSMISSION ARRAY // READY TO ENCODE SIGNAL.',
    };
    setStatusMessage(messages[tab]);
  };

  const handlePaletteChange = (paletteKey: string) => {
    setCurrentPalette(paletteKey);
    const p = PALETTES[paletteKey];
    if (p) {
      setStatusMessage(`DISPLAY MATRIX CALIBRATED TO: ${p.label}`);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-fg)] font-mono pb-10 ${
        crtEnabled ? 'crt-overlay' : ''
      }`}
    >
      <TerminalHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentPalette={currentPalette}
        onPaletteChange={handlePaletteChange}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled((prev) => !prev)}
      />

      <main role="main" className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5">
        {activeTab === 'codex' && <CodexView />}
        {activeTab === 'wanderer' && (
          <WandererView
            onInspectArt={(art) =>
              setStatusMessage(`INSPECTING OVERWORLD RELIC: ${art.title}`)
            }
          />
        )}
        {activeTab === 'dossier' && <CharacterSheetView />}
        {activeTab === 'transmission' && <TransmissionView />}
      </main>

      <StatusBar message={statusMessage} />
    </div>
  );
}
