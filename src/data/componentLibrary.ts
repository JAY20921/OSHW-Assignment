import type { ComponentType, ComponentMetadata } from '../types';

export const COMPONENT_LIBRARY: Record<ComponentType, ComponentMetadata> = {
  // Microcontrollers
  'arduino-uno': {
    name: 'Arduino Uno',
    icon: '🔲',
    category: 'microcontroller',
    pinCount: 28,
    description: 'ATmega328P-based microcontroller board'
  },
  'arduino-mega': {
    name: 'Arduino Mega',
    icon: '🔳',
    category: 'microcontroller',
    pinCount: 70,
    description: 'ATmega2560-based microcontroller board'
  },
  'arduino-nano': {
    name: 'Arduino Nano',
    icon: '▪️',
    category: 'microcontroller',
    pinCount: 22,
    description: 'Compact ATmega328P board'
  },
  'esp32': {
    name: 'ESP32',
    icon: '📡',
    category: 'microcontroller',
    pinCount: 38,
    description: 'WiFi & Bluetooth microcontroller'
  },
  'pi-pico': {
    name: 'Raspberry Pi Pico',
    icon: '🥧',
    category: 'microcontroller',
    pinCount: 26,
    description: 'RP2040-based microcontroller'
  },

  // LEDs
  'led-red': {
    name: 'LED (Red)',
    icon: '🔴',
    category: 'output',
    pinCount: 2,
    defaultPins: { anode: 10, cathode: 0 },
    description: 'Red light-emitting diode'
  },
  'led-green': {
    name: 'LED (Green)',
    icon: '🟢',
    category: 'output',
    pinCount: 2,
    defaultPins: { anode: 10, cathode: 0 },
    description: 'Green light-emitting diode'
  },
  'led-blue': {
    name: 'LED (Blue)',
    icon: '🔵',
    category: 'output',
    pinCount: 2,
    defaultPins: { anode: 10, cathode: 0 },
    description: 'Blue light-emitting diode'
  },
  'led-yellow': {
    name: 'LED (Yellow)',
    icon: '🟡',
    category: 'output',
    pinCount: 2,
    defaultPins: { anode: 10, cathode: 0 },
    description: 'Yellow light-emitting diode'
  },
  'led-white': {
    name: 'LED (White)',
    icon: '⚪',
    category: 'output',
    pinCount: 2,
    defaultPins: { anode: 10, cathode: 0 },
    description: 'White light-emitting diode'
  },
  'rgb-led': {
    name: 'RGB LED',
    icon: '🌈',
    category: 'output',
    pinCount: 4,
    defaultPins: { r: 9, g: 10, b: 11, cathode: 0 },
    description: 'Red, Green, Blue LED'
  },

  // Input Components
  'pushbutton': {
    name: 'Push Button',
    icon: '🔘',
    category: 'input',
    pinCount: 2,
    defaultPins: { pin: 2, gnd: 0 },
    description: 'Momentary push button'
  },
  'slide-switch': {
    name: 'Slide Switch',
    icon: '🎚️',
    category: 'input',
    pinCount: 3,
    defaultPins: { pin: 2, gnd: 0 },
    description: 'SPDT slide switch'
  },
  'dip-switch-8': {
    name: 'DIP Switch (8)',
    icon: '🎛️',
    category: 'input',
    pinCount: 8,
    description: '8-position DIP switch'
  },
  'potentiometer': {
    name: 'Potentiometer',
    icon: '🎚️',
    category: 'input',
    pinCount: 3,
    defaultPins: { signal: 'A0', vcc: 0, gnd: 0 },
    description: 'Variable resistor (10kΩ)'
  },

  // Displays
  'lcd1602': {
    name: 'LCD 16x2',
    icon: '📟',
    category: 'display',
    pinCount: 6,
    defaultPins: { rs: 12, e: 11, d4: 5, d5: 4, d6: 3, d7: 2 },
    description: '16x2 character LCD display'
  },
  '7segment': {
    name: '7-Segment Display',
    icon: '8️⃣',
    category: 'display',
    pinCount: 8,
    description: 'Single digit 7-segment display'
  },
  'ssd1306': {
    name: 'OLED Display',
    icon: '📺',
    category: 'display',
    pinCount: 2,
    defaultPins: { sda: 'A4', scl: 'A5' },
    description: '128x64 OLED display (I2C)'
  },

  // Sensors
  'dht22': {
    name: 'DHT22',
    icon: '🌡️',
    category: 'sensor',
    pinCount: 3,
    defaultPins: { data: 2, vcc: 0, gnd: 0 },
    description: 'Temperature & humidity sensor'
  },
  'hc-sr04': {
    name: 'HC-SR04',
    icon: '📏',
    category: 'sensor',
    pinCount: 4,
    defaultPins: { trig: 9, echo: 10, vcc: 0, gnd: 0 },
    description: 'Ultrasonic distance sensor'
  },
  'pir-sensor': {
    name: 'PIR Sensor',
    icon: '👁️',
    category: 'sensor',
    pinCount: 3,
    defaultPins: { out: 2, vcc: 0, gnd: 0 },
    description: 'Motion detection sensor'
  },
  'membrane-keypad': {
    name: '4x4 Keypad',
    icon: '⌨️',
    category: 'input',
    pinCount: 8,
    description: '4x4 matrix membrane keypad'
  },

  // Actuators
  'servo': {
    name: 'Servo Motor',
    icon: '⚙️',
    category: 'actuator',
    pinCount: 3,
    defaultPins: { signal: 9, vcc: 0, gnd: 0 },
    description: '180° servo motor'
  },
  'buzzer': {
    name: 'Buzzer',
    icon: '🔔',
    category: 'output',
    pinCount: 2,
    defaultPins: { pin: 8, gnd: 0 },
    description: 'Piezo buzzer'
  },
  'relay-module': {
    name: 'Relay Module',
    icon: '🔌',
    category: 'actuator',
    pinCount: 3,
    defaultPins: { in: 7, vcc: 0, gnd: 0 },
    description: 'Single channel relay module'
  },

  // Passive Components
  'resistor': {
    name: 'Resistor',
    icon: '⚡',
    category: 'passive',
    pinCount: 2,
    description: 'Fixed resistor (220Ω - 10kΩ)'
  },
  'neopixels': {
    name: 'NeoPixel Strip',
    icon: '💡',
    category: 'output',
    pinCount: 3,
    defaultPins: { din: 6, vcc: 0, gnd: 0 },
    description: 'WS2812B addressable LEDs'
  }
};

export const COMPONENT_CATEGORIES = [
  { id: 'microcontroller', name: 'Microcontrollers', icon: '🔲' },
  { id: 'input', name: 'Input Devices', icon: '🔘' },
  { id: 'output', name: 'Output Devices', icon: '💡' },
  { id: 'sensor', name: 'Sensors', icon: '🌡️' },
  { id: 'display', name: 'Displays', icon: '📟' },
  { id: 'actuator', name: 'Actuators', icon: '⚙️' },
  { id: 'passive', name: 'Passive Components', icon: '⚡' }
] as const;
