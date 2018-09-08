class Init {
  constructor(sensor, motor) {
    this.sensor = sensor;
    this.motor = motor;

    /*
     * Setting interval to test out sensor every second.
     */
    setInterval(() => {
      const distance = this.sensor.distance();
      console.log(distance);
    }, 1000);
  }
}

export default Init;
