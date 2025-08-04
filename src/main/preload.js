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

  // Executive Dysfunction Emergency Mode APIs
  emergencyMode: {
    getStatus: () => ipcRenderer.invoke('emergency-mode-status'),
    activateSafeSpace: () => ipcRenderer.invoke('emergency-mode-activate-safe-space'),
    test: (testType) => ipcRenderer.invoke('emergency-mode-test', testType),
    
    // Event listeners for crisis interventions
    onCrisisIntervention: (callback) => {
      ipcRenderer.on('crisis-intervention', (event, data) => callback(data));
    },
    onSafeSpaceActivation: (callback) => {
      ipcRenderer.on('safe-space-activation', (event, data) => callback(data));
    },
    onCrisisLevelChange: (callback) => {
      ipcRenderer.on('crisis-level-change', (event, data) => callback(data));
    }
  },

  // NEW: Enhanced Executive Function APIs
  executiveFunction: {
    getStatus: () => ipcRenderer.invoke('executive-function-status'),
    activateSafeSpace: () => ipcRenderer.invoke('executive-function-safe-space'),
    test: (testType) => ipcRenderer.invoke('executive-function-test', testType),
    getTestList: () => ipcRenderer.invoke('executive-function-test-list'),
    
    // Event listeners for enhanced executive function events
    onPatternDetected: (callback) => {
      ipcRenderer.on('executive-pattern-detected', (event, data) => callback(data));
    },
    onInterventionTriggered: (callback) => {
      ipcRenderer.on('executive-intervention-triggered', (event, data) => callback(data));
    },
    onSafeSpaceActivated: (callback) => {
      ipcRenderer.on('executive-safe-space-activated', (event, data) => callback(data));
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
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  
  // Beta testing and production features
  beta: {
    submitFeedback: (feedbackData) => ipcRenderer.invoke('submit-feedback', feedbackData),
    checkPermissions: () => ipcRenderer.invoke('check-permissions'),
    requestPermissions: () => ipcRenderer.invoke('request-permissions'),
    reportError: (errorData) => ipcRenderer.invoke('report-error', errorData),
    getErrorStats: () => ipcRenderer.invoke('get-error-stats'),
    performHealthCheck: () => ipcRenderer.invoke('perform-health-check')
  },

  // ===========================================
  // ENCRYPTED DATABASE API
  // ===========================================
  
  // Database health and system operations
  database: {
    // System operations
    getHealth: () => ipcRenderer.invoke('db:health'),
    getAnalytics: (timeRange) => ipcRenderer.invoke('db:analytics', timeRange),
    getLearningInsights: () => ipcRenderer.invoke('db:learning-insights'),
    // NEW: Simple health check for control panel
    healthCheck: () => ipcRenderer.invoke('db-health-check'),
    getStatus: () => ipcRenderer.invoke('db-status'),
    
    // Social Decoder operations
    social: {
      startSession: (sessionData) => ipcRenderer.invoke('db:social:start-session', sessionData),
      storeAnalysis: (analysisData) => ipcRenderer.invoke('db:social:store-analysis', analysisData),
      getInsights: (sessionId, limit) => ipcRenderer.invoke('db:social:get-insights', sessionId, limit),
      getLearningEffectiveness: () => ipcRenderer.invoke('db:social:learning-effectiveness')
    },
    
    // Executive Dysfunction operations
    executive: {
      storePattern: (patternData) => ipcRenderer.invoke('db:executive:store-pattern', patternData),
      storeIntervention: (interventionData) => ipcRenderer.invoke('db:executive:store-intervention', interventionData),
      storeEnergy: (energyData) => ipcRenderer.invoke('db:executive:store-energy', energyData),
      getPatternHistory: (patternType, limit) => ipcRenderer.invoke('db:executive:pattern-history', patternType, limit),
      getEffectiveInterventions: (interventionType) => ipcRenderer.invoke('db:executive:effective-interventions', interventionType)
    },
    
    // Masking Fatigue operations
    masking: {
      startSession: (sessionData) => ipcRenderer.invoke('db:masking:start-session', sessionData),
      storeAnalysis: (analysisData) => ipcRenderer.invoke('db:masking:store-analysis', analysisData),
      updatePattern: (patternData) => ipcRenderer.invoke('db:masking:update-pattern', patternData),
      getPatterns: (patternType) => ipcRenderer.invoke('db:masking:get-patterns', patternType)
    },
    
    // Cross-feature learning operations
    crossFeature: {
      storeInsight: (insightData) => ipcRenderer.invoke('db:cross:store-insight', insightData),
      updateProgress: (progressData) => ipcRenderer.invoke('db:cross:update-progress', progressData)
    }
  }
});

// API keys are now kept secure in main process only