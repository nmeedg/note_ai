import { app, BrowserWindow, ipcMain, nativeTheme, type IpcMainEvent } from 'electron'
//import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

//const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1050,
    center: true,
    height: 800,
    vibrancy: 'header',
    titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    visualEffectState: 'active',
    autoHideMenuBar: true,
    frame: true,
    backgroundMaterial: 'mica',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
    },
    ...(process.platform !== 'darwin' ? {
      titleBarOverlay: {
        color: "#ffffff"
      }
    } : {})

  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  return win
}

const registerIpcEventListeners = () => {
  ipcMain.on("themeShouldUseDarkColors", (event: IpcMainEvent) => {
    event.returnValue = nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
};

const registerNativeThemeEventListeners = (allBrowserWindows: BrowserWindow[]) => {
  nativeTheme.addListener("updated", () => {
    for (const browserWindow of allBrowserWindows) {
      browserWindow.webContents.send("nativeThemeChanged");
      if (!nativeTheme.shouldUseDarkColors) {
        browserWindow.setTitleBarOverlay({
          color: "#ffffff",
          symbolColor: "#000000"
        })
      } else {
        browserWindow.setTitleBarOverlay({
          color: "#141414",
          symbolColor: "#d6d6d6"
        })
      }
    }
  });
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// app.whenReady().then(createWindow)
app.whenReady().then(() => {
  const windowCopy = createWindow()
  windowCopy.webContents.openDevTools();
  registerIpcEventListeners();
  registerNativeThemeEventListeners(BrowserWindow.getAllWindows());
})

