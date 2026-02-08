import type { PinConfig } from '../types';
import { AVAILABLE_PINS } from '../types';

export class PinValidator {
  static isValidPin(pin: number): boolean {
    return AVAILABLE_PINS.includes(pin);
  }

  static canAssignPin(
    pin: number,
    componentType: 'led' | 'button',
    currentConfig: PinConfig
  ): boolean {
    // Check if pin is in valid range
    if (!this.isValidPin(pin)) return false;

    // Check if pin is already occupied by other component
    if (componentType === 'led' && pin === currentConfig.button) return false;
    if (componentType === 'button' && pin === currentConfig.led) return false;

    return true;
  }

  static getAvailablePins(
    componentType: 'led' | 'button',
    currentConfig: PinConfig
  ): number[] {
    return AVAILABLE_PINS.filter(pin =>
      this.canAssignPin(pin, componentType, currentConfig)
    );
  }
}
