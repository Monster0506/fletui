import { create } from 'zustand'

export const useDesignerStore = create((set) => ({
  elements: [],
  selectedElement: null,
  canvas: {
    width: '100%',
    height: '100%',
  },
  
  addElement: (element) => 
    set((state) => ({ 
      elements: [...state.elements, element],
      selectedElement: element
    })),
    
  updateElement: (id, updates) =>
    set((state) => {
      const elementIndex = state.elements.findIndex(el => el.id === id)
      if (elementIndex === -1) return state

      const updatedElements = [...state.elements]
      const currentElement = updatedElements[elementIndex]
      
      // Merge updates with current element
      updatedElements[elementIndex] = {
        ...currentElement,
        ...updates,
        styles: {
          ...currentElement.styles,
          ...(updates.styles || {})
        }
      }
      
      return {
        elements: updatedElements,
        selectedElement: updatedElements[elementIndex]
      }
    }),
    
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElement: state.selectedElement?.id === id ? null : state.selectedElement
    })),
    
  setSelectedElement: (element) =>
    set({ selectedElement: element }),
    
  updateCanvas: (dimensions) =>
    set((state) => ({
      canvas: { ...state.canvas, ...dimensions },
    })),
    
  removeSelectedElement: () => 
    set((state) => {
      if (!state.selectedElement) return state
      
      return {
        elements: state.elements.filter((el) => el.id !== state.selectedElement.id),
        selectedElement: null
      }
    }),
}))

export default useDesignerStore
