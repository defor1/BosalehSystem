
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  runTask: (task) => ipcRenderer.send("run-task", task),
  onOutput: (callback) => ipcRenderer.on("task-output", (event, result) => callback(result)),
  windowAction: (action) => ipcRenderer.send("window-action", action)
});
