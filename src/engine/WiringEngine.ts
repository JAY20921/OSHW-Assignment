import type { PinConfig } from '../types';
import { PinValidator } from '../utils/pinValidator';

export class WiringEngine {
  private pinConfig: PinConfig;

  constructor() {
    this.pinConfig = {
      led: 10,
      button: 2
    };
  }

  getPinConfig(): PinConfig {
    return { ...this.pinConfig };
  }

  setPinConfig(config: PinConfig): void {
    this.pinConfig = { ...config };
  }

  updatePin(componentType: 'led' | 'button', newPin: number): boolean {
    if (!PinValidator.canAssignPin(newPin, componentType, this.pinConfig)) {
      return false;
    }

    this.pinConfig[componentType] = newPin;
    return true;
  }


  getAvailablePinsFor(componentType: 'led' | 'button'): number[] {
    return PinValidator.getAvailablePins(componentType, this.pinConfig);
  }
}
