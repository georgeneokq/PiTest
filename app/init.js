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
    
    this.sensor.on('distancechanged', () => {
      console.log('distance changed');
      // Stop motor if distance of object exceeds the specified max distance
      if(this.sensor.distance > this.maxDistance) {
        this.motor.stop();
      } else {
        this.motor.forward();
      }
    });
  }
}

export default Init;
