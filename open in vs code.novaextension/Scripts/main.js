const openFile = require('./openFile.js')

// exports.activate = function () {
//   // Do work when the extension is activated
// };
//
// exports.deactivate = function () {
//   // Clean up state before the extension is deactivated
// };

nova.commands.register('openInVsCode.openFile', (editor) => {
  openFile(editor)
})
