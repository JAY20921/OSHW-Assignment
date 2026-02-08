import type { PinConfig } from '../types';

export class CodeGenerator {
  generate(pinConfig: PinConfig): string {
    return `// Auto-generated Arduino Code
// LED connected to Digital Pin ${pinConfig.led}
// Button connected to Digital Pin ${pinConfig.button}

const int LED_PIN = ${pinConfig.led};
const int BUTTON_PIN = ${pinConfig.button};

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
    digitalWrite(LED_PIN, HIGH);
  } else {
    // Otherwise, turn LED off
    digitalWrite(LED_PIN, LOW);
  }
  
  // Small delay for stability
  delay(10);
}`;
  }

  generateHex(pinConfig: PinConfig): string {
    // For a real implementation, this would compile the Arduino code
    // For this prototype, we'll use a simplified approach
    // In production, you'd call Arduino CLI or use a compilation service
    
    const code = this.generate(pinConfig);
    
    // This is a placeholder - in a real implementation,
    // you would compile this to actual AVR hex format
    return code;
  }
}
