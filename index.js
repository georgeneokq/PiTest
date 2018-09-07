import Rpio from 'rpio';

/*
 * LP293D Pin-outs
 * GPIO25 (Pin 22) -> 1 (VCC)
 * GPIO24 (Pin 18) -> 2 (Input1)
 * GPIO23 (Pin 16) -> 7 (Input2)
 */
Rpio.open(22, Rpio.OUTPUT, Rpio.LOW); //Enable

// Moving forward.
Rpio.write(22, Rpio.HIGH);
Rpio.open(18, Rpio.OUTPUT, Rpio.low);
Rpio.open(16, Rpio.OUTPUT, Rpio.HIGH);
Rpio.sleep(5);
