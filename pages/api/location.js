// pages/api/location.js
export default async function handler(req, res) {
    const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.connection.remoteAddress;
    // Use an environment variable for the token
    const response = await fetch(`https://ipinfo.io/?token=${process.env.IPINFO_TOKEN}`);
    
    if (response.ok) {
        const data = await response.json();
        res.status(200).json({ location: data.loc });
      } else {
        // Log or return more detailed error information
        const errorText = await response.text(); // Get the raw response text
        console.error(`Error fetching IP info: ${response.statusText}`, errorText);
        res.status(response.status).json({ error: `Failed to obtain location data: ${response.statusText}`, details: errorText });
      }
  }
