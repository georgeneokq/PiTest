import Noble from 'noble';

const RSSI_THRESHOLD = -90;
const EXIT_GRACE_PERIOD = 2000;

const inRange = [];

Noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    Noble.startScanning([], true);
  } else {
    Noble.stopScanning();
  }
});

Noble.on('discover', (peripheral) => {
  if (peripheral.rssi < RSSI_THRESHOLD) {
    return;
  }

  // Check if it's already in the list.
  if (!inRange[peripheral.id]) {
    // Add it to the list.
    inRange[peripheral.id] = {
      peripheral,
    };

    console.log(`${peripheral.advertisement.localName} entered RSSI ${peripheral.rssi}`);
  }

  inRange[peripheral.id].lastSeen = Date.now();
});
