import Rpio from 'rpio';
class Motor {
  /*
   * Uses the LP293 Driver.
   */
  constructor(vcc, input1, input2) {
    this.vcc = vcc;
    this.input1 = input1;
    this.input2 = input2;

    /*
     * Setting up GPIO
     */
    Rpio.open(this.vcc, Rpio.OUTPUT);
    Rpio.open(this.input1, Rpio.OUTPUT);
    Rpio.open(this.input2, Rpio.OUTPUT);
  }

  forward() {
    Rpio.write(this.input2, Rpio.HIGH);
    Rpio.write(this.input1, Rpio.LOW);
    Rpio.write(this.vcc, Rpio.HIGH);
  }

  reverse() {
    Rpio.write(this.input2, Rpio.LOW);
    Rpio.write(this.input1, Rpio.HIGH);
    Rpio.write(this.vcc, Rpio.HIGH);
  }

  stop() {
    Rpio.write(this.vcc, Rpio.LOW);
  }
}

export default Motor;
