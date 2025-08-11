// Social Decoder Bridge - TypeScript to JavaScript Integration
// Connects Trae's TypeScript Social Decoder with existing Velvet system

import SocialDecoder from './social-decoder';
import { useSocialDecoderStore } from './stores/social-decoder-store';

class SocialDecoderBridge {
    private decoder: SocialDecoder | null = null;
    private isInitialized: boolean = false;

    // Initialize the TypeScript Social Decoder and connect to existing systems
    public async initialize(): Promise<boolean> {
        try {
            console.log('🌉 Initializing Social Decoder Bridge...');

            // Create the TypeScript Social Decoder instance
            this.decoder = new SocialDecoder();
            const success = await this.decoder.initialize();

            if (!success) {
                console.error('❌ Failed to initialize Social Decoder');
                return false;
            }

            // Connect to Zustand store
            this.connectToStore();

            // Connect to existing Velvet systems
            this.connectToVelvetSystems();

            // Make it globally available
            window.socialDecoder = this.decoder;

            this.isInitialized = true;
            console.log('✅ Social Decoder Bridge initialized successfully');
            return true;

        } catch (error) {
            console.error('❌ Social Decoder Bridge initialization failed:', error);
            return false;
        }
    }

    // Connect to the Zustand store
    private connectToStore(): void {
        if (!this.decoder) return;

        // Set up detection callback to update store
        this.decoder.onDetection((analysis) => {
            const store = useSocialDecoderStore.getState();
            store.addAnalysis(analysis);
        });
    }

    // Connect to existing Velvet systems
    private connectToVelvetSystems(): void {
        if (!this.decoder) return;

        // Connect to existing screen OCR monitoring
        if (window.screenOCRMonitorReal) {
            console.log('🔗 Connecting to existing Screen OCR system');
            // Bridge existing OCR to new system
            this.bridgeScreenOCR();
        }

        // Connect to existing audio monitoring
        if (window.audioEnvironmentMonitorReal) {
            console.log('🔗 Connecting to existing Audio monitoring system');
            // Bridge existing audio to new system
            this.bridgeAudioMonitoring();
        }

        // Connect to existing AI chat system
        this.connectToAIChat();
    }

    // Bridge existing screen OCR to TypeScript system
    private bridgeScreenOCR(): void {
        // Create a bridge interface for the existing system
        if (!window.realScreenOCRMonitor) {
            window.realScreenOCRMonitor = {
                onTextDetected: (callback: (text: string) => void) => {
                    // Hook into existing OCR system
                    if (window.screenOCRMonitorReal?.currentText) {
                        setInterval(() => {
                            const text = window.screenOCRMonitorReal?.currentText;
                            if (text && text.length > 0) {
                                callback(text);
                            }
                        }, 2000); // Check every 2 seconds
                    }
                }
            };
        }
    }

    // Bridge existing audio monitoring to TypeScript system
    private bridgeAudioMonitoring(): void {
        // Create a bridge interface for the existing system
        if (!window.realAudioEnvironmentMonitor) {
            window.realAudioEnvironmentMonitor = {
                onContextUpdate: (callback: (context: any) => void) => {
                    // Hook into existing audio system
                    if (window.audioEnvironmentMonitorReal?.currentContext) {
                        setInterval(() => {
                            const context = window.audioEnvironmentMonitorReal?.currentContext;
                            if (context) {
                                callback(context);
                            }
                        }, 3000); // Check every 3 seconds
                    }
                },
                onMicrophoneData: (callback: (data: any) => void) => {
                    // Hook into existing microphone monitoring
                    if (window.audioEnvironmentMonitorReal?.microphoneData) {
                        setInterval(() => {
                            const data = window.audioEnvironmentMonitorReal?.microphoneData;
                            if (data) {
                                callback(data);
                            }
                        }, 1000); // Check every second
                    }
                }
            };
        }
    }

    // Connect to existing AI chat system
    private connectToAIChat(): void {
        // Extend existing AI with social decoder insights
        if (window.getVelvetResponse) {
            const originalGetVelvetResponse = window.getVelvetResponse;
            
            // Wrap the AI response function to include social context
            window.getVelvetResponse = async (message: string, options?: any) => {
                // Add social decoder analysis to the context
                const socialContext = this.decoder?.getHistory() || [];
                const enhancedOptions = {
                    ...options,
                    socialContext: socialContext.slice(-5), // Last 5 social analyses
                };
                
                return await originalGetVelvetResponse(message, enhancedOptions);
            };
        }
    }

    // Public methods for JavaScript integration
    public analyzeText(text: string): any {
        return this.decoder?.analyzeTextForSocialCues(text) || null;
    }

    public getMetrics(): any {
        return this.decoder?.getMetrics() || {};
    }

    public getHistory(): any[] {
        return this.decoder?.getHistory() || [];
    }

    public cleanup(): void {
        if (this.decoder) {
            this.decoder.cleanup();
            this.decoder = null;
        }
        this.isInitialized = false;
        console.log('✅ Social Decoder Bridge cleaned up');
    }

    // Check if initialized
    public get initialized(): boolean {
        return this.isInitialized;
    }
}

// Global instance
const socialDecoderBridge = new SocialDecoderBridge();

// Auto-initialize if we're in the browser
if (typeof window !== 'undefined') {
    // Initialize after a short delay to ensure other systems are ready
    setTimeout(() => {
        socialDecoderBridge.initialize();
    }, 2000);
}

// Make it globally available for JavaScript code
if (typeof window !== 'undefined') {
    (window as any).socialDecoderBridge = socialDecoderBridge;
}

export default socialDecoderBridge;