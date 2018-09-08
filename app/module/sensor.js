import Rpio from 'rpio';
import Microtime from 'microtime';

class Sensor {
  constructor(trigger, echo) {
    this.trigger = trigger;
    this.echo = echo;

    // Time
    this.interval = null;
    this.startTime = Microtime.now();
    this.endTime = Microtime.now();

    this.distance = 0;

    /*
     * Do GPIO Setup
     */
    Rpio.open(trigger, Rpio.OUTPUT);
    Rpio.open(echo, Rpio.INPUT, Rpio.PULL_DOWN);

    /*
     * Start polling for changes.
     */
    this.calcDistance();
    Rpio.poll(this.echo, (pin) => {
      if (Rpio.read(pin)) {
        this.endTime = Microtime.now();
        const elapsed = this.endTime - this.startTime;// Time in miliseconds.
        // console.log(`Start: ${this.startTime} | End: ${this.endTime} | Elapsed: ${elapsed} | Distance: ${(elapsed * 34.3) / 2}cm`);
        console.log(`Start: ${this.startTime} | End: ${this.endTime} | Elapsed: ${elapsed} | Distance: ${(elapsed * 0.0343) / 2}cm`);

        /*
         * Elapsed time multiplied by the speed of sound (34300 cm/s or 34.3 cm/ms).
         * Divide it by 2 because it has to travel twice, once to the object and another time back.
         */
        // this.distance = (elapsed * 34.3) / 2;
        this.distance = (elapsed * 0.0343) / 2;
      }
    });
  }

  calcDistance() {
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
