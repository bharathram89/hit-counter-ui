/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
} 

declare global {
  namespace NodeJS {
    interface Global {
      windows: Electron.BrowserWindow;
    }
  }
}

// ...Business code

global.windows = window