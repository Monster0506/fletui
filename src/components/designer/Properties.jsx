import React from "react"
import useDesignerStore from "../../store/designerStore"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Toggle } from "../ui/toggle"
import { ScrollArea } from "../ui/scroll-area"

const elementProperties = {
  text: {
    content: {
      label: "Text Content",
      type: "text",
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 200,
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 40,
    },
    styles: {
      fontSize: {
        label: "Font Size",
        type: "number",
        defaultValue: 16,
      },
      fontWeight: {
        label: "Font Weight",
        type: "select",
        options: ["normal", "bold", "lighter", "bolder"],
        defaultValue: "normal",
      },
      textAlign: {
        label: "Text Align",
        type: "select",
        options: ["left", "center", "right", "justify"],
        defaultValue: "left",
      },
      color: {
        label: "Text Color",
        type: "color",
        defaultValue: "#000000",
      },
      backgroundColor: {
        label: "Background Color",
        type: "color",
      },
    },
  },
  button: {
    content: {
      label: "Button Text",
      type: "text",
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 200,
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 40,
    },
    styles: {
      variant: {
        label: "Variant",
        type: "select",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
        defaultValue: "default",
      },
      size: {
        label: "Size",
        type: "select",
        options: ["default", "sm", "lg", "icon"],
        defaultValue: "default",
      },
    },
  },
  checkbox: {
    content: {
      label: "Label Text",
      type: "text",
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 200,
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 40,
    },
    checked: {
      label: "Checked",
      type: "select",
      options: ["unchecked", "checked", "indeterminate"],
      defaultValue: "unchecked",
    },
    styles: {
      labelPosition: {
        label: "Label Position",
        type: "select",
        options: ["right", "left"],
        defaultValue: "right",
      },
      size: {
        label: "Size",
        type: "select",
        options: ["default", "sm", "lg"],
        defaultValue: "default",
      },
      color: {
        label: "Checkbox Color",
        type: "color",
        defaultValue: "hsl(var(--primary))",
      },
      labelColor: {
        label: "Label Color",
        type: "color",
        defaultValue: "hsl(var(--foreground))",
      },
    },
  },
  image: {
    content: {
      label: "Image URL",
      type: "text",
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 200,
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 200,
    },
    styles: {
      objectFit: {
        label: "Object Fit",
        type: "select",
        options: ["cover", "contain", "fill", "none"],
        defaultValue: "cover",
      },
      borderRadius: {
        label: "Border Radius",
        type: "number",
        defaultValue: 4,
      },
      borderWidth: {
        label: "Border Width",
        type: "number",
        defaultValue: 0,
      },
      borderColor: {
        label: "Border Color",
        type: "color",
        defaultValue: "#000000",
      },
    },
  },
  input: {
    content: {
      label: "Value",
      type: "text",
    },
    placeholder: {
      label: "Placeholder",
      type: "text",
    },
    label: {
      label: "Label",
      type: "text",
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 200,
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 40,
    },
    styles: {
      borderColor: {
        label: "Border Color",
        type: "color",
        defaultValue: "#d1d5db",
      },
      borderWidth: {
        label: "Border Width",
        type: "number",
        defaultValue: 1,
      },
      borderRadius: {
        label: "Border Radius",
        type: "number",
        defaultValue: 4,
      },
    },
  },
  filepicker: {
    content: {
      label: "Button Text",
      type: "text",
      defaultValue: "Choose File",
    },
    allowMultiple: {
      label: "Allow Multiple",
      type: "checkbox",
      defaultValue: false,
    },
    allowedExtensions: {
      label: "Allowed Extensions",
      type: "text",
      defaultValue: "*",
      placeholder: "*.txt, *.pdf, etc.",
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 200,
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 40,
    },
    styles: {
      variant: {
        label: "Variant",
        type: "select",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
        defaultValue: "default",
      },
      size: {
        label: "Size",
        type: "select",
        options: ["default", "sm", "lg"],
        defaultValue: "default",
      },
    },
  },
  alertdialog: {
    content: {
      label: "Button Text",
      type: "text",
      defaultValue: "Show Alert"
    },
    dialogTitle: {
      label: "Dialog Title",
      type: "text",
      defaultValue: "Alert"
    },
    dialogMessage: {
      label: "Dialog Text",
      type: "text",
      defaultValue: "Placeholder message"
    },
    // Add any other custom fields as needed...
  },
}

