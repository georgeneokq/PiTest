class Motor {
  /*
   * Uses the LP293 Driver.
   */
  constructor(vcc, input1, input2) {
    this.vcc = vcc;
    this.input1 = input1;
    this.input2 = input2;
  }
}

export default Motor;
