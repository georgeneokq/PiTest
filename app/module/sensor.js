import Rpio from 'rpio';

class Sensor {
  constructor(trigger, echo) {
    this.trigger = trigger;
    this.echo = echo;

    /*
     * Do GPIO Setup
     */
    Rpio.open(trigger, Rpio.OUTPUT);
    Rpio.open(echo, Rpio.INPUT, Rpio.PULL_DOWN);
  }

  distance() {
    // We will convert this to seconds later.
    let startTime = new Date();
    let endTime = new Date();

    /* while (Rpio.read(this.echo) === 0) {
      startTime = new Date();
      console.log(`Not received: ${Math.floor(startTime.getTime() / 1000)}`);
    }

    while (Rpio.read(this.echo) === 1) {
      endTime = new Date();
      console.log(`Received: ${Math.floor(endTime.getTime() / 1000)}`);
    } */
    setInterval(() => {
      this.startTrigger();
    }, 1000);
    Rpio.poll(this.echo, (pin) => {
      console.log(`Status: ${Rpio.read(pin)}`);
    });

    // const elapsed = endTime.getTime() - startTime.getTime();// .getTime() turns it into miliseconds.
    // const elapsed = Math.floor(endTime.getTime() / 1000) - Math.floor(startTime.getTime() / 1000); // Dividing by 1000 turns it into seconds.

    /*
     * Elapsed time multiplied by the speed of sound (34300 cm/s).
     * Divide it by 2 because it has to travel twice, once to the object and another time back.
     */
    // return (elapsed * 34300) / 2;
  }

  startTrigger() {
    // Call the trigger to HIGH.
    Rpio.write(this.trigger, Rpio.HIGH);
    Rpio.sleep(0.00001);// Sleep for 0.01ms
    Rpio.write(this.trigger, Rpio.LOW);// Set to low to stop the trigger.
  }
}

export default Sensor;
