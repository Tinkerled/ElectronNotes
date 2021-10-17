const { contextBridge, ipcRenderer, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('appContext', {
  // send command to save note
  saveNote: (content) => { 
    ipcRenderer.send('saveNote', content)
  },
});
 