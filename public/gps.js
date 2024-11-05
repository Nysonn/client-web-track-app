function sendGPSData() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const data = {
          latitude,
          longitude,
          device_id: 'device123' // Replace with a unique ID for each device
        };

        // Send GPS data to the secondary app server
        fetch('/send-gps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
      error => {
        console.error('Error retrieving location:', error);
      }
    );
  } else {
    alert('Geolocation is not available on this device.');
  }
}