const dimensionProperties = {
  width: {
    label: "Width",
    type: "number",
  },
  height: {
    label: "Height",
    type: "number",
  },
  x: {
    label: "X Position",
    type: "number",
  },
  y: {
    label: "Y Position",
    type: "number",
  },
}

const TextInput = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    <Input 
      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
)

const ColorPicker = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    <Input 
      type="color" 
      className="h-10 px-2 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
      value={value || '#000000'} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
)

const NumberInput = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    <Input 
      type="number" 
      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
      value={value || 0} 
      onChange={(e) => onChange(Number(e.target.value))} 
    />
  </div>
)

const SelectInput = ({ label, value, options, onChange }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200">
        {options.map((option) => (
          <SelectItem 
            key={option.value || option} 
            value={option.value || option}
            className="hover:bg-gray-50 focus:bg-gray-50"
          >
            {option.label || option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

const Properties = () => {
  const selectedElement = useDesignerStore((state) => state.selectedElement)
  const updateElement = useDesignerStore((state) => state.updateElement)
  const deleteElement = useDesignerStore((state) => state.deleteElement)

  const handleUpdate = (updates) => {
    if (!selectedElement) return
    updateElement(selectedElement.id, updates)
  }

  const handleStyleUpdate = (key, value) => {
    if (!selectedElement) return
    handleUpdate({
      styles: {
        ...selectedElement.styles,
        [key]: value
      }
    })
  }

  const renderDimensionControls = () => (
    <>
      <NumberInput
        label="Width"
        value={selectedElement.width}
        onChange={(value) => handleUpdate({ width: value })}
      />
      <NumberInput
        label="Height"
        value={selectedElement.height}
        onChange={(value) => handleUpdate({ height: value })}
      />
    </>
  )

  const renderProperties = () => {
    if (!selectedElement) return null

    switch (selectedElement.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <TextInput
              label="Text Content"
              value={selectedElement.content}
              onChange={(value) => handleUpdate({ content: value })}
            />
            {renderDimensionControls()}
            <ColorPicker
              label="Color"
              value={selectedElement.styles?.color}
              onChange={(value) => handleStyleUpdate('color', value)}
            />
            <NumberInput
              label="Font Size"
              value={selectedElement.styles?.fontSize}
              onChange={(value) => handleStyleUpdate('fontSize', value)}
            />
            <SelectInput
              label="Font Weight"
              value={selectedElement.styles?.fontWeight}
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'bold', label: 'Bold' }
              ]}
              onChange={(value) => handleStyleUpdate('fontWeight', value)}
            />
            <SelectInput
              label="Font Style"
              value={selectedElement.styles?.fontStyle}
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'italic', label: 'Italic' }
              ]}
              onChange={(value) => handleStyleUpdate('fontStyle', value)}
            />
            <SelectInput
              label="Text Align"
              value={selectedElement.styles?.textAlign}
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' }
              ]}
              onChange={(value) => handleStyleUpdate('textAlign', value)}
            />
          </div>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <TextInput
              label="Button Text"
              value={selectedElement.content}
              onChange={(value) => handleUpdate({ content: value })}
            />
            {renderDimensionControls()}
            <ColorPicker
              label="Background Color"
              value={selectedElement.styles?.backgroundColor}
              onChange={(value) => handleStyleUpdate('backgroundColor', value)}
            />
            <ColorPicker
              label="Text Color"
              value={selectedElement.styles?.color}
              onChange={(value) => handleStyleUpdate('color', value)}
            />
            <SelectInput
              label="Variant"
              value={selectedElement.styles?.variant}
              options={[
                { value: 'elevated', label: 'Elevated' },
                { value: 'filled', label: 'Filled' },
                { value: 'outlined', label: 'Outlined' },
                { value: 'text', label: 'Text' }
              ]}
              onChange={(value) => handleStyleUpdate('variant', value)}
            />
            <SelectInput
              label="Size"
              value={selectedElement.styles?.size}
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'default', label: 'Default' },
                { value: 'lg', label: 'Large' }
              ]}
              onChange={(value) => handleStyleUpdate('size', value)}
            />
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-4">
            <TextInput
              label="Label Text"
              value={selectedElement.content}
              onChange={(value) => handleUpdate({ content: value })}
            />
            {renderDimensionControls()}
            <SelectInput
              label="State"
              value={selectedElement.checked}
              options={[
                { value: 'unchecked', label: 'Unchecked' },
                { value: 'checked', label: 'Checked' },
                { value: 'indeterminate', label: 'Indeterminate' }
              ]}
              onChange={(value) => handleUpdate({ checked: value })}
            />
            <SelectInput
              label="Size"
              value={selectedElement.styles?.size}
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'default', label: 'Default' },
                { value: 'lg', label: 'Large' }
              ]}
              onChange={(value) => handleStyleUpdate('size', value)}
            />
            <ColorPicker
              label="Color"
              value={selectedElement.styles?.color}
              onChange={(value) => handleStyleUpdate('color', value)}
            />
            <SelectInput
              label="Label Position"
              value={selectedElement.styles?.labelPosition}
              options={[
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' }
              ]}
              onChange={(value) => handleStyleUpdate('labelPosition', value)}
            />
            <ColorPicker
              label="Label Color"
              value={selectedElement.styles?.labelColor}
              onChange={(value) => handleStyleUpdate('labelColor', value)}
            />
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <TextInput
              label="Image URL"
              value={selectedElement.content}
              onChange={(value) => handleUpdate({ content: value })}
            />
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Upload Image</Label>
              <div className="mt-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleUpdate({ content: event.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none"
                />
              </div>
            </div>
            {renderDimensionControls()}
            <SelectInput
              label="Object Fit"
              value={selectedElement.styles?.objectFit}
              options={[
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
                { value: 'fill', label: 'Fill' },
                { value: 'none', label: 'None' }
              ]}
              onChange={(value) => handleStyleUpdate('objectFit', value)}
            />
            <NumberInput
              label="Border Radius"
              value={selectedElement.styles?.borderRadius}
              onChange={(value) => handleStyleUpdate('borderRadius', value)}
            />
            <NumberInput
              label="Border Width"
              value={selectedElement.styles?.borderWidth}
              onChange={(value) => handleStyleUpdate('borderWidth', value)}
            />
            <ColorPicker
              label="Border Color"
              value={selectedElement.styles?.borderColor}
              onChange={(value) => handleStyleUpdate('borderColor', value)}
            />
          </div>
        )

      case 'filepicker':
        return (
          <div className="space-y-4">
            <TextInput
              label="Button Text"
              value={selectedElement.content}
              onChange={(value) => handleUpdate({ content: value })}
            />
            {renderDimensionControls()}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Allow Multiple Files</Label>
              <div className="pt-1">
                <Toggle
                  pressed={selectedElement.allowMultiple}
                  onPressedChange={(value) => handleUpdate({ allowMultiple: value })}
                  className="bg-white data-[state=on]:bg-blue-500 border border-gray-200"
                >
                  {selectedElement.allowMultiple ? "Yes" : "No"}
                </Toggle>
              </div>
            </div>
            <TextInput
              label="Allowed Extensions"
              value={selectedElement.allowedExtensions}
              onChange={(value) => handleUpdate({ allowedExtensions: value })}
            />
            <SelectInput
              label="Variant"
              value={selectedElement.styles?.variant}
              options={[
                { value: "default", label: "Default" },
                { value: "secondary", label: "Secondary" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
              ]}
              onChange={(value) => handleStyleUpdate("variant", value)}
            />
            <SelectInput
              label="Size"
              value={selectedElement.styles?.size}
              options={[
                { value: "default", label: "Default" },
                { value: "sm", label: "Small" },
                { value: "lg", label: "Large" },
              ]}
              onChange={(value) => handleStyleUpdate("size", value)}
            />
          </div>
        )

      case 'alertdialog':
        return (
          <div className="space-y-4">
            <TextInput
              label="Button Text"
              value={selectedElement.content}
              onChange={(value) => handleUpdate({ content: value })}
            />
            <TextInput
              label="Dialog Title"
              value={selectedElement.dialogTitle}
              onChange={(value) => handleUpdate({ dialogTitle: value })}
            />
            <TextInput
              label="Dialog Text"
              value={selectedElement.dialogMessage}
              onChange={(value) => handleUpdate({ dialogMessage: value })}
            />
            {/* Add more fields if needed */}
          </div>
        )

      default:
        return null
    }
  }

  if (!selectedElement) {
    return (
      <div className="p-4 bg-gray-50 border-l border-gray-200 h-full">
        <p className="text-sm text-gray-500 text-center">Select an element to edit its properties</p>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 border-l border-gray-200 shadow-md">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 bg-gray-100 p-2 rounded-md">Properties</h3>
          <p className="text-xs text-gray-500 mt-0.5">{selectedElement.type}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-red-600"
          onClick={() => deleteElement(selectedElement.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100%-4rem)] px-4 py-4">
        <div className="space-y-4">
          {renderProperties()}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Properties
