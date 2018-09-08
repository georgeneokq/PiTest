class Init {
  constructor(sensor, motor) {
    this.sensor = sensor;
    this.motor = motor;

    /*
     * Setting interval to test out sensor every second.
     */
    // setInterval(this.interval.bind(this.sensor), 1000);
    this.motor.forward();
    setInterval(() => {
      console.log(this.sensor.distance);
      if (this.sensor.distance < 18) { // Less than 18cm for testing.
        this.motor.stop();
      } else {
        this.motor.forward();
      }
    }, 2000);
  }

  interval() {
    const distance = this.sensor.distance();
    console.log(distance);
  }
}

export default Init;
