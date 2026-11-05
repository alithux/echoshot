// Bundled for Android only. The web PWA never loads this module.
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

if (Capacitor.isNativePlatform()) {
  const byId = id => document.getElementById(id);
  const isVisible = id => !byId(id)?.classList.contains('hidden');

  // Bundled game: no internet or PWA service worker required.
  window.__ECHOSHOT_NATIVE__ = {
    async shareBackup(filename, json) {
      const file = await Filesystem.writeFile({
        path: filename,
        data: json,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });
      await Share.share({
        title: 'ECHOSHOT progress backup',
        text: 'Save this ECHOSHOT progress backup somewhere safe.',
        files: [file.uri],
        dialogTitle: 'Save or share progress backup',
      });
    },
  };

  App.addListener('backButton', () => {
    if (isVisible('menuModal')) { byId('closeMenu')?.click(); return; }
    if (isVisible('levelsModal')) { byId('closeLevels')?.click(); return; }
    if (isVisible('resultOverlay')) { byId('resetBtn')?.click(); return; }
    App.minimizeApp().catch(error => console.warn('Could not minimize app', error));
  }).catch(error => console.warn('Android Back handler unavailable:', error));
}
