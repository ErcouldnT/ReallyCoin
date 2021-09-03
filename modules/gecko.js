const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const gecko = async (page) => {
  try {
    // const data = await CoinGeckoClient.coins.list();  // 9.216 coins
    const data = await CoinGeckoClient.coins.all({
      per_page: 250,  // max: 250, default: 50
      page: page,  // current max: 37, returns if .length !== 0;
      localization: true,
      sparkline: true
    });
  
    return data.data
  } catch (error) {
    return []
  };
};

// gecko();
module.exports = gecko;
