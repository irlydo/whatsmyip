// pages/api/getUserIpInfo.js
export default async function handler(req, res) {
  // Extract the IP address from query parameters
  const ip = req.query.ip;
  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  const response = await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`);
  const data = await response.json();
  res.status(200).json(data);
}
