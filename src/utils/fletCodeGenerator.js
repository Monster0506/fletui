const generateFletImports = () => {
  return 'import flet as ft\n\n'
}

const formatValue = (value) => {
  if (typeof value === 'string') {
    if (value.startsWith('#')) {
      return `"${value}"`
    }
    return `"${value}"`
  }
  return value
}

const generateRandomFunctionName = () => {
  const adjectives = ['handle', 'process', 'on', 'do', 'execute']
  const nouns = ['click', 'press', 'action', 'event', 'button']
  const randomNum = Math.floor(Math.random() * 1000)
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}_${nouns[Math.floor(Math.random() * nouns.length)]}_${randomNum}`
}

const generateControlCodeWithFunctions = (element, buttonFunctions, filePickerDialogs) => {
  if (!element) return 'ft.Container()'

  const x = Math.round(element.x || 0)
  const y = Math.round(element.y || 0)
  const styles = element.styles || {}

  switch (element.type) {
    case 'text':
      return `ft.Text(
        ${formatValue(element.content || '')},
        size=${styles.fontSize || 14},
        color=${formatValue(styles.color || '#000000')},
        weight=${formatValue(styles.fontWeight || 'normal')},
        italic=${styles.fontStyle === 'italic' ? "True" : "False"},
        text_align=${formatValue(styles.textAlign || 'left')},
        top=${y},
        left=${x}
      )`

    case 'button':
      const buttonFuncName = buttonFunctions.get(element.id)
      const buttonVariant = styles.variant || 'default'
      const buttonSize = styles.size || 'default'
      
      // Map variant to button type and style
      let ButtonClass = 'ft.ElevatedButton'
      let buttonStyle = {}
      
      switch (buttonVariant) {
        case 'outline':
          ButtonClass = 'ft.OutlinedButton'
          break
        case 'text':
          ButtonClass = 'ft.TextButton'
          break
        case 'ghost':
          ButtonClass = 'ft.ElevatedButton'
          buttonStyle.bgcolor = 'transparent'
          break
        default:
          ButtonClass = 'ft.ElevatedButton'
          buttonStyle.bgcolor = formatValue(styles.backgroundColor || '#0175C2')
          break
      }

      // Handle button size
      const sizeMap = {
        'sm': { height: 32 },
        'default': { height: 40 },
        'lg': { height: 48 }
      }
      const buttonHeight = sizeMap[buttonSize]?.height || 40
      const buttonWidth = parseInt(element.width) || 200

      return `${ButtonClass}(
        text=${formatValue(element.content || '')},
        style=ft.ButtonStyle(
            color=${formatValue(styles.color || '#FFFFFF')},
            bgcolor=${formatValue(buttonStyle.bgcolor || styles.backgroundColor || '#0175C2')}
        ),
        width=${buttonWidth},
        height=${buttonHeight},
        on_click=lambda _: ${buttonFuncName}(),
        top=${y},
        left=${x}
      )`

    case 'image':
      const defaultImageSrc = 'https://picsum.photos/200'
      const imageContent = element.content || defaultImageSrc
      const isBase64 = imageContent.startsWith('data:image/')
      const imageWidth = parseInt(element.width) || 150
      const imageHeight = parseInt(element.height) || 150
      return `ft.Image(
        ${isBase64 ? `src_base64="${imageContent.split(',')[1]}"` : `src=${formatValue(imageContent)}`},
        width=${imageWidth},
        height=${imageHeight},
        fit=ft.ImageFit.CONTAIN,
        top=${y},
        left=${x}
      )`

    case 'checkbox':
      const checkboxState = element.checked || 'unchecked'
      const isIndeterminate = checkboxState === 'indeterminate'
      const isChecked = checkboxState === 'checked'
      const checkboxSize = {
        'sm': 16,
        'default': 20,
        'lg': 24
      }[styles.size || 'default']

      return `ft.Checkbox(
        label=${formatValue(element.content || '')},
        value=${isChecked ? "True" : "False"},
        tristate=${isIndeterminate ? "True" : "False"},
        label_position=${formatValue(styles.labelPosition || 'right')},
        scale=${checkboxSize / 20}, # Base size is 20px
        fill_color=${formatValue(styles.color || 'primary')},
        label_style=ft.TextStyle(
          size=${checkboxSize * 0.8},
          color=${formatValue(styles.labelColor || 'black')}
        ),
        top=${y},
        left=${x}
      )`

    case 'filepicker': {
      const { dialogName, resultTextName, resultFuncName } = filePickerDialogs.get(element.id)
      const filePickerWidth = parseInt(element.width) || 200
      const filePickerHeight = parseInt(element.height) || 40
      const extensions = element.allowedExtensions || '*'
      const extensionsArray = extensions === '*' ? '' :
        `, allowed_extensions=[${extensions.split(',').map(ext => `"${ext.trim()}"`).join(', ')}]`

      return `ft.Row(
    controls=[
        ft.ElevatedButton(
            text=${formatValue(element.content || 'Choose File')},
            icon=ft.icons.UPLOAD_FILE,
            on_click=lambda _: ${dialogName}.pick_files(
                allow_multiple=${element.allowMultiple ? "True" : "False"}${extensionsArray}
            ),
            width=${filePickerWidth},
            height=${filePickerHeight},
            style=ft.ButtonStyle(
                bgcolor=${formatValue(styles.backgroundColor || '#0175C2')},
                color=${formatValue(styles.color || '#FFFFFF')}
            )
        ),
        ${resultTextName}
    ],
    top=${y},
    left=${x}
)`
    }

    default:
      return 'ft.Container()'
  }
}

const generateFletCode = (elements) => {
  if (!elements || !Array.isArray(elements)) {
    return `import flet as ft

