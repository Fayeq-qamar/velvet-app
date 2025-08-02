// Store Selectors - Performance-optimized hooks for viral feature components
// Provides efficient, selective subscriptions to prevent unnecessary re-renders

import { useVelvetStore } from './velvet-state.js';
import { useMemo } from 'react';

// ===========================================
// PERFORMANCE-OPTIMIZED SELECTORS
// ===========================================

/**
 * High-level system status selectors
 * These provide overview information with minimal re-render triggers
 */

export const useSystemHealth = () => useVelvetStore(
  state => ({
    isHealthy: state.system.activeFeatures.length >= 2 && 
               state.system.performanceMetrics.averageUpdateTime < 100,
    activeFeatureCount: state.system.activeFeatures.length,
    avgUpdateTime: state.system.performanceMetrics.averageUpdateTime,
    lastUpdate: state.system.lastUpdate
  }),
  (a, b) => a.isHealthy === b.isHealthy && a.activeFeatureCount === b.activeFeatureCount
);

export const useFeatureStatus = () => useVelvetStore(
  state => ({
    socialDecoder: state.system.activeFeatures.includes('socialDecoder'),
    executiveDysfunction: state.system.activeFeatures.includes('executiveDysfunction'),
    maskingFatigue: state.system.activeFeatures.includes('maskingFatigue'),
    velvetBrain: state.system.activeFeatures.includes('velvetBrain')
  }),
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
);

// ===========================================
// SOCIAL DECODER SELECTORS
// ===========================================

export const useActiveMeeting = () => useVelvetStore(
  state => state.socialDecoder.isMeetingMode ? {
    isActive: true,
    platform: state.socialDecoder.currentMeeting?.platform,
    duration: state.socialDecoder.meetingContext.duration,
    socialTension: state.socialDecoder.meetingContext.socialTension
  } : { isActive: false },
  (a, b) => a.isActive === b.isActive && a.platform === b.platform
);

export const useCurrentSocialAnalysis = () => useVelvetStore(
  state => state.socialDecoder.currentAnalysis ? {
    hasAnalysis: true,
    type: state.socialDecoder.currentAnalysis.detectionType,
    confidence: state.socialDecoder.currentAnalysis.overallConfidence,
    timestamp: state.socialDecoder.currentAnalysis.timestamp
  } : { hasAnalysis: false },
  (a, b) => a.hasAnalysis === b.hasAnalysis && a.timestamp === b.timestamp
);

export const useSocialIntervention = () => useVelvetStore(
  state => state.socialDecoder.activeIntervention ? {
    hasIntervention: true,
    type: state.socialDecoder.activeIntervention.type,
    priority: state.socialDecoder.activeIntervention.priority,
    uiVisible: state.socialDecoder.uiState.interventionUIVisible
  } : { hasIntervention: false },
  (a, b) => a.hasIntervention === b.hasIntervention && a.uiVisible === b.uiVisible
);

export const useSocialDecoderMetrics = () => useVelvetStore(
  state => ({
    totalDetections: state.socialDecoder.metrics.totalDetections,
    sarcasmDetections: state.socialDecoder.metrics.sarcasmDetections,
    interventions: state.socialDecoder.metrics.interventionsTrigger,
    averageConfidence: state.socialDecoder.metrics.averageConfidence
  }),
  (a, b) => a.totalDetections === b.totalDetections && a.interventions === b.interventions
);

// ===========================================
// EXECUTIVE DYSFUNCTION SELECTORS
// ===========================================

export const useCrisisStatus = () => useVelvetStore(
  state => ({
    level: state.executiveDysfunction.currentCrisisLevel,
    isCrisis: state.executiveDysfunction.currentCrisisLevel !== 'none',
    hasIntervention: !!state.executiveDysfunction.activeIntervention,
    safeSpaceActive: state.executiveDysfunction.safeSpaceActive
  }),
  (a, b) => a.level === b.level && a.safeSpaceActive === b.safeSpaceActive
);

export const useEnergyStatus = () => useVelvetStore(
  state => ({
    level: state.executiveDysfunction.energyLevel,
    uiLevel: state.executiveDysfunction.uiState.currentEnergyLevel,
    isLow: state.executiveDysfunction.energyLevel < 0.3,
    isCritical: state.executiveDysfunction.energyLevel < 0.1
  }),
  (a, b) => Math.abs(a.level - b.level) < 0.1 && a.uiLevel === b.uiLevel
);

export const useExecutiveUI = () => useVelvetStore(
  state => ({
    interventionVisible: state.executiveDysfunction.uiState.interventionOverlayVisible,
    safeSpaceVisible: state.executiveDysfunction.uiState.safeSpaceIndicatorVisible,
    breathingActive: state.executiveDysfunction.uiState.breathingGuideActive,
    celebrationVisible: state.executiveDysfunction.uiState.progressCelebrationVisible
  }),
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
);

export const useDetectedPatterns = () => useVelvetStore(
  state => ({
    count: state.executiveDysfunction.detectedPatterns.length,
    latest: state.executiveDysfunction.detectedPatterns.length > 0 ? 
      state.executiveDysfunction.detectedPatterns[state.executiveDysfunction.detectedPatterns.length - 1] : null,
    types: [...new Set(state.executiveDysfunction.detectedPatterns.map(p => p.type))]
  }),
  (a, b) => a.count === b.count && a.latest?.timestamp === b.latest?.timestamp
);

// ===========================================
// MASKING FATIGUE SELECTORS
// ===========================================

export const useMaskingStatus = () => useVelvetStore(
  state => ({
    level: state.maskingFatigue.currentMaskingLevel,
    isHighMasking: state.maskingFatigue.currentMaskingLevel > 0.7,
    safetyLevel: state.maskingFatigue.safetyLevel,
    isSafeSpace: state.maskingFatigue.safetyLevel > 0.7
  }),
  (a, b) => Math.abs(a.level - b.level) < 0.1 && Math.abs(a.safetyLevel - b.safetyLevel) < 0.1
);

export const useEnergyTracking = () => useVelvetStore(
  state => ({
    currentEnergy: state.maskingFatigue.energyLevel,
    dailySpent: state.maskingFatigue.energyTracking.dailyEnergySpent,
    budget: state.maskingFatigue.energyTracking.energyBudget,
    warningCount: state.maskingFatigue.energyTracking.lowEnergyWarnings.length,
    percentRemaining: ((state.maskingFatigue.energyTracking.energyBudget - state.maskingFatigue.energyTracking.dailyEnergySpent) / state.maskingFatigue.energyTracking.energyBudget) * 100
  }),
  (a, b) => Math.abs(a.currentEnergy - b.currentEnergy) < 0.1 && Math.abs(a.dailySpent - b.dailySpent) < 0.1
);

export const useEnvironmentContext = () => useVelvetStore(
  state => ({
    environment: state.maskingFatigue.contextAwareness.currentEnvironment,
    confidence: state.maskingFatigue.contextAwareness.environmentConfidence,
    timeContext: state.maskingFatigue.contextAwareness.timeOfDay,
    socialLoad: state.maskingFatigue.contextAwareness.socialLoad
  }),
  (a, b) => a.environment === b.environment && a.timeContext === b.timeContext
);

export const useCommunicationPatterns = () => useVelvetStore(
  state => ({
    formalityLevel: state.maskingFatigue.communicationPatterns.formalLanguage.currentLevel,
    emotionalLevel: state.maskingFatigue.communicationPatterns.emotionalExpression.currentLevel,
    energyTension: state.maskingFatigue.communicationPatterns.energySignature.currentTension,
    responseLatency: state.maskingFatigue.communicationPatterns.responseLatency.currentAverage
  }),
  (a, b) => Math.abs(a.formalityLevel - b.formalityLevel) < 0.1 && Math.abs(a.emotionalLevel - b.emotionalLevel) < 0.1
);

export const useUnmaskingOpportunity = () => useVelvetStore(
  state => ({
    hasOpportunity: state.maskingFatigue.safeSpaceDetection.recoveryOpportunities.length > 0,
    latest: state.maskingFatigue.safeSpaceDetection.lastUnmaskingPrompt,
    opportunityCount: state.maskingFatigue.safeSpaceDetection.recoveryOpportunities.length
  }),
  (a, b) => a.opportunityCount === b.opportunityCount && a.latest?.timestamp === b.latest?.timestamp
);

// ===========================================
// VELVET BRAIN SELECTORS
// ===========================================

export const useConsciousnessStatus = () => useVelvetStore(
  state => ({
    level: state.velvetBrain.consciousnessLevel,
    isConscious: state.velvetBrain.consciousnessLevel > 0.7,
    isActive: state.velvetBrain.isActive,
    currentStage: state.velvetBrain.currentThoughtCycle.stage
  }),
  (a, b) => Math.abs(a.level - b.level) < 0.1 && a.currentStage === b.currentStage
);

export const useThoughtCycleStatus = () => useVelvetStore(
  state => ({
    cycleNumber: state.velvetBrain.currentThoughtCycle.cycleNumber,
    stage: state.velvetBrain.currentThoughtCycle.stage,
    isThinking: state.velvetBrain.currentThoughtCycle.stage !== 'idle',
    hasContext: !!state.velvetBrain.currentThoughtCycle.context
  }),
  (a, b) => a.cycleNumber === b.cycleNumber && a.stage === b.stage
);

export const useBrainSubsystems = () => useVelvetStore(
  state => ({
    sensoryInput: state.velvetBrain.subsystems.sensoryInput.connected,
    memory: state.velvetBrain.subsystems.memory.connected,
    personality: state.velvetBrain.subsystems.personality.connected,
    actionDecider: state.velvetBrain.subsystems.actionDecider.connected,
    allConnected: Object.values(state.velvetBrain.subsystems).every(s => s.connected)
  }),
  (a, b) => a.allConnected === b.allConnected
);

export const useBrainPerformance = () => useVelvetStore(
  state => ({
    thoughtCycles: state.velvetBrain.metrics.thoughtCycles,
    learningAccuracy: state.velvetBrain.metrics.learningAccuracy,
    averageThinkingTime: state.velvetBrain.metrics.averageThinkingTime,
    successfulPredictions: state.velvetBrain.metrics.successfulPredictions
  }),
  (a, b) => a.thoughtCycles === b.thoughtCycles && Math.abs(a.learningAccuracy - b.learningAccuracy) < 0.01
);

// ===========================================
// USER CONTEXT SELECTORS
// ===========================================

export const useCurrentEnvironment = () => useVelvetStore(
  state => ({
    type: state.userContext.environment.type,
    confidence: state.userContext.environment.confidence,
    isKnown: state.userContext.environment.type !== 'unknown'
  }),
  (a, b) => a.type === b.type && Math.abs(a.confidence - b.confidence) < 0.1
);

export const useCurrentApplication = () => useVelvetStore(
  state => ({
    name: state.userContext.application.name,
    category: state.userContext.application.category,
    isKnown: state.userContext.application.category !== 'unknown'
  }),
  (a, b) => a.name === b.name && a.category === b.category
);

export const useScreenContext = () => useVelvetStore(
  state => ({
    hasText: state.userContext.screen.currentText.length > 0,
    textLength: state.userContext.screen.currentText.length,
    ocrConfidence: state.userContext.screen.ocrConfidence,
    activeWindow: state.userContext.screen.activeWindow,
    lastUpdate: state.userContext.screen.lastUpdate
  }),
  (a, b) => Math.abs(a.textLength - b.textLength) < 100 && a.activeWindow === b.activeWindow
);

export const useAudioContext = () => useVelvetStore(
  state => ({
    type: state.userContext.audio.primaryType,
    source: state.userContext.audio.source,
    confidence: state.userContext.audio.confidence,
    hasAudio: state.userContext.audio.primaryType !== 'unknown'
  }),
  (a, b) => a.type === b.type && a.source === b.source
);

export const useBehaviorContext = () => useVelvetStore(
  state => ({
    activity: state.userContext.behavior.currentActivity,
    focusState: state.userContext.behavior.focusState,
    patternCount: state.userContext.behavior.patterns.length,
    lastInteraction: state.userContext.behavior.lastInteraction
  }),
  (a, b) => a.activity === b.activity && a.focusState === b.focusState
);

// ===========================================
// CROSS-FEATURE COORDINATION SELECTORS
// ===========================================

export const useCoordinationStatus = () => useVelvetStore(
  state => ({
    activePriorities: state.coordination.activePriorities,
    activeInteractions: Object.keys(state.coordination.interactions).filter(
      key => state.coordination.interactions[key].active
    ),
    activeInterventions: state.coordination.unifiedInterventions.active.length,
    insights: state.coordination.insights.patterns.length
  }),
  (a, b) => JSON.stringify(a.activePriorities) === JSON.stringify(b.activePriorities) && 
            a.activeInterventions === b.activeInterventions
);

export const useActiveInterventions = () => useVelvetStore(
  state => ({
    all: state.coordination.unifiedInterventions.active,
    count: state.coordination.unifiedInterventions.active.length,
    highPriority: state.coordination.unifiedInterventions.active.filter(i => i.priority === 'critical' || i.priority === 'high'),
    latest: state.coordination.unifiedInterventions.active.length > 0 ? 
      state.coordination.unifiedInterventions.active[state.coordination.unifiedInterventions.active.length - 1] : null
  }),
  (a, b) => a.count === b.count && a.latest?.timestamp === b.latest?.timestamp
);

export const useCrossFeatureInsights = () => useVelvetStore(
  state => ({
    patterns: state.coordination.insights.patterns,
    correlations: state.coordination.insights.correlations,
    predictions: state.coordination.insights.predictions,
    totalInsights: state.coordination.insights.patterns.length + 
                   state.coordination.insights.correlations.length + 
                   state.coordination.insights.predictions.length
  }),
  (a, b) => a.totalInsights === b.totalInsights
);

// ===========================================
// COMPOSITE SELECTORS
// ===========================================

/**
 * High-level composite selectors that combine data from multiple features
 * These are useful for complex UI components that need data from multiple sources
 */

export const useOverallWellbeingStatus = () => useVelvetStore(
  state => {
    const crisisLevel = state.executiveDysfunction.currentCrisisLevel;
    const energyLevel = state.executiveDysfunction.energyLevel;
    const maskingLevel = state.maskingFatigue.currentMaskingLevel;
    const safetyLevel = state.maskingFatigue.safetyLevel;
    
    let status = 'good';
    let concerns = [];
    
    if (crisisLevel === 'crisis') {
      status = 'critical';
      concerns.push('Executive dysfunction crisis');
    } else if (energyLevel < 0.2) {
      status = 'poor';
      concerns.push('Very low energy');
    } else if (maskingLevel > 0.8 && safetyLevel < 0.3) {
      status = 'concerning';
      concerns.push('High masking in unsafe environment');
    } else if (energyLevel < 0.4 || maskingLevel > 0.7) {
      status = 'fair';
      if (energyLevel < 0.4) concerns.push('Low energy');
      if (maskingLevel > 0.7) concerns.push('High masking');
    }
    
    return {
      status,
      concerns,
      needsAttention: status === 'critical' || status === 'poor',
      energyLevel,
      maskingLevel,
      safetyLevel,
      crisisLevel
    };
  },
  (a, b) => a.status === b.status && a.concerns.length === b.concerns.length
);

export const useCurrentUserNeed = () => useVelvetStore(
  state => {
    const crisisLevel = state.executiveDysfunction.currentCrisisLevel;
    const maskingLevel = state.maskingFatigue.currentMaskingLevel;
    const socialActive = state.socialDecoder.isMeetingMode;
    const energyLevel = state.executiveDysfunction.energyLevel;
    const safetyLevel = state.maskingFatigue.safetyLevel;
    
    // Priority order: Crisis > Energy > Social + Masking > Social > Masking > General
    if (crisisLevel === 'crisis') {
      return {
        primary: 'emergency_support',
        priority: 'critical',
        description: 'Executive dysfunction crisis detected',
        recommendedAction: 'immediate_intervention'
      };
    }
    
    if (energyLevel < 0.2) {
      return {
        primary: 'energy_recovery',
        priority: 'high',
        description: 'Critical energy depletion',
        recommendedAction: 'rest_and_recovery'
      };
    }
    
    if (socialActive && maskingLevel > 0.8) {
      return {
        primary: 'social_masking_support',
        priority: 'high',
        description: 'High masking during social interaction',
        recommendedAction: 'authenticity_guidance'
      };
    }
    
    if (socialActive) {
      return {
        primary: 'communication_support',
        priority: 'medium',
        description: 'Active social interaction',
        recommendedAction: 'social_assistance'
      };
    }
    
    if (maskingLevel > 0.7 && safetyLevel > 0.7) {
      return {
        primary: 'unmasking_opportunity',
        priority: 'medium',
        description: 'Safe space for authentic expression',
        recommendedAction: 'gentle_unmasking_prompt'
      };
    }
    
    if (maskingLevel > 0.6) {
      return {
        primary: 'authenticity_support',
        priority: 'low',
        description: 'Moderate masking detected',
        recommendedAction: 'masking_awareness'
      };
    }
    
    return {
      primary: 'general_wellness',
      priority: 'low',
      description: 'Overall wellness monitoring',
      recommendedAction: 'continue_monitoring'
    };
  },
  (a, b) => a.primary === b.primary && a.priority === b.priority
);

