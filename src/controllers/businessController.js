const axios = require('axios');

const findBusinesses = async (req, res) => {
  const { city, segment, pageToken } = req.query;

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${segment || 'business'}+in+${city}&key=${apiKey}&pagetoken=${pageToken || ''}`;

    const response = await axios.get(url);
    const businesses = response.data.results.map(business => ({
      name: business.name,
      address: business.formatted_address,
      phone: business.formatted_phone_number || 'N/A',
      website: business.website || 'N/A',
    }));

    res.json({ businesses, nextPageToken: response.data.next_page_token });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Error fetching businesses' });
  }
};

module.exports = { findBusinesses };
