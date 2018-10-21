import Rpio from 'rpio';
import Microtime from 'microtime';
import events from 'events';

class Sensor {
  constructor(triggerPin, echoPin) {

    this.eventEmitter = new events.EventEmitter();

    this.triggerPin = triggerPin;
    this.echoPin = echoPin;

    this.distance = 0;
    
    /*
     * Do GPIO Setup
     */
    Rpio.open(triggerPin, Rpio.OUTPUT);
    Rpio.open(echoPin, Rpio.INPUT, Rpio.PULL_DOWN);

    let startTime = Microtime.now();
    let endTime;

    /*
     * Poll for changes
     */
    Rpio.poll(this.echoPin, pin => {
        console.log('polling');
        // If pin value is HIGH
        if(Rpio.read(pin)) {
          console.log('pin read');
          // Once pin is read, clear the interval
          clearInterval(interval);
          
          // Echo has returned, elapsed time can be used to calculate distance
          endTime = Microtime.now(); 

          // Calculate distance based on speed of sound
          const elapsed = endTime - startTime; // Time in milliseconds

          /*
          * Elapsed time multiplied by the speed of sound (34300 cm/s or 34.3 cm/ms).
          * Divide it by 2 because it has to travel twice, once to the object and another time back.
          */
          this.distance = this.calcDistance(elapsed);

          // Emit an event to notify that distance has changed
          this.eventEmitter.emit('distancechanged');

          // Reset start time
          startTime = Microtime.now();
        }
        this.trigger();
    });

    this.trigger();
  }


  // Conveninent listening of events
  on(eventType, callback) {
    this.eventEmitter.on(eventType, callback);
  }

  // Return distance based on elapsed time
  calcDistance(elapsedTime) {
    return (elapsedTime * 0.0343) / 2;
  }

  trigger() {
    // Call the trigger to HIGH.
    Rpio.write(this.triggerPin, Rpio.HIGH);
    Rpio.sleep(0.00001);// Sleep for 0.01ms
    Rpio.write(this.triggerPin, Rpio.LOW);// Set to low to stop the trigger.
  }
}

export default Sensor;
