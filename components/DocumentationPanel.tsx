'use client'

import { useState } from 'react'
import { Book, FileText, Code, Zap, Smartphone } from 'lucide-react'

export default function DocumentationPanel() {
  const [activeDoc, setActiveDoc] = useState('overview')

  const docs = {
    overview: {
      title: 'Platform Overview',
      icon: Book,
      content: `
# AI Assistant Platform

## Introduction
Welcome to the AI Assistant Platform - a comprehensive solution for voice-controlled AI assistance with advanced features including voice recognition, text-to-speech, screen control, and API integration.

## Key Features
- **Voice Recognition**: Advanced speech-to-text with continuous listening
- **Text-to-Speech**: Natural voice synthesis for responses
- **Screen Control**: Full control over display settings and modes
- **API Integration**: Connect to any REST API with custom headers
- **Modular Architecture**: Install and manage custom modules
- **Performance Optimized**: Built for speed and efficiency
- **Android Support**: Full compatibility with Android devices
- **Auto-Update**: Automatic updates for latest features

## System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Microphone access for voice features
- Internet connection for API calls
- Android 8.0+ for mobile devices
      `
    },
    voice: {
      title: 'Voice Recognition Guide',
      icon: Zap,
      content: `
# Voice Recognition & Text-to-Speech

## Voice Commands
The platform supports natural language voice commands. Simply click "Start Listening" and speak clearly.

### Basic Commands
- **"Hello" / "Hi"**: Greet the assistant
- **"What time is it?"**: Get current time
- **"What date is it?"**: Get current date
- **"Help"**: Get assistance

### Screen Control Commands
- **"Go fullscreen"**: Enter fullscreen mode
- **"Exit fullscreen"**: Leave fullscreen mode
- **"Lock screen"**: Lock the display
- **"Unlock screen"**: Unlock the display
- **"Increase brightness"**: Make screen brighter
- **"Decrease brightness"**: Dim the screen

### Application Commands
- **"Open [app name]"**: Launch an application
- **"Close [app name]"**: Close an application

## Text-to-Speech
All responses are automatically spoken using natural voice synthesis. You can control speech with the Stop Speaking button.

## Tips for Best Results
1. Speak clearly and at normal pace
2. Reduce background noise
3. Use a good quality microphone
4. Wait for the previous command to complete
      `
    },
    api: {
      title: 'API Integration',
      icon: Code,
      content: `
# API Integration Guide

## Making API Calls
The platform supports all HTTP methods: GET, POST, PUT, DELETE, and PATCH.

### Configuration
1. **API Key**: Enter your authentication key (optional)
2. **HTTP Method**: Select the request method
3. **Endpoint**: Enter the full API URL
4. **Request Body**: Add JSON payload for POST/PUT/PATCH requests

### Example API Call
\`\`\`json
// GET Request
URL: https://api.example.com/data
Method: GET
Headers: Authorization: Bearer your_api_key

// POST Request
URL: https://api.example.com/create
Method: POST
Body: {"name": "John", "email": "john@example.com"}
\`\`\`

### Quick APIs
Pre-configured APIs for testing:
- **Weather API**: Get weather information
- **News API**: Fetch latest news
- **GitHub API**: Access GitHub data
- **JSONPlaceholder**: Test REST API

### Response Handling
All responses are displayed in JSON format with:
- Status code
- Response time
- Full response body
- Error messages if any

### API Call History
Track all your API calls with:
- Timestamp
- Method used
- Endpoint called
- Status code
- Duration
- Success/failure indicator
      `
    },
    modules: {
      title: 'Module Management',
      icon: FileText,
      content: `
# Module Management

## Installing Modules
1. Browse available modules
2. Click "Install" on desired module
3. Module activates automatically
4. Configure settings as needed

## Managing Modules
- **Activate/Deactivate**: Toggle module status
- **Update**: Get latest version
- **Configure**: Customize settings
- **Uninstall**: Remove module

## Available Modules
- **Natural Language Processing**: Advanced NLP capabilities
- **Image Recognition**: Computer vision and image analysis
- **Data Analytics**: Real-time data processing
- **Cloud Sync**: Cloud synchronization service
- **Security Module**: Enhanced security features
- **Notification System**: Push notifications

## Custom Modules
Create your own modules by following the module API specification. Contact support for developer documentation.

## Module Updates
Modules automatically check for updates. Enable auto-update in settings for seamless updates.
      `
    },
    android: {
      title: 'Android Support',
      icon: Smartphone,
      content: `
# Android Support

## System Requirements
- Android 8.0 (Oreo) or higher
- 2GB RAM minimum (4GB recommended)
- 100MB free storage
- Internet connection
- Microphone access

## Installation
1. Download the APK from the official website
2. Enable "Install from Unknown Sources"
3. Install the application
4. Grant required permissions

## Permissions
- **Microphone**: For voice recognition
- **Storage**: For caching and updates
- **Internet**: For API calls and updates
- **Display**: For screen control features

## Features on Android
- Full voice recognition support
- Native text-to-speech integration
- Screen brightness control
- Background service for always-on listening
- Widget support
- Notification integration

## Optimization
The app is optimized for battery efficiency:
- Adaptive listening mode
- Low-power background service
- Cached responses
- Efficient API calls

## Troubleshooting
- **Voice not working**: Check microphone permissions
- **App crashes**: Clear cache and restart
- **Slow performance**: Close other apps
- **Update issues**: Check internet connection
      `
    },
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Documentation</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Doc Navigation */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 h-fit">
          <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
          <div className="space-y-2">
            {Object.entries(docs).map(([key, doc]) => {
              const Icon = doc.icon
              return (
                <button
                  key={key}
                  onClick={() => setActiveDoc(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeDoc === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{doc.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Doc Content */}
        <div className="md:col-span-3 bg-white/5 rounded-xl p-8 border border-white/10">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {docs[activeDoc as keyof typeof docs].content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return <h1 key={idx} className="text-3xl font-bold text-white mb-4 mt-8">{line.slice(2)}</h1>
                }
                if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold text-white mb-3 mt-6">{line.slice(3)}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-semibold text-white mb-2 mt-4">{line.slice(4)}</h3>
                }
                if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.*?)\*\*:(.*)/);
                  if (match) {
                    return (
                      <div key={idx} className="ml-4 mb-2">
                        <span className="text-blue-400 font-semibold">{match[1]}</span>
                        <span className="text-gray-300">:{match[2]}</span>
                      </div>
                    )
                  }
                }
                if (line.startsWith('```')) {
                  return null
                }
                if (line.trim() === '') {
                  return <div key={idx} className="h-3"></div>
                }
                return <p key={idx} className="mb-2 text-gray-300">{line}</p>
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-300 text-center text-sm transition-all">
            API Reference
          </a>
          <a href="#" className="px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-300 text-center text-sm transition-all">
            GitHub Repository
          </a>
          <a href="#" className="px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-300 text-center text-sm transition-all">
            Community Forum
          </a>
          <a href="#" className="px-4 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg text-orange-300 text-center text-sm transition-all">
            Support Center
          </a>
        </div>
      </div>
    </div>
  )
}
