import Rpio from 'rpio';

class Sensor {
  constructor(trigger, echo) {
    this.trigger = trigger;
    this.echo = echo;

    // Time
    this.interval = null;
    this.startTime = new Date();
    this.endTime = new Date();

    this.distance = 0;

    /*
     * Do GPIO Setup
     */
    Rpio.open(trigger, Rpio.OUTPUT);
    Rpio.open(echo, Rpio.INPUT, Rpio.PULL_DOWN);

    /*
     * Start polling for changes.
     */
    Rpio.poll(this.echo, (pin) => {
      if (Rpio.read(pin)) {
        clearInterval(this.interval);
        // console.log(`Status: ${Rpio.read(pin)}`);
        this.endTime = new Date();
        // elapsed = Math.floor(endTime.getTime() / 1000) - Math.floor(startTime.getTime() / 1000); // Dividing by 1000 turns it into seconds.
        // console.log(`Start: ${startTime.getTime()}`);
        // console.log(`End: ${endTime.getTime()}`);
        const elapsed = this.endTime.getTime() - this.startTime.getTime();// Time in miliseconds.
        // console.log(`Elapsed 1: ${elapsed}`);
        // console.log(`Distance: ${(elapsed * 34.3) / 2}`);

        /*
         * Elapsed time multiplied by the speed of sound (34300 cm/s or 34.3 cm/ms).
         * Divide it by 2 because it has to travel twice, once to the object and another time back.
         */
        this.distance = (elapsed * 34.3) / 2;
      }
    });
  }

  calcDistance() {
    this.interval = setInterval(() => {
      this.startTrigger();
      this.startTime = new Date();
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
