'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Play, Square } from 'lucide-react'

export default function VoiceControl() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [voiceCommands, setVoiceCommands] = useState<string[]>([])
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece
          } else {
            interimTranscript += transcriptPiece
          }
        }

        setTranscript(finalTranscript || interimTranscript)

        if (finalTranscript) {
          processVoiceCommand(finalTranscript)
        }
      }
    }
  }, [])

  const processVoiceCommand = (command: string) => {
    setVoiceCommands(prev => [...prev, command].slice(-5))

    const lowerCommand = command.toLowerCase()
    let responseText = ''

    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      responseText = 'Hello! How can I assist you today?'
    } else if (lowerCommand.includes('time')) {
      responseText = `The current time is ${new Date().toLocaleTimeString()}`
    } else if (lowerCommand.includes('date')) {
      responseText = `Today is ${new Date().toLocaleDateString()}`
    } else if (lowerCommand.includes('open')) {
      responseText = 'Opening requested application'
    } else if (lowerCommand.includes('close')) {
      responseText = 'Closing application'
    } else if (lowerCommand.includes('help')) {
      responseText = 'I can help you with voice commands, screen control, and API integration. Try saying "open", "close", "time", or "date".'
    } else {
      responseText = 'Command received. Processing your request.'
    }

    setResponse(responseText)
    speak(responseText)
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
      setTranscript('')
    }
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Voice Recognition & Text-to-Speech</h2>

      {/* Voice Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Mic className="w-6 h-6" />
            Voice Recognition
          </h3>
          <button
            onClick={toggleListening}
            className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-3 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>

          {transcript && (
            <div className="mt-4 p-4 bg-black/30 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Transcript:</p>
              <p className="text-white">{transcript}</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Volume2 className="w-6 h-6" />
            Text-to-Speech
          </h3>
          <button
            onClick={() => isSpeaking ? stopSpeaking() : speak('This is a test of the text to speech system')}
            className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-3 ${
              isSpeaking
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isSpeaking ? <Square className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {isSpeaking ? 'Stop Speaking' : 'Test Speech'}
          </button>

          {response && (
            <div className="mt-4 p-4 bg-black/30 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Response:</p>
              <p className="text-white">{response}</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Commands */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Voice Commands</h3>
        <div className="space-y-2">
          {voiceCommands.length === 0 ? (
            <p className="text-gray-400">No commands yet. Start speaking to see your commands here.</p>
          ) : (
            voiceCommands.map((cmd, idx) => (
              <div key={idx} className="p-3 bg-black/30 rounded-lg text-white">
                {cmd}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Voice Command Examples */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Voice Command Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Hello / Hi - Greeting',
            'What time is it? - Get current time',
            'What date is it? - Get current date',
            'Open [app name] - Open application',
            'Close [app name] - Close application',
            'Help - Get assistance',
          ].map((example, idx) => (
            <div key={idx} className="p-3 bg-black/30 rounded-lg text-gray-300 text-sm">
              {example}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
