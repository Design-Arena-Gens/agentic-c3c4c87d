'use client'

import { useState } from 'react'
import { Monitor, Maximize2, Minimize2, Eye, EyeOff, RefreshCw, Zap } from 'lucide-react'

export default function ScreenControl() {
  const [brightness, setBrightness] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [screenLocked, setScreenLocked] = useState(false)
  const [screenActions, setScreenActions] = useState<string[]>([])

  const logAction = (action: string) => {
    setScreenActions(prev => [...prev, `${new Date().toLocaleTimeString()}: ${action}`].slice(-8))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
      logAction('Entered fullscreen mode')
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
      logAction('Exited fullscreen mode')
    }
  }

  const adjustBrightness = (value: number) => {
    setBrightness(value)
    document.documentElement.style.filter = `brightness(${value}%)`
    logAction(`Brightness adjusted to ${value}%`)
  }

  const lockScreen = () => {
    setScreenLocked(!screenLocked)
    logAction(screenLocked ? 'Screen unlocked' : 'Screen locked')
  }

  const refreshScreen = () => {
    logAction('Screen refreshed')
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Screen Control Panel</h2>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={toggleFullscreen}
          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all text-white flex flex-col items-center gap-3"
        >
          {isFullscreen ? <Minimize2 className="w-8 h-8" /> : <Maximize2 className="w-8 h-8" />}
          <span className="text-sm font-medium">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </span>
        </button>

        <button
          onClick={lockScreen}
          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all text-white flex flex-col items-center gap-3"
        >
          {screenLocked ? <EyeOff className="w-8 h-8" /> : <Eye className="w-8 h-8" />}
          <span className="text-sm font-medium">
            {screenLocked ? 'Unlock' : 'Lock'}
          </span>
        </button>

        <button
          onClick={refreshScreen}
          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all text-white flex flex-col items-center gap-3"
        >
          <RefreshCw className="w-8 h-8" />
          <span className="text-sm font-medium">Refresh</span>
        </button>

        <button
          onClick={() => {
            adjustBrightness(100)
            logAction('Performance mode activated')
          }}
          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all text-white flex flex-col items-center gap-3"
        >
          <Zap className="w-8 h-8" />
          <span className="text-sm font-medium">Optimize</span>
        </button>
      </div>

      {/* Brightness Control */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Monitor className="w-6 h-6" />
          Display Brightness
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min="20"
            max="100"
            value={brightness}
            onChange={(e) => adjustBrightness(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-gray-300">
            <span>20%</span>
            <span className="text-white font-bold">{brightness}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Screen Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Screen Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Resolution:</span>
              <span className="text-white">{typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Color Depth:</span>
              <span className="text-white">{typeof window !== 'undefined' ? `${window.screen.colorDepth} bit` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Orientation:</span>
              <span className="text-white">{typeof window !== 'undefined' ? (window.screen.orientation?.type || 'landscape') : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fullscreen:</span>
              <span className="text-white">{isFullscreen ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Screen Actions Log</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {screenActions.length === 0 ? (
              <p className="text-gray-400">No actions logged yet</p>
            ) : (
              screenActions.map((action, idx) => (
                <div key={idx} className="p-2 bg-black/30 rounded text-sm text-gray-300">
                  {action}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Screen Control Commands */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Voice Commands for Screen Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            '"Go fullscreen" - Enter fullscreen mode',
            '"Exit fullscreen" - Exit fullscreen mode',
            '"Lock screen" - Lock the screen',
            '"Unlock screen" - Unlock the screen',
            '"Increase brightness" - Increase display brightness',
            '"Decrease brightness" - Decrease display brightness',
            '"Refresh screen" - Reload the current view',
            '"Optimize performance" - Reset to optimal settings',
          ].map((cmd, idx) => (
            <div key={idx} className="p-3 bg-black/30 rounded-lg text-gray-300 text-sm">
              {cmd}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
