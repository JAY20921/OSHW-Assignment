import type { Circuit, ComponentConfig } from '../types';

export class AdvancedCodeGenerator {
  generate(circuit: Circuit): string {
    if (!circuit.microcontroller || circuit.components.length <= 1) {
      return '// Add a microcontroller and components to generate code';
    }

    const components = circuit.components.filter(c => c.id !== circuit.microcontroller?.id);
    
    if (components.length === 0) {
      return '// Add components to the canvas to generate Arduino code';
    }

    // Generate pin definitions
    const pinDefs = this.generatePinDefinitions(components);
    
    // Generate setup code
    const setupCode = this.generateSetupCode(components);
    
    // Generate loop code
    const loopCode = this.generateLoopCode(components);
    
    // Generate header comments
    const header = this.generateHeader(circuit, components);

    return `${header}

${pinDefs}

void setup() {
  Serial.begin(9600);
${setupCode}
}

void loop() {
${loopCode}
  delay(10);
}`;
  }

  private generateHeader(circuit: Circuit, components: ComponentConfig[]): string {
    let header = '// Auto-Generated Arduino Code\n';
    header += `// Microcontroller: ${circuit.microcontroller?.type.toUpperCase().replace(/-/g, ' ')}\n`;
    header += `// Components: ${components.length}\n`;
    header += '//\n';
    header += '// Component Configuration:\n';
    
    components.forEach((comp, idx) => {
      const name = this.getComponentName(comp.type);
      if (comp.pins) {
        const pinInfo = Object.entries(comp.pins)
          .filter(([, value]) => value !== 0)
          .map(([key, value]) => `${key}=${value}`)
          .join(', ');
        header += `// ${idx + 1}. ${name} (${pinInfo})\n`;
      } else {
        header += `// ${idx + 1}. ${name}\n`;
      }
    });
    
    return header;
  }

  private generatePinDefinitions(components: ComponentConfig[]): string {
    let defs = '';
    const pinMap = new Map<string, string>();

    components.forEach((comp, index) => {
      if (!comp.pins) return;

      Object.entries(comp.pins).forEach(([pinName, pinValue]) => {
        if (pinValue === 0) return; // Skip GND

        const varName = this.getPinVariableName(comp.type, pinName, index);
        const pinStr = typeof pinValue === 'string' ? pinValue : `${pinValue}`;
        
        if (!pinMap.has(varName)) {
          defs += `const int ${varName} = ${pinStr};\n`;
          pinMap.set(varName, pinStr);
        }
      });
    });

    return defs;
  }

