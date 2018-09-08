class Init {
  constructor(sensor, motor) {
    this.sensor = sensor;
    this.motor = motor;

    /*
     * Setting interval to test out sensor every second.
     */
    // setInterval(this.interval.bind(this.sensor), 1000);
    console.log(this.sensor.distance());
  }

  interval() {
    const distance = this.sensor.distance();
    console.log(distance);
  }
}

export default Init;
