class Init {
  constructor(sensor, motor) {
    this.sensor = sensor;
    this.motor = motor;

    console.log('App initialized');

    /*
     * Setting interval to test out sensor every second.
     */
    // setInterval(this.interval.bind(this.sensor), 1000);
    this.motor.forward();
    
    // Check if distance is lesser than the allowed distance
    this.lowestAllowedDistance = 18; // in cm
    
    this.sensor.on('distancechanged', () => {

      console.log(`Motor ${(this.sensor.distance < this.lowestAllowedDistance) ? 'stopped' : 'running'}. Distance: ${this.sensor.distance}`);
      // Stop motor if distance of object exceeds the specified max distance
      if(this.sensor.distance < this.lowestAllowedDistance) {
        this.motor.stop();
      } else {
        this.motor.forward();
      }
    });
  }
} 

export default Init;
