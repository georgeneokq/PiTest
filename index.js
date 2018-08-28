import Bluetooth from 'node-bluetooth';

const Device = new Bluetooth.DeviceINQ();

const Found = [];

Device.on('finished', () => {
  console.log(Found);
}).on('found', (address, name) => {
  Found.push({
    address,
    name,
  });

  console.log(`Found: ${address} named ${name}`);
}).inquire();
