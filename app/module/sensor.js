import Rpio from 'rpio';

class Sensor {
  constructor(trigger, echo) {
    this.trigger = trigger;
    this.echo = echo;
    this.distance = 0;

    /*
     * Do GPIO Setup
     */
    Rpio.open(trigger, Rpio.OUTPUT);
    Rpio.open(echo, Rpio.INPUT, Rpio.PULL_DOWN);
  }

  calcDistance() {
    // We will convert this to seconds later.
    let startTime = new Date();
    let endTime = new Date();
    let elapsed = 0;
    const interval = setInterval(() => {
      this.startTrigger();
      startTime = new Date();
    }, 1000);
    Rpio.poll(this.echo, (pin) => {
      if (Rpio.read(pin)) {
        clearInterval(interval);
        // console.log(`Status: ${Rpio.read(pin)}`);
        endTime = new Date();
        // elapsed = Math.floor(endTime.getTime() / 1000) - Math.floor(startTime.getTime() / 1000); // Dividing by 1000 turns it into seconds.
        // console.log(`Start: ${startTime.getTime()}`);
        // console.log(`End: ${endTime.getTime()}`);
        elapsed = endTime.getTime() - startTime.getTime();// Time in miliseconds.
        // console.log(`Elapsed 1: ${elapsed}`);
        // console.log(`Distance: ${(elapsed * 34.3) / 2}`);

        /*
         * Elapsed time multiplied by the speed of sound (34300 cm/s or 34.3 cm/ms).
         * Divide it by 2 because it has to travel twice, once to the object and another time back.
         */
        this.distance = (elapsed * 34.3) / 2;
        Rpio.poll(pin, null);
      }
    });
  }

  startTrigger() {
    // Call the trigger to HIGH.
    Rpio.write(this.trigger, Rpio.HIGH);
    Rpio.sleep(0.00001);// Sleep for 0.01ms
    Rpio.write(this.trigger, Rpio.LOW);// Set to low to stop the trigger.
  }
}

export default Sensor;
