'use client'

import { useState, useEffect } from 'react'
import VoiceControl from '@/components/VoiceControl'
import ScreenControl from '@/components/ScreenControl'
import APIIntegration from '@/components/APIIntegration'
import ModuleManager from '@/components/ModuleManager'
import DocumentationPanel from '@/components/DocumentationPanel'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import { Mic, Monitor, Code, Settings, Book, Activity, Smartphone } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('voice')
  const [isListening, setIsListening] = useState(false)
  const [modules, setModules] = useState([
    { id: 1, name: 'Voice Recognition', status: 'active', version: '2.1.0' },
    { id: 2, name: 'Text-to-Speech', status: 'active', version: '1.8.2' },
    { id: 3, name: 'Screen Control', status: 'active', version: '3.0.1' },
    { id: 4, name: 'API Gateway', status: 'active', version: '2.5.0' },
  ])

  const tabs = [
    { id: 'voice', label: 'Voice Control', icon: Mic },
    { id: 'screen', label: 'Screen Control', icon: Monitor },
    { id: 'api', label: 'API Integration', icon: Code },
    { id: 'modules', label: 'Modules', icon: Settings },
    { id: 'docs', label: 'Documentation', icon: Book },
    { id: 'performance', label: 'Performance', icon: Activity },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            AI Assistant Platform
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced AI Assistant with Voice Control, Screen Management & API Integration
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              System Active
            </span>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Android Compatible
            </span>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {activeTab === 'voice' && <VoiceControl />}
          {activeTab === 'screen' && <ScreenControl />}
          {activeTab === 'api' && <APIIntegration />}
          {activeTab === 'modules' && <ModuleManager modules={modules} setModules={setModules} />}
          {activeTab === 'docs' && <DocumentationPanel />}
          {activeTab === 'performance' && <PerformanceMonitor />}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-400">
          <p className="mb-2">Commercial License | Performance Optimized | Auto-Update Enabled</p>
          <p className="text-sm">Version 1.0.0 • Build 2025.12.31</p>
        </footer>
      </div>
    </div>
  )
}
