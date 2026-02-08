import type { Circuit } from '../types';

export class FOSSEECodeGenerator {
  /**
   * Generates Arduino code according to FOSSEE requirements:
   * - pinMode() for LED (OUTPUT) and Button (INPUT)
   * - digitalRead() for button
   * - digitalWrite() for LED
   * - Button controls LED directly
   */
  generate(circuit: Circuit): string {
    const led = circuit.components.find(c => c.type === 'led-red');
    const button = circuit.components.find(c => c.type === 'pushbutton');
    const arduino = circuit.microcontroller;

    if (!arduino || !led || !button) {
      return '// Add Arduino Uno, LED, and Push Button to generate code';
    }

    const ledPin = led.pins?.anode || 10;
    const buttonPin = button.pins?.pin || 2;

    return `// Auto-generated Arduino Code
//  Arduino Simulator
// LED connected to Digital Pin ${ledPin}
// Button connected to Digital Pin ${buttonPin}

const int LED_PIN = ${ledPin};
const int BUTTON_PIN = ${buttonPin};

void setup() {
  // Initialize LED pin as output
  pinMode(LED_PIN, OUTPUT);
  
  // Initialize button pin as input
  pinMode(BUTTON_PIN, INPUT);
  
  // Start with LED off
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  // Read the button state
  int buttonState = digitalRead(BUTTON_PIN);
  
  // If button is pressed (HIGH), turn LED on
  if (buttonState == HIGH) {
    digitalWrite(LED_PIN, HIGH);  // LED ON
  } else {
    digitalWrite(LED_PIN, LOW);   // LED OFF
  }
  
  // Small delay for stability
  delay(10);
}`;
  }
}