  private generateSetupCode(components: ComponentConfig[]): string {
    let setup = '';

    components.forEach((comp, index) => {
      const compType = comp.type;

      // LEDs
      if (compType.includes('led')) {
        const varName = this.getPinVariableName(comp.type, 'anode', index);
        setup += `  pinMode(${varName}, OUTPUT);  // ${this.getComponentName(compType)}\n`;
      }
      
      // Push Button
      else if (compType === 'pushbutton') {
        const varName = this.getPinVariableName(comp.type, 'pin', index);
        setup += `  pinMode(${varName}, INPUT);   // Push Button\n`;
      }
      
      // Slide Switch / DIP Switch
      else if (compType === 'slide-switch' || compType === 'dip-switch-8') {
        if (comp.pins?.pin) {
          const varName = this.getPinVariableName(comp.type, 'pin', index);
          setup += `  pinMode(${varName}, INPUT);   // ${this.getComponentName(compType)}\n`;
        }
      }
      
      // Potentiometer (analog input)
      else if (compType === 'potentiometer') {
        // No pinMode needed for analog inputs
        setup += `  // Potentiometer on analog pin (no pinMode needed)\n`;
      }
      
      // PIR Motion Sensor
      else if (compType === 'pir-sensor') {
        const varName = this.getPinVariableName(comp.type, 'pin', index);
        setup += `  pinMode(${varName}, INPUT);   // PIR Motion Sensor\n`;
      }
      
      // Ultrasonic Sensor (hc-sr04)
      else if (compType === 'hc-sr04') {
        const trigVar = this.getPinVariableName(comp.type, 'trig', index);
        const echoVar = this.getPinVariableName(comp.type, 'echo', index);
        setup += `  pinMode(${trigVar}, OUTPUT);  // Ultrasonic TRIG\n`;
        setup += `  pinMode(${echoVar}, INPUT);   // Ultrasonic ECHO\n`;
      }
      
      // Temperature/Humidity Sensor (dht22)
      else if (compType === 'dht22') {
        setup += `  // DHT22 sensor - Use DHT library\n`;
      }
      
      // Photoresistor (analog, no specific type yet, handled generically)
      else if (compType.includes('photo')) {
        setup += `  // Photoresistor on analog pin\n`;
      }
      
      // Servo Motor
      else if (compType === 'servo') {
        const varName = this.getPinVariableName(comp.type, 'pin', index);
        setup += `  pinMode(${varName}, OUTPUT);  // Servo Motor\n`;
        setup += `  // Use Servo library for precise control\n`;
      }
      
      // Buzzer
      else if (compType === 'buzzer') {
        const varName = this.getPinVariableName(comp.type, 'pin', index);
        setup += `  pinMode(${varName}, OUTPUT);  // Buzzer\n`;
      }
      
      // Relay Module
      else if (compType === 'relay-module') {
        const varName = this.getPinVariableName(comp.type, 'pin', index);
        setup += `  pinMode(${varName}, OUTPUT);  // Relay Module\n`;
        setup += `  digitalWrite(${varName}, LOW); // Start with relay OFF\n`;
      }
      
      // LCD Display (lcd1602)
      else if (compType === 'lcd1602') {
        setup += `  // LCD Display - Use LiquidCrystal library\n`;
        setup += `  // lcd.begin(16, 2); // Initialize LCD\n`;
      }
      
      // OLED Display (ssd1306)
      else if (compType === 'ssd1306') {
        setup += `  // OLED Display - Use Adafruit_SSD1306 library\n`;
      }
      
      // 7-Segment Display
      else if (compType === '7segment') {
        setup += `  // 7-Segment Display - Configure digit pins\n`;
      }
    });

    return setup;
  }

