# ECHOSHOT Android — first test-APK milestone

**Web game:** https://echoshot-game.onrender.com  
**Repository:** https://github.com/alithux/echoshot

This folder prepares the **existing v0.9.1 web game** for Android using **Capacitor 8**, without changing Render's web release. It bundles HTML, assets, original game audio and all 75 levels locally, so the Android app does **not** need network access to play.

## Option A — Get a debug APK through GitHub Actions

Open the repository's **Actions** tab and choose **ECHOSHOT Android debug APK** → **Run workflow** (branch `main`). If Actions is enabled, the build should produce an artifact called **ECHOSHOT-Android-debug-APK**. Download the artifact ZIP, unzip it, and install `app-debug.apk` on your Android phone (you may need to allow installation from that source). Do not claim a build exists unless its Actions run succeeds.

This is a debug/test APK, **not** a Play Store submission. The workflow also runs when relevant source files change. If GitHub Actions is disabled on the repository, an administrator must enable it or you can build locally using Option B.

## Option B — Build in Android Studio on Windows

Requirements: Node.js 22+, Android Studio 2025.2.1 or newer with Android SDK (API 36), and Git.

From PowerShell:

```powershell
git clone https://github.com/alithux/echoshot.git
cd echoshot
npm install
npm run android:init
npm run android:open
```

Android Studio opens the generated `android/` project. Let Gradle synchronize. Connect a test Android phone with Developer Options and USB debugging enabled, and select **Run**. To create an APK, choose **Build → Build Bundle(s) / APK(s) → Build APK(s)** or run in PowerShell:

```powershell
cd android
.\gradlew.bat assembleDebug
```

Then copy `android/app/build/outputs/apk/debug/app-debug.apk` to the phone and install it. The Android SDK and Gradle dependencies must download successfully at least once.

## After modifying the web game

The root `index.html` and `public/` remain the web version. Regenerate Android assets and sync the native project:

```powershell
npm run android:sync
```

Open/run Android Studio or build an updated APK. The native `android/` and `www/` folders are generated and ignored by Git to keep web development clean. The package name is initially `com.alithux.echoshot`; choose and lock your preferred ID before a Play Store publication.

## Native integration

- **Offline first:** HTML, images and sounds are bundled; the PWA service worker is intentionally not registered inside the WebView.
- **Android Back:** closes open game menus or result overlay; otherwise minimizes the application.
- **Saved progress:** the same JSON data structure (`echoshot-progress-v1`), but Android WebView local storage is independent of iPhone Safari/PWA or Chrome. Use **Menu → Export Backup** to open Android's share dialog and send your `.json` backup to Files or Google Drive. **Menu → Restore Backup** uses the Android file picker; verify on a real device before relying on it.
- **Sound:** original synthesized Web Audio effects remain, gated by the saved mute switch. Some Android phones require a touch to enable audio.
- **No unnecessary permissions:** cache-file sharing doesn't require broad external-storage access. No server, account, advertising, or analytics added.
- **Visuals:** Android Studio's default native launcher icon may be used in this first scaffold; replace it with ECHOSHOT's branded adaptive icon before publishing widely.

## Verification and limitations

- Run `npm run test:android` to validate the generated web shell, stable game HTML source, offline assets and saved-progress hooks.
- This environment could verify the local scaffolding but **could not compile an APK here**, since the Android SDK and npm registry were unavailable. The GitHub Actions workflow is provided as a build option but its execution must be checked separately.
- An actual Android-device test is required for full-screen layout, back navigation, sound, backup sharing/restoration and performance.
- Do not upload debug APKs to Google Play. Use Android Studio's signed Android App Bundle for a production release later.