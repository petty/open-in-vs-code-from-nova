function openFile(editor) {
  let currentFilePath = editor.document.path
  let line = null
  let column = null

  if (!currentFilePath) {
    currentFilePath = nova.workspace.path
  } else {
    const text = editor.document.getTextInRange(
      new Range(0, editor.document.length)
    )
    const cursorPosition = editor.selectedRange.start
    const lines = text.slice(0, cursorPosition).split('\n')

    column = lines.slice(-1)[0].length + 1

    if (lines.length) {
      currentFilePath = currentFilePath + ':' + lines.length

      if (lines.slice(-1)[0].length) {
        currentFilePath = currentFilePath + ':' + lines.slice(-1)[0].length + 1
      }
    }
  }

  const process = new Process('/usr/local/bin/code', {
    args: ['-g', currentFilePath],
  })

  const dataLines = []

  process.onStderr(function (data) {
    if (data) {
      dataLines.push(data)
    }
  })

  process.onDidExit(function (status) {
    if (status != 0) {
      nova.workspace.showInformativeMessage(
        nova.localize('Error launching Visual Studio Code:') +
          '\n\n' +
          dataLines.join('')
      )
    }
  })

  process.start()
}

module.exports = openFile
