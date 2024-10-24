const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const MAX_RESULTS = 1000;
const RESULTS_PER_PAGE = 20;

async function fetchBusinesses(city, segment) {
    const businesses = [];
    let nextPageToken = null;
    let totalResults = 0;

    const query = `${segment} in ${city}`;

    do {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}${nextPageToken ? `&pagetoken=${nextPageToken}` : ''}`;
        
        const response = await axios.get(url);
        const results = response.data.results;

        for (let result of results) {
            // Obtem informações detalhadas de cada empresa usando o place_id
            const details = await getBusinessDetails(result.place_id);

            businesses.push({
                name: result.name || "N/A",
                address: result.formatted_address || "N/A",
                phone: details.phone || "N/A",
                website: details.website || "N/A",
                email: "N/A" // O email não é retornado pela API
            });

            totalResults++;
            if (totalResults >= MAX_RESULTS) break;
        }

        nextPageToken = response.data.next_page_token;

        if (nextPageToken) {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Aguarda 2 segundos
        }
    } while (nextPageToken && totalResults < MAX_RESULTS);

    return businesses.slice(0, MAX_RESULTS);
}

// Função para buscar detalhes da empresa usando Place Details API
async function getBusinessDetails(placeId) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,website&key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        const details = response.data.result;

        return {
            phone: details.formatted_phone_number || null,
            website: details.website || null
        };
    } catch (error) {
        console.error(`Erro ao obter detalhes da empresa (place_id: ${placeId}):`, error);
        return { phone: null, website: null };
    }
}

module.exports = { fetchBusinesses };


