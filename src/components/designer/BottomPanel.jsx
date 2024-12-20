import React from 'react'
import CodeBlock from './CodeBlock'
import { generateFletCode } from '../../utils/fletCodeGenerator'
import useDesignerStore from '../../store/designerStore'

const BottomPanel = () => {
  const elements = useDesignerStore(state => state.elements) || []
  const generatedCode = generateFletCode(elements)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-md">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="h-48 flex items-center">
          <div className="w-full h-40 p-2 border border-gray-200 rounded-lg bg-gray-50">
            <CodeBlock code={generatedCode} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomPanel
