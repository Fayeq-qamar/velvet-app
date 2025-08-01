import { useConsciousnessStore, BrainContext, DetectedPattern, UserState } from '../stores/consciousness-store';

export class ConsciousnessEngine {
  private store: any;
  private processingInterval: NodeJS.Timeout | null = null;
  private patternHistory: DetectedPattern[] = [];
  private maxPatternHistory = 100;
  
  // Learning parameters
  private learningMetrics = {
    averageOCRConfidence: 0.5,
    screenTextComplexity: 0,
    userInteractionFrequency: 0,
    focusSessionDuration: 0,
    lastUserInteraction: Date.now(),
  };

  constructor() {
    // Get the store instance
    this.store = useConsciousnessStore.getState();
    
    // Subscribe to store changes
    useConsciousnessStore.subscribe(
      (state) => state.brainContext,
      (brainContext) => this.processBrainContext(brainContext),
      { fireImmediately: true }
    );

    // Start continuous processing
    this.startProcessing();
  }

  private startProcessing() {
    // Process consciousness state every 2 seconds
    this.processingInterval = setInterval(() => {
      this.processConsciousnessState();
    }, 2000);
  }

  private async processBrainContext(brainContext: BrainContext) {
    console.log('🧠 CONSCIOUSNESS ENGINE: Processing brain context update');
    
    // Update learning metrics
    this.updateLearningMetrics(brainContext);
    
    // Analyze patterns
    const newPatterns = this.analyzeAdvancedPatterns(brainContext);
    this.addPatternsToHistory(newPatterns);
    
    // Update user state based on analysis
    const newUserState = this.analyzeUserState(brainContext, newPatterns);
    this.store.updateUserState(newUserState);
    
    // Determine consciousness level
    const consciousnessLevel = this.calculateConsciousnessLevel();
    this.store.setConsciousnessLevel(consciousnessLevel);
    
    // Check for interventions
    this.checkInterventions(newPatterns);
  }

  private updateLearningMetrics(brainContext: BrainContext) {
    // Update average OCR confidence with exponential moving average
    this.learningMetrics.averageOCRConfidence = 
      this.learningMetrics.averageOCRConfidence * 0.9 + brainContext.ocrConfidence * 0.1;
    
    // Calculate screen text complexity (variety of words, special characters, etc.)
    const textComplexity = this.calculateTextComplexity(brainContext.screenText);
    this.learningMetrics.screenTextComplexity = 
      this.learningMetrics.screenTextComplexity * 0.9 + textComplexity * 0.1;
  }

  private calculateTextComplexity(text: string): number {
    if (!text || text.length === 0) return 0;
    
    const words = text.split(/\s+/);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    const specialCharRatio = (text.match(/[^a-zA-Z0-9\s]/g) || []).length / text.length;
    
    // Normalize complexity score between 0 and 1
    const complexity = Math.min(1, 
      (uniqueWords.size / words.length) * 0.4 + 
      (avgWordLength / 10) * 0.3 + 
      specialCharRatio * 0.3
    );
    
    return complexity;
  }

  private analyzeAdvancedPatterns(brainContext: BrainContext): DetectedPattern[] {
    const patterns: DetectedPattern[] = [];
    const now = Date.now();
    
    // 1. Hyperfocus detection based on consistent high-confidence OCR
    if (this.detectHyperfocus(brainContext)) {
      patterns.push({
        type: 'hyperfocus',
        confidence: 0.8,
        duration: this.calculateFocusDuration(),
        context: `Sustained high-confidence reading: ${brainContext.screenText.substring(0, 50)}...`,
        timestamp: now
      });
    }
    
    // 2. Distraction detection based on rapid text changes or low confidence
    if (this.detectDistraction(brainContext)) {
      patterns.push({
        type: 'distraction',
        confidence: 0.7,
        duration: now - this.learningMetrics.lastUserInteraction,
        context: `Rapid context changes or unclear screen`,
        timestamp: now
      });
    }
    
    // 3. Task avoidance detection (pattern of starting/stopping same apps)
    if (this.detectTaskAvoidance(brainContext)) {
      patterns.push({
        type: 'task_avoidance',
        confidence: 0.6,
        duration: this.calculateAvoidanceDuration(),
        context: `Repetitive app switching or document opening/closing`,
        timestamp: now
      });
    }
    
    // 4. Idle state detection
    if (this.detectIdleState(brainContext)) {
      patterns.push({
        type: 'idle',
        confidence: 0.9,
        duration: now - brainContext.timestamp,
        context: `No significant screen activity`,
        timestamp: now
      });
    }
    
    return patterns;
  }

  private detectHyperfocus(brainContext: BrainContext): boolean {
    // Look for sustained high OCR confidence (reading/working)
    const recentPatterns = this.patternHistory.slice(-10);
    const highConfidenceCount = recentPatterns.filter(p => 
      brainContext.ocrConfidence > 0.7 && brainContext.screenText.length > 500
    ).length;
    
    return highConfidenceCount >= 7; // 70% of recent samples show focus
  }

  private detectDistraction(brainContext: BrainContext): boolean {
    // Look for low OCR confidence or rapidly changing text
    if (brainContext.ocrConfidence < 0.3) return true;
    
    // Check if screen content is changing rapidly (possible tab switching)
    const recentPatterns = this.patternHistory.slice(-5);
    if (recentPatterns.length >= 3) {
      const contentChanges = recentPatterns.reduce((changes, pattern, index) => {
        if (index === 0) return 0;
        const prevText = recentPatterns[index - 1].context;
        const similarity = this.calculateTextSimilarity(pattern.context, prevText);
        return changes + (similarity < 0.3 ? 1 : 0);
      }, 0);
      
      return contentChanges >= 3; // 3+ rapid content changes
    }
    
    return false;
  }

  private detectTaskAvoidance(brainContext: BrainContext): boolean {
    // This would need integration with window/app tracking
    // For now, detect based on text patterns that suggest procrastination
    const avoidanceKeywords = [
      'youtube', 'netflix', 'social', 'reddit', 'twitter', 'instagram',
      'game', 'meme', 'funny', 'entertainment'
    ];
    
    const textLower = brainContext.screenText.toLowerCase();
    return avoidanceKeywords.some(keyword => textLower.includes(keyword));
  }

  private detectIdleState(brainContext: BrainContext): boolean {
    // Detect when screen hasn't changed for a while
    const timeSinceUpdate = Date.now() - brainContext.timestamp;
    return timeSinceUpdate > 30000; // 30 seconds of no updates
  }

  private calculateTextSimilarity(text1: string, text2: string): number {
    // Simple similarity calculation using word overlap
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  private calculateFocusDuration(): number {
    const focusPatterns = this.patternHistory.filter(p => p.type === 'hyperfocus');
    if (focusPatterns.length === 0) return 0;
    
    return Date.now() - focusPatterns[0].timestamp;
  }

  private calculateAvoidanceDuration(): number {
    const avoidancePatterns = this.patternHistory.filter(p => p.type === 'task_avoidance');
    if (avoidancePatterns.length === 0) return 0;
    
    return Date.now() - avoidancePatterns[0].timestamp;
  }

  private addPatternsToHistory(patterns: DetectedPattern[]) {
    this.patternHistory.push(...patterns);
    
    // Keep history manageable
    if (this.patternHistory.length > this.maxPatternHistory) {
      this.patternHistory = this.patternHistory.slice(-this.maxPatternHistory);
    }
  }

  private analyzeUserState(brainContext: BrainContext, patterns: DetectedPattern[]): Partial<UserState> {
    const newState: Partial<UserState> = {};
    
    // Determine focus state
    if (patterns.some(p => p.type === 'hyperfocus')) {
      newState.focusState = 'hyperfocus';
    } else if (patterns.some(p => p.type === 'distraction')) {
      newState.focusState = 'distracted';
    } else if (patterns.some(p => p.type === 'idle')) {
      newState.focusState = 'idle';
    } else if (brainContext.ocrConfidence > 0.6) {
      newState.focusState = 'focused';
    }
    
    // Determine energy level based on activity patterns
    const activityLevel = this.calculateActivityLevel(patterns);
    if (activityLevel > 0.7) {
      newState.energyLevel = 'high';
    } else if (activityLevel > 0.3) {
      newState.energyLevel = 'medium';
    } else {
      newState.energyLevel = 'low';
    }
    
    // Determine emotional state (basic heuristics)
    if (patterns.some(p => p.type === 'task_avoidance')) {
      newState.emotionalState = 'anxious';
    } else if (newState.focusState === 'hyperfocus') {
      newState.emotionalState = 'excited';
    } else {
      newState.emotionalState = 'calm';
    }
    
    return newState;
  }

  private calculateActivityLevel(patterns: DetectedPattern[]): number {
    // Calculate activity based on pattern frequency and diversity
    const recentPatterns = patterns.filter(p => 
      Date.now() - p.timestamp < 60000 // Last minute
    );
    
    return Math.min(1, recentPatterns.length / 10); // Normalize to 0-1
  }

  private calculateConsciousnessLevel(): 'minimal' | 'aware' | 'conscious' | 'transcendent' {
    const streamStatus = this.store.streamStatus;
    const avgConfidence = this.learningMetrics.averageOCRConfidence;
    const patternCount = this.patternHistory.slice(-20).length; // Recent patterns
    
    if (!streamStatus.connected) {
      return 'minimal';
    }
    
    if (avgConfidence > 0.8 && patternCount > 15) {
      return 'transcendent'; // High confidence + rich pattern detection
    } else if (avgConfidence > 0.6 && patternCount > 10) {
      return 'conscious'; // Good confidence + moderate patterns
    } else if (streamStatus.activeStreams.length > 0) {
      return 'aware'; // Connected but limited data
    }
    
    return 'minimal';
  }

  private checkInterventions(patterns: DetectedPattern[]) {
    // Gentle intervention logic based on Velvet's philosophy
    for (const pattern of patterns) {
      switch (pattern.type) {
        case 'hyperfocus':
          if (pattern.duration > 45 * 60 * 1000) { // 45 minutes
            this.suggestGentleBreak(pattern);
          }
          break;
          
        case 'distraction':
          if (pattern.confidence > 0.7) {
            this.suggestFocusAid(pattern);
          }
          break;
          
        case 'task_avoidance':
          if (pattern.duration > 10 * 60 * 1000) { // 10 minutes
            this.suggestTaskBreakdown(pattern);
          }
          break;
          
        case 'idle':
          if (pattern.duration > 30 * 60 * 1000) { // 30 minutes
            this.suggestGentle Nudge(pattern);
          }
          break;
      }
    }
  }

  private suggestGentleBreak(pattern: DetectedPattern) {
    console.log('🧠 INTERVENTION: Gentle break suggestion', {
      type: 'break',
      reason: 'sustained_focus',
      duration: pattern.duration,
      suggestion: 'Take a moment to breathe and stretch - you\'ve been focused for a while'
    });
  }

  private suggestFocusAid(pattern: DetectedPattern) {
    console.log('🧠 INTERVENTION: Focus aid suggestion', {
      type: 'focus_aid',
      reason: 'distraction_detected',
      suggestion: 'I notice some scattered attention - would you like help organizing your thoughts?'
    });
  }

  private suggestTaskBreakdown(pattern: DetectedPattern) {
    console.log('🧠 INTERVENTION: Task breakdown suggestion', {
      type: 'task_breakdown',
      reason: 'avoidance_pattern',
      suggestion: 'That task feeling big? Let\'s break it into tiny steps together'
    });
  }

  private suggestGentleNudge(pattern: DetectedPattern) {
    console.log('🧠 INTERVENTION: Gentle nudge', {
      type: 'gentle_nudge',
      reason: 'extended_idle',
      suggestion: 'Just checking in - how are you feeling right now?'
    });
  }

  private processConsciousnessState() {
    // Continuous processing of consciousness state
    const state = this.store;
    
    // Update metrics
    this.learningMetrics.userInteractionFrequency = this.calculateInteractionFrequency();
    
    // Emit consciousness insights for debugging
    console.log('🧠 CONSCIOUSNESS STATE:', {
      level: state.consciousnessLevel,
      patterns: this.patternHistory.slice(-5),
      metrics: this.learningMetrics,
      userState: state.userState
    });
  }

  private calculateInteractionFrequency(): number {
    // Calculate how frequently user interacts based on screen changes
    const recentChanges = this.patternHistory.filter(p => 
      Date.now() - p.timestamp < 300000 // Last 5 minutes
    ).length;
    
    return recentChanges / 5; // Changes per minute
  }

  public getConsciousnessInsights() {
    return {
      level: this.store.consciousnessLevel,
      recentPatterns: this.patternHistory.slice(-10),
      learningMetrics: this.learningMetrics,
      suggestions: this.generateSuggestions()
    };
  }

  private generateSuggestions(): string[] {
    const suggestions: string[] = [];
    const userState = this.store.userState;
    
    if (userState.focusState === 'distracted') {
      suggestions.push('Try the Pomodoro technique - 25 minutes focused work, 5 minute break');
    }
    
    if (userState.energyLevel === 'low') {
      suggestions.push('Consider taking a short walk or doing some breathing exercises');
    }
    
    if (this.patternHistory.some(p => p.type === 'task_avoidance')) {
      suggestions.push('Break your current task into smaller, 2-minute chunks');
    }
    
    return suggestions;
  }

  public destroy() {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
  }
}

// Export singleton instance
export const consciousnessEngine = new ConsciousnessEngine();