def main(page):
    page.title = "Generated Flet App"
    page.add(ft.Container())

ft.app(main)`
  }

  const buttonFunctions = new Map()
  const filePickerDialogs = new Map()
  let filePickerCounter = 0

  // First pass to generate function names and collect file picker dialogs
  elements.forEach(element => {
    if (element.type === 'button') {
      const funcName = generateRandomFunctionName()
      buttonFunctions.set(element.id, funcName)
    } else if (element.type === 'filepicker') {
      const dialogName = `pick_files_dialog_${filePickerCounter}`
      const resultTextName = `selected_files_${filePickerCounter}`
      const resultFuncName = `pick_files_result_${filePickerCounter}`
      filePickerCounter++
      filePickerDialogs.set(element.id, { dialogName, resultTextName, resultFuncName })
    }
  })

  // Generate function definitions for buttons only (not file pickers)
  const functionDefinitions = Array.from(buttonFunctions.entries())
    .map(([id, funcName]) =>
      `def ${funcName}():
    \tprint("${funcName} called")\n`
    )
    .join('\n')

  // Generate element code with special handling for file pickers
  const elementsCode = elements.map(element => generateControlCodeWithFunctions(element, buttonFunctions, filePickerDialogs))
    .filter(code => code) // Remove empty strings
    .join(',\n        ')

  // Generate the main function with imports at the top
  return `import flet as ft

def main(page: ft.Page):
    # File picker handlers and setup
    ${Array.from(filePickerDialogs.values())
      .map(({ dialogName, resultTextName, resultFuncName }) => 
        `def ${resultFuncName}(e: ft.FilePickerResultEvent):
        ${resultTextName}.value = (
            ", ".join(map(lambda f: f.name, e.files)) if e.files else "Cancelled!"
        )
        ${resultTextName}.update()

    ${dialogName} = ft.FilePicker(
        on_result=${resultFuncName}
    )
    ${resultTextName} = ft.Text("No file chosen", size=14)

    page.overlay.append(${dialogName})`
      )
      .join('\n\n    ')}

    # Button function definitions
    ${functionDefinitions}

    # Add all controls
    page.add(
        ft.Stack(
            [
                ${elementsCode}
            ]
        )
    )

ft.app(main)`
}

export { generateFletCode }
