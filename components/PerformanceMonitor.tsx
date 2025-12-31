'use client'

import { useState, useEffect } from 'react'
import { Activity, Cpu, HardDrive, Wifi, Zap, TrendingUp } from 'lucide-react'

export default function PerformanceMonitor() {
  const [cpuUsage, setCpuUsage] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [networkSpeed, setNetworkSpeed] = useState(0)
  const [responseTime, setResponseTime] = useState(0)
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate performance metrics
      setCpuUsage(Math.floor(Math.random() * 40) + 20)
      setMemoryUsage(Math.floor(Math.random() * 30) + 40)
      setNetworkSpeed(Math.floor(Math.random() * 50) + 50)
      setResponseTime(Math.floor(Math.random() * 100) + 50)
      setUptime(prev => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const metrics = [
    {
      name: 'CPU Usage',
      value: `${cpuUsage}%`,
      icon: Cpu,
      color: 'blue',
      status: cpuUsage < 70 ? 'good' : 'warning'
    },
    {
      name: 'Memory',
      value: `${memoryUsage}%`,
      icon: HardDrive,
      color: 'green',
      status: memoryUsage < 80 ? 'good' : 'warning'
    },
    {
      name: 'Network',
      value: `${networkSpeed} Mbps`,
      icon: Wifi,
      color: 'purple',
      status: networkSpeed > 30 ? 'good' : 'warning'
    },
    {
      name: 'Response Time',
      value: `${responseTime}ms`,
      icon: Zap,
      color: 'yellow',
      status: responseTime < 200 ? 'good' : 'warning'
    },
  ]

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}h ${minutes}m ${secs}s`
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Performance Monitor</h2>

      {/* System Status */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="w-6 h-6" />
            System Status
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-400 font-medium">All Systems Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <div key={idx} className="bg-black/30 rounded-lg p-6 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-8 h-8 text-${metric.color}-400`} />
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    metric.status === 'good'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {metric.status === 'good' ? 'Good' : 'Warning'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{metric.name}</p>
                <p className="text-white text-2xl font-bold">{metric.value}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Performance Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            CPU Usage History
          </h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[...Array(20)].map((_, idx) => {
              const height = Math.random() * 100
              return (
                <div
                  key={idx}
                  className="flex-1 bg-blue-500/50 rounded-t transition-all"
                  style={{ height: `${height}%` }}
                ></div>
              )
            })}
          </div>
          <div className="flex justify-between text-gray-400 text-xs mt-2">
            <span>20s ago</span>
            <span>Now</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Memory Usage History
          </h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[...Array(20)].map((_, idx) => {
              const height = Math.random() * 80 + 20
              return (
                <div
                  key={idx}
                  className="flex-1 bg-green-500/50 rounded-t transition-all"
                  style={{ height: `${height}%` }}
                ></div>
              )
            })}
          </div>
          <div className="flex justify-between text-gray-400 text-xs mt-2">
            <span>20s ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">System Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Platform:</span>
              <span className="text-white">Web / Android</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Version:</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Build:</span>
              <span className="text-white">2025.12.31</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Uptime:</span>
              <span className="text-white">{formatUptime(uptime)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-400">Last Update:</span>
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Optimization Tips</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">✓ Voice recognition optimized</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">✓ API calls cached efficiently</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">✓ All modules running smoothly</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">ℹ Auto-update enabled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Actions */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Performance Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm transition-all">
            Clear Cache
          </button>
          <button className="px-4 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm transition-all">
            Optimize Now
          </button>
          <button className="px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm transition-all">
            Check Updates
          </button>
          <button className="px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm transition-all">
            Run Diagnostics
          </button>
        </div>
      </div>
    </div>
  )
}
