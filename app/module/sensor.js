import Rpio from 'rpio';

class Sensor {
  constructor(trigger, echo) {
    this.trigger = trigger;
    this.echo = echo;

    /*
     * Do GPIO Setup
     */
    Rpio.open(trigger, Rpio.OUTPUT);
    Rpio.open(echo, Rpio.INPUT);
  }

  distance() {
    this.startTrigger();
    // We will convert this to miliseconds later.
    let startTime = new Date();
    let endTime = new Date();

    while (!Rpio.read(this.echo)) {
      startTime = new Date();
    }

    while (Rpio.read(this.echo)) {
      endTime = new Date();
    }

    const elapsed = endTime.getTime() - startTime.getTime();// .getTime() turns it into miliseconds.

    /*
     * Elapsed time multiplied by the speed of sound (34300 cm/s).
     * Divide it by 2 because it has to travel twice, once to the object and another time back.
     */
    return (elapsed * 34300) / 2;
  }

  startTrigger() {
    // Call the trigger to HIGH.
    Rpio.write(this.trigger, Rpio.HIGH);
    Rpio.sleep(0.00001);// Sleep for 0.01ms
    Rpio.write(this.trigger, Rpio.LOW);// Set to low to stop the trigger.
  }
}

export default Sensor;
