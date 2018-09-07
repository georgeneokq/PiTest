import Rpio from 'rpio';

/*
 * LP293D Pin-outs
 * GPIO25 (Pin 22) -> 1 (VCC)
 * GPIO24 (Pin 18) -> 2 (Input1)
 * GPIO23 (Pin 16) -> 7 (Input2)
 */
Rpio.open(25, Rpio.OUTPUT, Rpio.LOW); //Enable

// Moving forward.
Rpio.write(25, Rpio.HIGH);
Rpio.open(24, Rpio.OUTPUT, Rpio.low);
Rpio.open(23, Rpio.OUTPUT, Rpio.HIGH);
Rpio.sleep(5);
