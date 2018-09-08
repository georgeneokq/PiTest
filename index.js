import Dotenv from 'dotenv';

import Init from './app/init';
import Motor from './app/module/motor';
import Sensor from './app/module/sensor';

Dotenv.config();

const init = new Init(
  new Sensor(
    process.env.HCSRO4_TRIGGER,
    process.env.HCSRO4_ECHO,
  ),
  new Motor(
    process.env.LP293D_VCC,
    process.env.LP293D_INPUT1,
    process.env.LP293D_INPUT2,
  ),
);
