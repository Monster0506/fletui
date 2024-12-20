import React from 'react'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { Card } from "../ui/card"
import useDesignerStore from '../../store/designerStore'
import { 
  Type, 
  Square, 
  Image as ImageIcon, 
  FormInput, 
  Layout,
  Rows3,
  Columns3,
  CheckSquare, 
  ChevronDown,
  Minus,
  Upload,
  SlidersHorizontal,
  Star,
  Loader,
  TextCursor
} from 'lucide-react'

const elementTypes = [
  { 
    type: 'text', 
    label: 'Text', 
    icon: Type,
    defaultContent: 'Text',
    defaultStyles: {
      fontSize: 14,
      color: '#000000',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textAlign: 'left'
    }
  },
  { 
    type: 'button', 
    label: 'Button', 
    icon: Square,
    defaultContent: 'Button',
    defaultStyles: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      variant: 'elevated',
      size: 'default'
    }
  },
  { 
    type: 'checkbox', 
    label: 'Checkbox', 
    icon: CheckSquare,
    defaultContent: 'Checkbox',
    checked: 'unchecked',
    defaultStyles: {
      size: 'default',
      color: 'primary',
      labelPosition: 'right',
      labelColor: 'black'
    }
  },
  { 
    type: 'image', 
    label: 'Image', 
    icon: ImageIcon,
    defaultContent: '',
    defaultStyles: {
      width: '200',
      height: '200'
    }
  },
  { 
    type: 'filepicker', 
    label: 'File Picker', 
    icon: Upload,
    defaultContent: 'Choose File',
    defaultStyles: {
      width: '200',
      height: '40',
      variant: 'default',
      size: 'default',
    },
    allowMultiple: false,
    allowedExtensions: '*'
  }
]

const Toolbar = () => {
  const addElement = useDesignerStore((state) => state.addElement)
  
  const handleAddElement = (type) => {
    const elementType = elementTypes.find(et => et.type === type)
    if (!elementType) return

    const newElement = {
      id: Date.now().toString(),
      type,
      content: elementType.defaultContent || '',
      styles: elementType.defaultStyles || {},
      x: 100,
      y: 100,
      width: elementType.defaultStyles?.width || 200,
      height: elementType.defaultStyles?.height || 40,
    }

    // Add specific properties for certain element types
    if (type === 'checkbox') {
      newElement.checked = elementType.checked || 'unchecked'
    } else if (type === 'filepicker') {
      newElement.allowMultiple = elementType.allowMultiple || false
      newElement.allowedExtensions = elementType.allowedExtensions || '*'
    }

    addElement(newElement)
  }
  
  return (
    <Card className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 border-border text-white">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Add Elements</h2>
      <Separator className="mb-4" />
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="space-y-1">
          <TooltipProvider>
            {elementTypes.map((et) => (
              <Tooltip key={et.type}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => handleAddElement(et.type)}
                    className="w-full justify-start gap-2 font-normal hover:bg-purple-700 transition-colors"
                  >
                    <et.icon className="h-4 w-4" />
                    <span className="text-white">{et.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-popover text-popover-foreground">
                  <p>Add {et.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </ScrollArea>
    </Card>
  )
}

export default Toolbar