export const useOptimalIntervention = () => useVelvetStore(
  state => {
    const activeInterventions = [
      state.socialDecoder.activeIntervention && { source: 'social', intervention: state.socialDecoder.activeIntervention },
      state.executiveDysfunction.activeIntervention && { source: 'executive', intervention: state.executiveDysfunction.activeIntervention },
      ...state.coordination.unifiedInterventions.active.map(i => ({ source: 'unified', intervention: i }))
    ].filter(Boolean);
    
    if (activeInterventions.length === 0) return null;
    
    // Priority: Crisis > Unified > Social > General
    const crisisIntervention = activeInterventions.find(i => 
      i.intervention.priority === 'critical' || 
      (i.source === 'executive' && state.executiveDysfunction.currentCrisisLevel === 'crisis')
    );
    
    if (crisisIntervention) {
      return {
        ...crisisIntervention,
        priority: 'critical',
        shouldShow: true
      };
    }
    
    const unifiedIntervention = activeInterventions.find(i => i.source === 'unified');
    if (unifiedIntervention) {
      return {
        ...unifiedIntervention,
        priority: 'high',
        shouldShow: true
      };
    }
    
    return {
      ...activeInterventions[0],
      priority: 'medium',
      shouldShow: true
    };
  },
  (a, b) => a?.intervention?.timestamp === b?.intervention?.timestamp
);

// ===========================================
// MEMOIZED COMPLEX SELECTORS
// ===========================================

/**
 * Custom hook for memoized complex computations
 */
export const useFeatureCoordinationMatrix = () => {
  const socialState = useSocialDecoderState();
  const executiveState = useExecutiveDysfunctionState();
  const maskingState = useMaskingFatigueState();
  const brainState = useVelvetBrainState();
  
  return useMemo(() => {
    const matrix = {
      social_masking: {
        active: socialState.isMeetingMode && maskingState.currentMaskingLevel > 0.6,
        intensity: socialState.isMeetingMode ? maskingState.currentMaskingLevel : 0,
        recommendation: socialState.isMeetingMode && maskingState.currentMaskingLevel > 0.8 ? 'high_priority' : 'monitor'
      },
      executive_energy: {
        active: executiveState.currentCrisisLevel !== 'none' || executiveState.energyLevel < 0.4,
        intensity: executiveState.currentCrisisLevel === 'crisis' ? 1.0 : (1 - executiveState.energyLevel),
        recommendation: executiveState.currentCrisisLevel === 'crisis' ? 'immediate_action' : 'energy_management'
      },
      brain_oversight: {
        active: brainState.isActive && brainState.consciousnessLevel > 0.5,
        intensity: brainState.consciousnessLevel,
        recommendation: brainState.consciousnessLevel > 0.8 ? 'full_coordination' : 'basic_coordination'
      }
    };
    
    return matrix;
  }, [
    socialState.isMeetingMode,
    maskingState.currentMaskingLevel,
    executiveState.currentCrisisLevel,
    executiveState.energyLevel,
    brainState.isActive,
    brainState.consciousnessLevel
  ]);
};

console.log('🎯 Store Selectors loaded - optimized hooks for viral features');