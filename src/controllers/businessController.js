const businessService = require('../services/businessService');

exports.getBusinesses = async (req, res) => {
    const { city, segment } = req.query; // Obtém os filtros da requisição
    let businesses = [];

    if (city && segment) {
        businesses = await businessService.fetchBusinesses(city, segment);
    }

    res.render('index', { businesses });
};
