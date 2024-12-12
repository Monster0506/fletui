import React from 'react'
import CodeBlock from './CodeBlock'
import { generateFletCode } from '../../utils/fletCodeGenerator'
import useDesignerStore from '../../store/designerStore'

const BottomPanel = () => {
  const elements = useDesignerStore(state => state.elements) || []
  const generatedCode = generateFletCode(elements)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="h-48 flex items-center">
          <div className="w-full h-40">
            <CodeBlock code={generatedCode} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomPanel
