const openFile = require('./openFile.js')

exports.activate = function () {
  console.log('open in vs code activated')
};

// exports.deactivate = function () {
//   // Clean up state before the extension is deactivated
// };

nova.commands.register('openInVsCode.openFile', (editor) => {
  openFile(editor)
})
