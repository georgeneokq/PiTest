import Rpio from 'rpio';
import Microtime from 'microtime';
import events from 'events';

class Sensor {
  constructor(trigger, echo) {

    this.eventEmitter = new events.EventEmitter();

    this.trigger = trigger;
    this.echo = echo;

    // Time
    this.interval = null;
    this.startTime = Microtime.now();
    this.endTime = Microtime.now();

    this.distance = null;

    /*
     * Do GPIO Setup
     */
    Rpio.open(trigger, Rpio.OUTPUT);
    Rpio.open(echo, Rpio.INPUT, Rpio.PULL_DOWN);

    /*
     * IMPROVED VERSION 
     */ 
    this.startReadingDistance();
    Rpio.poll(this.echo, pin => {

        // If pin value is HIGH
        if(Rpio.read(pin)) {

          // Echo has returned, elapsed time can be used to calculate distance
          this.endTime = Microtime.now(); 

          // Calculate distance based on speed of sound
          const elapsed = this.endTime - this.startTime; // Time in milliseconds

          /*
          * Elapsed time multiplied by the speed of sound (34300 cm/s or 34.3 cm/ms).
          * Divide it by 2 because it has to travel twice, once to the object and another time back.
          */
          this.distance = calcDistance(elapsed);

          // Emit an event to notify that distance has changed
          this.eventEmitter.emit('distancechanged');
        }
    });
  }

  // Conveninent listening of events
  on(eventType, callback) {
    this.eventEmitter.on(eventType, callback);
  }

  // Return distance based on elapsed time
  calcDistance(elapsedTime) {
    return (elapsedTime * 0.0343) / 2;
  }

  startReadingDistance() {
    this.interval = setInterval(() => {
      this.startTrigger();
      this.startTime = Microtime.now();
    }, 1000);
  }

  startTrigger() {
    // Call the trigger to HIGH.
    Rpio.write(this.trigger, Rpio.HIGH);
    Rpio.sleep(0.00001);// Sleep for 0.01ms
    Rpio.write(this.trigger, Rpio.LOW);// Set to low to stop the trigger.
  }
}

export default Sensor;
