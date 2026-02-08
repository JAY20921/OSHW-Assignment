export interface Position {
  x: number;
  y: number;
}

export type ComponentType = 
  // Microcontrollers
  | 'arduino-uno' | 'arduino-mega' | 'arduino-nano' | 'esp32' | 'pi-pico'
  // LEDs
  | 'led-red' | 'led-green' | 'led-blue' | 'led-yellow' | 'led-white' | 'rgb-led'
  // Inputs
  | 'pushbutton' | 'slide-switch' | 'dip-switch-8' | 'potentiometer'
  // Displays
  | 'lcd1602' | '7segment' | 'ssd1306'
  // Sensors
  | 'dht22' | 'hc-sr04' | 'pir-sensor' | 'membrane-keypad'
  // Actuators
  | 'servo' | 'buzzer' | 'relay-module'
  // Passive Components
  | 'resistor' | 'neopixels';

export interface ComponentConfig {
  id: string;
  type: ComponentType;
  position: Position;
  pins?: { [key: string]: number };  // e.g., { signal: 10, vcc: 5, gnd: 0 }
  properties?: { [key: string]: any };  // e.g., { color: 'red', resistance: 220 }
}

export interface Circuit {
  components: ComponentConfig[];
  microcontroller: ComponentConfig | null;
}

export interface PinAssignment {
  componentId: string;
  pinName: string;
  arduinoPin: number;
}

export const AVAILABLE_DIGITAL_PINS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
export const AVAILABLE_ANALOG_PINS = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
export const AVAILABLE_PWM_PINS = [3, 5, 6, 9, 10, 11];

export type ViewMode = 'component' | 'code';

export interface ComponentMetadata {
  name: string;
  icon: string;
  category: 'microcontroller' | 'input' | 'output' | 'sensor' | 'display' | 'actuator' | 'passive';
  pinCount: number;
  defaultPins?: { [key: string]: number | string };
  description: string;
}
