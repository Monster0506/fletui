import React, { useEffect } from 'react'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import useDesignerStore from '../../store/designerStore'
import DesignerElement from './DesignerElement'

const Canvas = () => {
  const elements = useDesignerStore((state) => state.elements)
  const canvas = useDesignerStore((state) => state.canvas)
  const updateElement = useDesignerStore((state) => state.updateElement)
  const setSelectedElement = useDesignerStore((state) => state.setSelectedElement)
  const selectedElement = useDesignerStore((state) => state.selectedElement)
  const removeElement = useDesignerStore((state) => state.removeElement)
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  const sensors = useSensors(mouseSensor)
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle delete/backspace if we're in an input field
      if (e.target.tagName.toLowerCase() === 'input' || 
          e.target.tagName.toLowerCase() === 'textarea' ||
          e.target.isContentEditable) {
        return
      }

      if (selectedElement && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault()
        removeElement(selectedElement.id)
        setSelectedElement(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElement, removeElement, setSelectedElement])
  
  const handleDragEnd = (event) => {
    const { active, delta } = event
    if (!active || !delta) return
    
    const draggedElement = elements.find(el => el.id === active.id)
    if (!draggedElement) return
    
    updateElement(active.id, {
      x: draggedElement.x + delta.x,
      y: draggedElement.y + delta.y,
    })
  }
  
  const handleCanvasClick = () => {
    setSelectedElement(null)
  }
  
  return (
    <div 
      className="w-full h-full relative bg-white rounded-lg shadow-lg overflow-hidden"
      onClick={handleCanvasClick}
    >
      <DndContext 
        sensors={sensors} 
        onDragEnd={handleDragEnd}
      >
        {elements.map((element) => (
          <DesignerElement key={element.id} element={element} />
        ))}
      </DndContext>
    </div>
  )
}

export default Canvas
