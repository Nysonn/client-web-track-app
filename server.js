import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import axios from 'axios';
const app = express();
const PORT = 3001; // Port for the secondary app

// const LOCAL_IP = '10.159.101.152';

app.use(cors());

// app.use(cors({ origin: `http://${LOCAL_IP}:3000` }));

// Serve static files from the 'public' folder
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Get route for the client-view page
app.get('/client-view', (req, res) => {
  res.render('client-view');
});


// Route to send GPS data to the main app
// app.post('/send-gps', async (req, res) => {
//   const { latitude, longitude, device_id } = req.body;

//   try {
//     const response = await fetch('http://localhost:3000/receive-gps-data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ latitude, longitude, device_id }),
//     });

//     // Check if the response has JSON content
//     const responseData = await response.text(); // Get raw text first
//     let jsonResponse;
//     try {
//       jsonResponse = JSON.parse(responseData); // Try parsing JSON
//     } catch (e) {
//       console.error('Non-JSON response received:', responseData);
//       res.status(500).json({ message: 'Non-JSON response received', details: responseData });
//       return;
//     }

//     if (response.ok) {
//       console.log('GPS data sent successfully');
//       res.status(200).json({ message: 'GPS data sent successfully' });
//     } else {
//       console.error('Failed to send GPS data', jsonResponse);
//       res.status(500).json({ message: 'Failed to send GPS data', details: jsonResponse });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Error sending GPS data', error: error.message });
//   }
// });

//POST ROUTE FOR SENDING THE GPS DATA TO MAIN APP USING AXIOS
app.post('/send-gps', async (req, res) => {
  const { latitude, longitude, device_id } = req.body;

  try {
    const response = await axios.post('http://localhost:3000/receive-gps-data', {
      latitude,
      longitude,
      device_id,
    });

    if (response.status === 200) {
      console.log('GPS data sent successfully');
      res.status(200).json({ message: 'GPS data sent successfully' });
    } else {
      console.error('Failed to send GPS data', response.data);
      res.status(500).json({ message: 'Failed to send GPS data', details: response.data });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error sending GPS data', error: error.message });
  }
});

//POST ROUTE FOR SENDING DATA TO THE MAIN APP USING LOCAL NETWORK
// app.post('/send-gps', async (req, res) => {
//   const { latitude, longitude, device_id } = req.body;

//   try {
//     const response = await axios.post(`http://${LOCAL_IP}:3000/receive-gps-data`, {
//       latitude,
//       longitude,
//       device_id,
//     });

//     if (response.status === 200) {
//       console.log('GPS data sent successfully');
//       res.status(200).json({ message: 'GPS data sent successfully' });
//     } else {
//       console.error('Failed to send GPS data', response.data);
//       res.status(500).json({ message: 'Failed to send GPS data', details: response.data });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Error sending GPS data', error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Secondary app running at http://localhost:${PORT}`);
});
