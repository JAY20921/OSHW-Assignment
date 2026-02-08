import type { PinConfig } from '../types';

export type LEDStateCallback = (state: boolean) => void;

export class SimulationEngine {
  private isRunning = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private buttonState = false;
  private ledState = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private pinConfig: PinConfig;
  private ledCallback: LEDStateCallback | null = null;
  private animationFrameId: number | null = null;

  constructor(pinConfig: PinConfig) {
    this.pinConfig = pinConfig;
  }

  updatePinConfig(pinConfig: PinConfig): void {
    this.pinConfig = pinConfig;
  }

  async start(code: string): Promise<void> {
    if (this.isRunning) return;

    this.isRunning = true;
    console.log('Simulation started with code:', code);
    
    // Start simulation loop
    this.simulationLoop();
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.ledState = false;
    this.buttonState = false;
    this.updateLED(false);
    console.log('Simulation stopped');
  }

  setButtonState(pressed: boolean): void {
    this.buttonState = pressed;
    console.log('Button state:', pressed ? 'PRESSED (HIGH)' : 'RELEASED (LOW)');
    
    // In logic-level simulation, LED follows button state directly
    if (this.isRunning) {
      this.ledState = pressed;
      this.updateLED(this.ledState);
    }
  }

  onLEDChange(callback: LEDStateCallback): void {
    this.ledCallback = callback;
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }

  private simulationLoop(): void {
    if (!this.isRunning) return;

    // Logic-level simulation: LED state follows button state
    // This simulates the behavior of:
    // int buttonState = digitalRead(BUTTON_PIN);
    // digitalWrite(LED_PIN, buttonState);
    
    this.animationFrameId = requestAnimationFrame(() => {
      this.simulationLoop();
    });
  }

  private updateLED(state: boolean): void {
    if (this.ledCallback) {
      this.ledCallback(state);
    }
  }
}
