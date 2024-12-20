import React from 'react'
import Canvas from './components/designer/Canvas'
import Toolbar from './components/designer/Toolbar'
import Properties from './components/designer/Properties'
import BottomPanel from './components/designer/BottomPanel'

function App() {
  return (
     <div className="h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
        
        <main className="flex-1 flex min-h-0">
          {/* Left Sidebar - Toolbar */}
          <div className="w-64 shrink-0 border-r bg-gradient-to-r from-purple-100 to-white h-full overflow-y-auto p-4 sticky left-0 top-16">
            <Toolbar />
          </div>
          
          {/* Main Content Area - Canvas + Bottom Panel */}
          <div className="flex-1 overflow-x-auto relative">
            <div className="max-w-[1920px] mx-auto px-6 py-6 min-w-[1024px] h-full">
              {/* Canvas */}
              <div className="bg-gray-200 rounded-lg overflow-hidden h-[calc(100vh-20rem)] shadow-md">
                <Canvas />
              </div>
              
              {/* Bottom Panel - Contained within canvas width */}
              <BottomPanel />
            </div>
          </div>
          
          {/* Right Sidebar - Properties */}
          <div className="w-80 shrink-0 border-l bg-background h-[calc(100vh-20rem)] overflow-y-auto sticky right-0 top-16 shadow-md">
            <div className="p-6">
              <Properties />
            </div>
          </div>
        </main>

      </div>
  )
}

export default App
