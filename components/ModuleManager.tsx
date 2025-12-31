'use client'

import { useState } from 'react'
import { Settings, Package, Power, RefreshCw, Download, Upload, Trash2 } from 'lucide-react'

interface Module {
  id: number
  name: string
  status: string
  version: string
}

export default function ModuleManager({ modules, setModules }: { modules: Module[], setModules: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)

  const availableModules = [
    { name: 'Natural Language Processing', version: '2.3.1', description: 'Advanced NLP capabilities' },
    { name: 'Image Recognition', version: '1.5.0', description: 'Computer vision and image analysis' },
    { name: 'Data Analytics', version: '3.1.2', description: 'Real-time data processing and analytics' },
    { name: 'Cloud Sync', version: '2.0.5', description: 'Cloud synchronization service' },
    { name: 'Security Module', version: '4.2.0', description: 'Enhanced security and encryption' },
    { name: 'Notification System', version: '1.8.1', description: 'Push notifications and alerts' },
  ]

  const toggleModuleStatus = (id: number) => {
    setModules(modules.map((m: Module) =>
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ))
  }

  const installModule = (moduleName: string, version: string) => {
    const newModule = {
      id: modules.length + 1,
      name: moduleName,
      status: 'active',
      version,
    }
    setModules([...modules, newModule])
  }

  const uninstallModule = (id: number) => {
    setModules(modules.filter((m: Module) => m.id !== id))
    setSelectedModule(null)
  }

  const updateModule = (id: number) => {
    setModules(modules.map((m: Module) =>
      m.id === id ? { ...m, version: `${parseInt(m.version) + 0.1}.0` } : m
    ))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Module Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Installed Modules */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Package className="w-6 h-6" />
            Installed Modules
          </h3>

          <div className="space-y-3">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-black/30 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                onClick={() => setSelectedModule(module)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{module.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    module.status === 'active'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {module.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">v{module.version}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleModuleStatus(module.id)
                      }}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <Power className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateModule(module.id)
                      }}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        uninstallModule(module.id)
                      }}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Details */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Module Details
          </h3>

          {selectedModule ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">{selectedModule.name}</h4>
                <p className="text-gray-400">Version {selectedModule.version}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Status:</span>
                  <span className={selectedModule.status === 'active' ? 'text-green-400' : 'text-gray-400'}>
                    {selectedModule.status}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Module ID:</span>
                  <span className="text-white">{selectedModule.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => toggleModuleStatus(selectedModule.id)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm transition-all"
                >
                  {selectedModule.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => updateModule(selectedModule.id)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm transition-all"
                >
                  Update
                </button>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm transition-all"
                >
                  Configure
                </button>
                <button
                  onClick={() => uninstallModule(selectedModule.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm transition-all"
                >
                  Uninstall
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Select a module to view details
            </div>
          )}
        </div>
      </div>

      {/* Available Modules */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Download className="w-6 h-6" />
          Available Modules
        </h3>

        <input
          type="text"
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableModules
            .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((module, idx) => (
              <div key={idx} className="bg-black/30 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-1">{module.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">v{module.version}</span>
                  <button
                    onClick={() => installModule(module.name, module.version)}
                    disabled={modules.some(m => m.name === module.name)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-white text-xs transition-all"
                  >
                    {modules.some(m => m.name === module.name) ? 'Installed' : 'Install'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
