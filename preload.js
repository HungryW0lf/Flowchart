const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

contextBridge.exposeInMainWorld('electronAPI', {
    saveJson: (jsonData) => ipcRenderer.send('save-json', jsonData),
    onSaveJsonReply: (callback) => ipcRenderer.on('save-json-reply', (event, status) => callback(status)),
    loadJson: () => ipcRenderer.send('load-json'),
    onLoadJsonReply: (callback) => ipcRenderer.on('load-json-reply', (event, data) => callback(data))
})