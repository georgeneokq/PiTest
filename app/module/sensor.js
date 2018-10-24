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

    let startTime;
    let endTime;

    // In case sound trigger doesnt return, set trigger high again (?)
    // let interval = setInterval(() => {
    //   this.trigger();
    //   startTime = Microtime.now();
    // }, 1000);

    /*
     * Poll for changes
     */
    Rpio.poll(this.echoPin, pin => {

      // Un-commenting this introduces a new bug
      // console.log('polling');

      // If pin value is HIGH
        if(Rpio.read(pin)) {
          
          // Echo has returned, elapsed time can be used to calculate distance
          endTime = Microtime.now(); 

          // Calculate distance based on speed of sound
          const elapsed = endTime - startTime; // Time in milliseconds

          this.distance = this.calcDistance(elapsed);

          // Restart the startTime
          startTime = Microtime.now();

          // Emit an event to notify that distance has changed
          this.eventEmitter.emit('distancechanged');

          // Send new signal
          // this.trigger();
          
          // Cant believe it. The log function is bugged. LOL. Try un-commenting the first console.log of this function
          console.log(`Motor ${(this.distance < 18) ? 'stopped' : 'running'}. Distance: ${this.distance}`);
        }
    }, Rpio.POLL_HIGH);

    let timeout = setTimeout(_ => {
        this.trigger();
        startTime = Microtime.now();
    }, 1000);
  }


  // Conveninent listening of events
  on(eventType, callback) {
    this.eventEmitter.on(eventType, callback);
  }

  /*
   * Elapsed time(in ms) multiplied by the speed of sound (34300 cm/s = 34.3 cm/ms = 0.0343cm/µs).
   * Divide it by 2 because it has to travel twice, once to the object and another time back.
   */
  calcDistance(elapsedTime) {

    return (elapsedTime * 0.0343) / 2; // return cm
  }

  trigger() {
    // Call the trigger to HIGH.
    Rpio.write(this.triggerPin, Rpio.HIGH);
    Rpio.sleep(0.00001);// Sleep for 0.01ms
    Rpio.write(this.triggerPin, Rpio.LOW);// Set to low to stop the trigger.
  }
}

export default Sensor;
