const { ipcRenderer, ipcMain, dialog, BrowserView } = require('electron')
const fs = require('fs');

ipcMain.on('saveNote', (e, content) => {
    console.log(content)


    let filename = dialog.showSaveDialogSync({
        title: "save file"
    })

    console.log(filename)
    if (filename) {
        fs.writeFile(filename, content, (err) => {
            if (err)
                console.log(err)
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync(filename, "utf8"));
            }
        })
    }
})