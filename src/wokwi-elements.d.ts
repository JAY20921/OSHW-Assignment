// Type declarations for @wokwi/elements custom elements
declare module '@wokwi/elements' {
  export {};
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Microcontrollers
      'wokwi-arduino-uno': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-arduino-mega': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-arduino-nano': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-esp32-devkit-v1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-pi-pico': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // LEDs
      'wokwi-led': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        color?: string;
        value?: boolean;
      }, HTMLElement>;
      'wokwi-rgb-led': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-neopixel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        count?: number;
      }, HTMLElement>;
      
      // Input Devices
      'wokwi-pushbutton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        color?: string;
        pressed?: boolean;
      }, HTMLElement>;
      'wokwi-slide-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-dip-switch-8': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-potentiometer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        value?: number;
      }, HTMLElement>;
      'wokwi-membrane-keypad': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Displays
      'wokwi-lcd1602': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        text?: string;
        pins?: string;
      }, HTMLElement>;
      'wokwi-7segment': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        values?: string;
      }, HTMLElement>;
      'wokwi-ssd1306': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Sensors
      'wokwi-dht22': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        temperature?: number;
        humidity?: number;
      }, HTMLElement>;
      'wokwi-hc-sr04': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        distance?: number;
      }, HTMLElement>;
      'wokwi-pir-motion-sensor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Actuators
      'wokwi-servo': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        angle?: number;
      }, HTMLElement>;
      'wokwi-buzzer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'wokwi-relay-module': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
      // Passive Components
      'wokwi-resistor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        value?: string;
      }, HTMLElement>;
    }
  }
}
