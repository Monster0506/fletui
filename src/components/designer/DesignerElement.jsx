import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import useDesignerStore from '../../store/designerStore'
import { 
  Check, 
  ChevronDown,
  Star,
  Upload
} from 'lucide-react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Slider } from "../ui/slider"
import { Progress } from "../ui/progress"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"

const DesignerElement = ({ element }) => {
  const updateElement = useDesignerStore(state => state.updateElement)
  const setSelectedElement = useDesignerStore(state => state.setSelectedElement)
  const selectedElement = useDesignerStore(state => state.selectedElement)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      isDesignerElement: true,
      element
    }
  })

  const isSelected = selectedElement?.id === element.id
  const styles = element?.styles || {}

  const baseStyle = {
    position: 'absolute',
    top: element.y,
    left: element.x,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    width: element.width,
    height: element.height,
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setSelectedElement(element)
  }

  const renderElement = () => {
    if (!element) return null

    switch (element.type) {
      case 'image':
        return (
          <div className="w-full h-full">
            <img
              src={element.content || 'https://via.placeholder.com/150'}
              alt="Element Image"
              className={cn(element?.styles?.className)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: styles.objectFit || 'cover',
                borderRadius: styles.borderRadius,
                border: styles.borderWidth ? `${styles.borderWidth}px solid ${styles.borderColor || '#000'}` : undefined,
              }}
            />
          </div>
        )

      case 'text':
        return (
          <div
            className={cn(element?.styles?.className)}
            style={{
              width: '100%',
              height: '100%',
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              fontStyle: styles.fontStyle,
              textAlign: styles.textAlign,
              color: styles.color,
              backgroundColor: styles.backgroundColor,
              padding: styles.padding,
              display: 'flex',
              alignItems: 'center',
              ...styles
            }}
          >
            {element.content}
          </div>
        )

      case 'button':
        return (
          <Button
            variant={styles.variant || "default"}
            size={styles.size || "default"}
            className={cn("w-full h-full", element?.styles?.className)}
            disabled
          >
            {element.icon && <Star className="mr-2 h-4 w-4" />}
            {element.content}
          </Button>
        )

      case 'input':
        return (
          <div className="w-full h-full flex flex-col">
            {element.label && (
              <Label className="mb-2">{element.label}</Label>
            )}
            <Input
              type={element.isPassword ? 'password' : 'text'}
              placeholder={element.placeholder}
              value={element.content || ''}
              disabled
              className="w-full"
            />
          </div>
        )

      case 'checkbox':
        const checkboxState = element.checked || 'unchecked'
        const isIndeterminate = checkboxState === 'indeterminate'
        const isChecked = checkboxState === 'checked'
        const labelPosition = styles.labelPosition || 'right'
        const size = styles.size || 'default'
        
        const checkboxSizeClasses = {
          sm: 'h-3 w-3',
          default: 'h-4 w-4',
          lg: 'h-5 w-5'
        }
        
        const labelSizeClasses = {
          sm: 'text-sm',
          default: 'text-base',
          lg: 'text-lg'
        }

        const checkboxColor = styles.color || 'hsl(var(--primary))'
        const labelColor = styles.labelColor || 'hsl(var(--foreground))'

        return (
          <div className={cn(
            "flex items-center gap-2",
            labelPosition === 'left' && "flex-row-reverse",
            element?.styles?.className
          )}>
            <Checkbox 
              checked={isChecked}
              indeterminate={isIndeterminate}
              style={{
                backgroundColor: isChecked || isIndeterminate ? checkboxColor : undefined,
                borderColor: checkboxColor,
              }}
              className={cn(
                checkboxSizeClasses[size],
                "transition-colors"
              )}
              disabled
            />
            <Label 
              className={cn(
                labelSizeClasses[size],
                "cursor-default select-none"
              )}
              style={{ color: labelColor }}
            >
              {element.content}
            </Label>
          </div>
        )

      case 'dropdown':
        return (
          <Select disabled>
            <SelectTrigger className="w-full h-full">
              <SelectValue placeholder={element.placeholder || "Select an option"} />
            </SelectTrigger>
          </Select>
        )

      case 'slider':
        return (
          <div className="w-full h-full flex flex-col">
            {element.label && (
              <Label className="mb-2">{element.label}</Label>
            )}
            <Slider
              value={[element.value || styles.value || 50]}
              min={styles.min || 0}
              max={styles.max || 100}
              step={styles.step || 1}
              disabled
              className="w-full"
            />
          </div>
        )

      case 'progressBar':
        return (
          <Progress
            value={((element.value || styles.value || 0) * 100)}
            className="w-full h-full"
          />
        )

      case 'divider':
        return (
          <div className="w-full h-full flex items-center">
            <Separator
              orientation={styles.orientation || "horizontal"}
              className={cn("w-full", element?.styles?.className)}
            />
            {element.content && (
              <span className="px-2 text-xs text-muted-foreground absolute left-1/2 -translate-x-1/2 bg-background">
                {element.content}
              </span>
            )}
          </div>
        )

      case 'container':
        return (
          <div 
            className={cn(
              "bg-muted rounded-lg border w-full h-full relative",
              element?.styles?.className
            )}
          >
            {element.children?.map((child) => (
              <DesignerElement key={child.id} element={child} />
            ))}
          </div>
        )

      case 'filepicker':
        return (
          <div className="w-full h-full flex flex-col gap-2">
            <Button
              variant={styles.variant || "default"}
              size={styles.size || "default"}
              className={cn("w-full", element?.styles?.className)}
              disabled
            >
              <Upload className="mr-2 h-4 w-4" />
              {element.content || "Choose File"}
            </Button>
            {element.allowMultiple && (
              <div className="text-xs text-muted-foreground">
                Multiple files allowed
              </div>
            )}
            {element.allowedExtensions !== '*' && (
              <div className="text-xs text-muted-foreground">
                Allowed: {element.allowedExtensions}
              </div>
            )}
          </div>
        )

      default:
        return <div className="w-full h-full">{element.content}</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      style={baseStyle}
      className={cn(
        "relative shadow-sm hover:shadow-md transition-shadow",
        isSelected && "outline outline-2 outline-indigo-500 outline-offset-2"
      )}
    >
      {renderElement()}
    </div>
  )
}

export default DesignerElement
