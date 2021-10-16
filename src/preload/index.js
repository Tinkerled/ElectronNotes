const { contextBridge, ipcRenderer, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('appContext', {
  sendPing: () => ipcRenderer.send('ping'),
  onPingReceive: (callback) => ipcRenderer.on('ping-reply', (event, arg) => callback(arg)),
  saveNote: (content) => { 
    console.log("preloader")
    ipcRenderer.send('saveNote', content)}
});
 