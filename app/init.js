class Init {
  constructor(sensor, motor) {
    this.sensor = sensor;
    this.motor = motor;

    /*
     * Setting interval to test out sensor every second.
     */
    // setInterval(this.interval.bind(this.sensor), 1000);
    this.motor.forward();
    
    // Check if distance is lesser than the maximum allowed distance
    this.maxDistance = 18; // in cm
    console.log('init');
    console.log(this.sensor.on);
  }
}

export default Init;
