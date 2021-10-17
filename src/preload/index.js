const { contextBridge, ipcRenderer, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('appContext', {
  sendPing: () => ipcRenderer.send('ping'),
  onPingReceive: (callback) => ipcRenderer.on('ping-reply', (event, arg) => callback(arg)),
  saveNote: (content) => { 
    ipcRenderer.send('saveNote', content)
  },

  // I planned
  fetchNotes: (content) => {
    ipcRenderer.send("fetchNotes", content)
  }
});
 