const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  transcribeAudio: (base64Audio) => ipcRenderer.invoke('transcribe-audio', base64Audio),
  chatCompletion: (messages) => ipcRenderer.invoke('chat-completion', messages),
  setClickThrough: (ignore) => ipcRenderer.invoke('set-click-through', ignore),
  elevenLabsTTS: (text) => ipcRenderer.invoke('elevenlabs-tts', text),
  checkAudioPlaying: () => ipcRenderer.invoke('check-audio-playing'),
  getSystemVolume: () => ipcRenderer.invoke('get-system-volume'),
  startAmbientListening: () => ipcRenderer.invoke('start-ambient-listening'),
  stopAmbientListening: () => ipcRenderer.invoke('stop-ambient-listening'),
  
  // NEW: Brain context streaming APIs
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  on: (channel, callback) => ipcRenderer.on(channel, callback),
  
  // Neurodivergent accessibility and privacy features
  detectScreenSharing: () => ipcRenderer.invoke('detect-screen-sharing'),
  setPrivacyMode: (enabled) => ipcRenderer.invoke('set-privacy-mode', enabled),
  
  // Screen Intelligence APIs
  screenIntelligence: {
    start: () => ipcRenderer.invoke('screen-intelligence-start'),
    stop: () => ipcRenderer.invoke('screen-intelligence-stop'),
    getStats: () => ipcRenderer.invoke('screen-intelligence-stats'),
    
    // Event listeners for patterns
    onPatternDetected: (callback) => {
      ipcRenderer.on('pattern-detected', (event, pattern) => callback(pattern));
    },
    onWindowChanged: (callback) => {
      ipcRenderer.on('window-changed', (event, window) => callback(window));
    }
  },

  // Checklist window controls
  checklist: {
    show: (taskData) => ipcRenderer.invoke('checklist-show', taskData),
    hide: () => ipcRenderer.invoke('checklist-hide'),
    update: (taskData) => ipcRenderer.invoke('checklist-update', taskData),
    close: () => ipcRenderer.invoke('checklist-close'),
    
    // Listen for task data updates
    onTaskData: (callback) => {
      ipcRenderer.on('task-data', (event, taskData) => callback(taskData));
    }
  },

  // Pattern detection event listeners
  onPatternDetected: (callback) => {
    ipcRenderer.on('pattern-detected', (event, pattern) => callback(pattern));
  },

  // Real Task Management System
  taskManager: {
    create: (goal, steps) => ipcRenderer.invoke('task-create', goal, steps),
    activate: (taskId) => ipcRenderer.invoke('task-activate', taskId),
    completeStep: (taskId, stepId) => ipcRenderer.invoke('task-complete-step', taskId, stepId),
    getCurrent: () => ipcRenderer.invoke('task-get-current'),
    getAll: () => ipcRenderer.invoke('task-get-all'),
    delete: (taskId) => ipcRenderer.invoke('task-delete', taskId)
  },

  // Privacy & Stealth Features
  privacy: {
    setClickThrough: (enabled) => ipcRenderer.invoke('set-click-through', enabled),
    detectScreenSharing: () => ipcRenderer.invoke('detect-screen-sharing'),
    setPrivacyMode: (level) => ipcRenderer.invoke('set-privacy-mode', level),
    getPrivacyStatus: () => ipcRenderer.invoke('get-privacy-status'),
    onPrivacyAutoEnabled: (callback) => {
      ipcRenderer.on('privacy-auto-enabled', (event, data) => callback(data));
    }
  },

  // Meeting Assistant window controls
  meetingAssistant: {
    show: (meetingData) => ipcRenderer.invoke('meeting-assistant-show', meetingData),
    hide: () => ipcRenderer.invoke('meeting-assistant-hide'),
    expand: (dimensions) => ipcRenderer.invoke('meeting-assistant-expand', dimensions),
    autoResize: (contentData) => ipcRenderer.invoke('meeting-assistant-auto-resize', contentData),
    update: (meetingData) => ipcRenderer.invoke('meeting-assistant-update', meetingData),
    close: () => ipcRenderer.invoke('meeting-assistant-close'),
    
    // Real-time transcription controls
    startTranscription: () => ipcRenderer.invoke('start-meeting-transcription'),
    stopTranscription: () => ipcRenderer.invoke('stop-meeting-transcription'),
    processAudio: (audioData) => ipcRenderer.invoke('process-meeting-audio', audioData),
    
    // Listen for meeting data updates
    onMeetingData: (callback) => {
      ipcRenderer.on('meeting-data', (event, meetingData) => callback(meetingData));
    },
    
    // Listen for real-time transcription updates
    onNewTranscription: (callback) => {
      ipcRenderer.on('new-transcription', (event, data) => callback(data));
    },
    
    // Listen for AI-generated insights
    onMeetingInsights: (callback) => {
      ipcRenderer.on('meeting-insights', (event, insights) => callback(insights));
    },
    
    // Listen for audio chunk requests
    onAudioChunkRequest: (callback) => {
      ipcRenderer.on('request-audio-chunk', (event) => callback());
    },
    
    // Export and sharing functionality
    exportNotes: (meetingData) => ipcRenderer.invoke('export-meeting-notes', meetingData),
    generateSummary: (meetingData) => ipcRenderer.invoke('generate-meeting-summary', meetingData),
    createShareableLink: (meetingData) => ipcRenderer.invoke('create-shareable-link', meetingData),
    
    // Real-time coaching functionality
    analyzeConversation: (transcriptionData) => ipcRenderer.invoke('analyze-conversation-context', transcriptionData),
    getResponseSuggestions: (questionData) => ipcRenderer.invoke('get-response-suggestions', questionData),
    analyzeScreenContext: () => ipcRenderer.invoke('analyze-screen-context'),
    
    // Listen for coaching updates
    onCoachingSuggestion: (callback) => {
      ipcRenderer.on('coaching-suggestion', (event, suggestion) => callback(suggestion));
    },
    onQuestionDetected: (callback) => {
      ipcRenderer.on('question-detected', (event, questionData) => callback(questionData));
    }
  },

  // Control Panel window controls
  controlPanel: {
    show: () => ipcRenderer.invoke('control-panel-show'),
    hide: () => ipcRenderer.invoke('control-panel-hide'),
    close: () => ipcRenderer.invoke('control-panel-close')
  },

  // PHASE 2: Real Audio Environment Monitoring
  audioEnvironment: {
    getSystemAudioDevices: () => ipcRenderer.invoke('get-system-audio-devices'),
    captureSystemAudio: (options) => ipcRenderer.invoke('capture-system-audio', options),
    getCurrentAudioContext: () => ipcRenderer.invoke('get-current-audio-context')
  },

  // DESKTOP CAPTURER API - Screen capture for OCR (bypasses stealth mode)
  desktopCapturer: {
    getSources: (options) => ipcRenderer.invoke('get-desktop-sources', options),
    captureScreenForOCR: (sourceId) => ipcRenderer.invoke('capture-screen-for-ocr', sourceId)
  },

  // General invoke method for flexibility
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
});

// API keys are now kept secure in main process only