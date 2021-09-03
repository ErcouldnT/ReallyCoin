const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  symbol: String,  // maybe indexing this could be better
  name: String,
  block_time_in_minutes: String,
  image: {
    thumb: String,
    small: String,
    large: String,
  },
  market_data: {
    current_price: {},
    roi: {},
    market_cap: {},
    market_cap_rank: Number,
    total_volume: {},
    high_24h: {},
    low_24h: {},
    price_change_24h: Number,
    price_change_percentage_24h: Number,
    price_change_percentage_7d: Number,
    price_change_percentage_14d: Number,
    price_change_percentage_30d: Number,
    price_change_percentage_60d: Number,
    price_change_percentage_200d: Number,
    price_change_percentage_1y: Number,
    market_cap_change_24h: Number,
    market_cap_change_percentage_24h: Number,
    price_change_24h_in_currency: {},
    price_change_percentage_1h_in_currency: {},
    price_change_percentage_24h_in_currency: {},
    price_change_percentage_7d_in_currency: {},
    price_change_percentage_14d_in_currency: {},
    price_change_percentage_30d_in_currency: {},
    price_change_percentage_60d_in_currency: {},
    price_change_percentage_200d_in_currency: {},
    price_change_percentage_1y_in_currency: {},
    market_cap_change_24h_in_currency: {},
    market_cap_change_percentage_24h_in_currency: {},
    total_supply: String,
    circulating_supply: String,
    sparkline_7d: {}
  },
  last_updated: Date,
  localization: {}
}, {
  timestamps: true
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
