// pages/api/getUserIpInfo.js
export default async function handler(req, res) {
  let ip = req.query.ip;
  
  // If no IP provided, attempt to use the requester's IP
  // Note: This might not always be the client's public IP due to NATs, proxies, etc.
  if (!ip) {
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // You might want to validate or process the IP further here
  }

  // Proceed to fetch information using ipinfo.io
  const response = await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`);
  const data = await response.json();
  res.status(200).json(data);
}