  private generateLoopCode(components: ComponentConfig[]): string {
    let loop = '';

    // Separate components by category
    const inputs = components.filter(c => 
      c.type === 'pushbutton' || c.type === 'slide-switch' || c.type === 'dip-switch-8' ||
      c.type === 'potentiometer' || c.type === 'pir-sensor' || c.type === 'dht22'
    );
    
    const outputs = components.filter(c => 
      c.type.includes('led') || c.type === 'buzzer' || c.type === 'relay-module'
    );

    // Read inputs
    if (inputs.length > 0) {
      loop += '  // Read Inputs\n';
      inputs.forEach((comp, index) => {
        if (comp.type === 'pushbutton') {
          const varName = this.getPinVariableName(comp.type, 'pin', index);
          loop += `  int button${index}State = digitalRead(${varName});\n`;
        } else if (comp.type === 'potentiometer') {
          const varName = this.getPinVariableName(comp.type, 'pin', index);
          loop += `  int pot${index}Value = analogRead(${varName});\n`;
        } else if (comp.type === 'pir-sensor') {
          const varName = this.getPinVariableName(comp.type, 'pin', index);
          loop += `  int motion${index} = digitalRead(${varName});\n`;
        } else if (comp.type === 'dht22') {
          const varName = this.getPinVariableName(comp.type, 'pin', index);
          loop += `  // Read DHT22 sensor on pin ${varName}\n`;
          loop += `  // float temp${index} = dht.readTemperature();\n`;
          loop += `  // float humidity${index} = dht.readHumidity();\n`;
        }
      });
      loop += '\n';
    }

    // Control outputs based on inputs
    if (outputs.length > 0 && inputs.length > 0) {
      loop += '  // Control Outputs\n';
      
      // Simple logic: first button controls first LED, etc.
      const button = inputs.find(c => c.type === 'pushbutton');
      const led = outputs.find(c => c.type.includes('led'));
      
      if (button && led) {
        const buttonIdx = inputs.indexOf(button);
        const ledIdx = outputs.indexOf(led);
        const buttonVar = `button${buttonIdx}State`;
        const ledPin = this.getPinVariableName(led.type, 'anode', ledIdx);
        
        loop += `  if (${buttonVar} == HIGH) {\n`;
        loop += `    digitalWrite(${ledPin}, HIGH);  // Turn LED ON\n`;
        loop += `  } else {\n`;
        loop += `    digitalWrite(${ledPin}, LOW);   // Turn LED OFF\n`;
        loop += `  }\n`;
      } else if (outputs.length > 0) {
        // Just blink if no input
        outputs.forEach((comp, index) => {
          if (comp.type.includes('led')) {
            const varName = this.getPinVariableName(comp.type, 'anode', index);
            loop += `  digitalWrite(${varName}, HIGH);\n`;
            loop += `  delay(500);\n`;
            loop += `  digitalWrite(${varName}, LOW);\n`;
            loop += `  delay(500);\n`;
          }
        });
      }
    } else if (outputs.length > 0) {
      // Blink pattern if only outputs
      loop += '  // Blink Pattern\n';
      outputs.forEach((comp, index) => {
        if (comp.type.includes('led')) {
          const varName = this.getPinVariableName(comp.type, 'anode', index);
          loop += `  digitalWrite(${varName}, HIGH);\n`;
        }
      });
      loop += `  delay(500);\n`;
      outputs.forEach((comp, index) => {
        if (comp.type.includes('led')) {
          const varName = this.getPinVariableName(comp.type, 'anode', index);
          loop += `  digitalWrite(${varName}, LOW);\n`;
        }
      });
      loop += `  delay(500);\n`;
    }

    // Sensors with serial output
    if (inputs.some(c => c.type === 'hc-sr04')) {
      const ultra = inputs.find(c => c.type === 'hc-sr04');
      if (ultra) {
        const idx = inputs.indexOf(ultra);
        const trigVar = this.getPinVariableName(ultra.type, 'trig', idx);
        const echoVar = this.getPinVariableName(ultra.type, 'echo', idx);
        
        loop += '\n  // Ultrasonic Distance Measurement\n';
        loop += `  digitalWrite(${trigVar}, LOW);\n`;
        loop += `  delayMicroseconds(2);\n`;
        loop += `  digitalWrite(${trigVar}, HIGH);\n`;
        loop += `  delayMicroseconds(10);\n`;
        loop += `  digitalWrite(${trigVar}, LOW);\n`;
        loop += `  long duration = pulseIn(${echoVar}, HIGH);\n`;
        loop += `  float distance = duration * 0.034 / 2; // cm\n`;
        loop += `  Serial.print("Distance: ");\n`;
        loop += `  Serial.print(distance);\n`;
        loop += `  Serial.println(" cm");\n`;
      }
    }

    return loop || '  // Add components to generate control logic\n';
  }

  private getPinVariableName(type: string, pinName: string, index: number): string {
    const typePrefix = type.replace(/-/g, '_').toUpperCase();
    const pinSuffix = pinName.toUpperCase();
    return `${typePrefix}_${pinSuffix}_${index}`;
  }

  private getComponentName(type: string): string {
    const names: Record<string, string> = {
      'arduino-uno': 'Arduino Uno',
      'arduino-mega': 'Arduino Mega',
      'arduino-nano': 'Arduino Nano',
      'esp32': 'ESP32',
      'pi-pico': 'Raspberry Pi Pico',
      'led-red': 'Red LED',
      'led-green': 'Green LED',
      'led-blue': 'Blue LED',
      'led-yellow': 'Yellow LED',
      'led-white': 'White LED',
      'led-rgb': 'RGB LED',
      'pushbutton': 'Push Button',
      'slide-switch': 'Slide Switch',
      'dip-switch-8': 'DIP Switch',
      'potentiometer': 'Potentiometer',
      'pir-sensor': 'PIR Motion Sensor',
      'ultrasonic': 'Ultrasonic Sensor',
      'temperature-sensor': 'Temperature Sensor',
      'hc-sr04': 'Ultrasonic Sensor HC-SR04',
      'dht22': 'DHT22 Temperature/Humidity Sensor',
      'lcd1602': 'LCD 16x2',
      'ssd1306': 'OLED Display SSD1306',
      '7': 'Buzzer',
      'relay-module': 'Relay Module',
      'resistor': 'Resistor',
      'membrane-keypad': 'Membrane Keypad',
      'neopixels': 'NeoPixels'
    };
    
    return names[type] || type.replace(/-/g, ' ').toUpperCase();
  }
}
