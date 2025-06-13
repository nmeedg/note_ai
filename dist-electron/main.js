import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1050,
    center: true,
    height: 800,
    vibrancy: "header",
    titleBarStyle: "hidden",
    // titleBarOverlay: true,
    visualEffectState: "active",
    autoHideMenuBar: true,
    frame: true,
    backgroundMaterial: "mica",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true
    },
    ...process.platform !== "darwin" ? {
      titleBarOverlay: {
        color: "#ffffff"
      }
    } : {}
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  return win;
}
const registerIpcEventListeners = () => {
  ipcMain.on("themeShouldUseDarkColors", (event) => {
    event.returnValue = nativeTheme.shouldUseDarkColors;
  });
  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });
};
const registerNativeThemeEventListeners = (allBrowserWindows) => {
  nativeTheme.addListener("updated", () => {
    for (const browserWindow of allBrowserWindows) {
      browserWindow.webContents.send("nativeThemeChanged");
      if (!nativeTheme.shouldUseDarkColors) {
        browserWindow.setTitleBarOverlay({
          color: "#ffffff",
          symbolColor: "#000000"
        });
      } else {
        browserWindow.setTitleBarOverlay({
          color: "#141414",
          symbolColor: "#d6d6d6"
        });
      }
    }
  });
};
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  createWindow();
  registerIpcEventListeners();
  registerNativeThemeEventListeners(BrowserWindow.getAllWindows());
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
