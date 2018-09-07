import Rpio from 'rpio';

/*
 * LP293D Pin-outs
 * GPIO25 (Pin 22) -> 1 (VCC)
 * GPIO24 (Pin 18) -> 2 (Input1)
 * GPIO23 (Pin 16) -> 7 (Input2)
 */
Rpio.open(22, Rpio.OUTPUT, Rpio.LOW); //Enable

// Moving forward.
/* Rpio.write(22, Rpio.HIGH);
Rpio.open(18, Rpio.OUTPUT, Rpio.low);
Rpio.open(16, Rpio.OUTPUT, Rpio.HIGH); */

/*
 * HC-SR04
 * GPIO21 (Pin 40) -> Trigger
 * GPIO20 (Pin 38) -> Echo
 */
Rpio.open(40, Rpio.OUTPUT, Rpio.HIGH);
const buf = new Buffer(10000);
Rpio.readbuf(38, buf);
console.log(buf);
