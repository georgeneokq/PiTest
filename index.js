import Noble from 'noble';

const Devices = [];
Noble.startScanning(Devices, true);
console.log(Devices);
