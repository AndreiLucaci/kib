const path = require("path");

const { app, BrowserWindow, ipcMain, Notification, Menu } = require("electron");
const isDev = require("electron-is-dev");

const { check } = require("./check");

let win;
let kibWindow;

const getIcon = () => {
  return path.join(__dirname, "favicon.ico");
};

const createKibWindow = async (url) => {
  try {
    if (!(await check(url))) return;

    kibWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      simpleFullscreen: true,
      modal: true,
      center: true,
      icon: getIcon(),
      webPreferences: {
        nodeIntegration: true,
      },
    });

    kibWindow.loadURL(url);
    kibWindow.once("ready-to-show", () => {
      win.hide();
      kibWindow.show();
    });

    kibWindow.on("close", () => {
      win.show();
      kibWindow = null;
    });
  } catch (error) {
    win.show();
    new Notification({ body: error.message }).show();
  }
};

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    show: false,
    icon: getIcon(),
    center: true,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: __dirname + "/preload.js",
    },
  });

  const not = new Notification({
    body: "Kib is loading",
  });

  not.show();

  win.once("ready-to-show", () => {
    win.show();
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  // if (isDev) {
  //   win.webContents.openDevTools({ mode: "detach" });
  // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(createWindow);

const generateMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: "Kib",
      submenu: [
        { label: "About Kib", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "File",
      submenu: [
        {
          label: "Open Default Localhost Kib",
          click: () => createKibWindow("http://localhost:5601"),
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" },
      ],
    },
    {
      label: "Help",
      submenu: [
        { role: "reload" },
        { role: "toggleFullScreen" },
        { role: "toggleDevTools" },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  generateMenu();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("toMain", (event, url) => {
  createKibWindow(url);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
