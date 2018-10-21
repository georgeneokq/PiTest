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
    
    // Check if distance is lesser than the maximum allowed distance
    this.maxDistance = 18; // in cm
    
    this.sensor.on('distancechanged', () => {
      console.log('distancechanged');

      // Stop motor if distance of object exceeds the specified max distance
      if(this.sensor.distance > this.maxDistance) {
        this.motor.stop();
        console.log(`Motor stopped. Distance: ${(this.sensor.calcDistance(this.endTime - this.startTime))}`);
      } else {
        this.motor.forward();
        console.log(`Motor running. Distance: ${(this.sensor.calcDistance(this.endTime - this.startTime))}`);
      }
    });
  }
} 

export default Init;
