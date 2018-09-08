class Init {
  constructor(sensor, motor) {
    this.sensor = sensor;
    this.motor = motor;

    /*
     * Setting interval to test out sensor every second.
     */
    // setInterval(this.interval.bind(this.sensor), 1000);
    setInterval(() => {
      this.sensor.calcDistance();
      console.log(this.sensor.distance);
    }, 1000);
  }

  interval() {
    const distance = this.sensor.distance();
    console.log(distance);
  }
}

export default Init;
