const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

const Coin = require('./models/Coin');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Mongo connected!');
});

process.setMaxListeners(Infinity);

const client = path.resolve('client', 'build');
app.use(express.static(client));
app.use(cors());
app.use(express.json());
app.enable('trust proxy');

// Get coin from symbol
app.get('/api/coin/:symbol', async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const coin = await Coin.findOne({ symbol: symbol.trim().toLowerCase() });
    if (coin) {
      res.json({
        rank: coin.market_data.market_cap_rank,
        symbol: coin.symbol,
        name: coin.name,
        price: coin.market_data.current_price,
        image: coin.image.large,
        lastupdate: coin.last_updated + 3
      });
    } else {
      res.json({
        message: "Coin not found."  // throw an error later.
      });
    }
  } catch (error) {
    next(error);
  }
});

// Get coin from symbol and exchange it -> to money
app.get('/api/coin/:symbol/:money', async (req, res, next) => {
  try {
    const { symbol, money } = req.params;
    const coin = await Coin.findOne({ symbol: symbol.trim().toLowerCase() });
    if (coin && coin.market_data.current_price[money.trim().toLowerCase()]) {
      res.json({
        rank: coin.market_data.market_cap_rank,
        symbol: coin.symbol,
        name: coin.name,
        price: coin.market_data.current_price[money.trim().toLowerCase()],
        image: coin.image.large,
        lastupdate: coin.last_updated + 3  // fix this
      });
    } else {
      res.json({
        message: "Check coin or money."  // throw an error later
      });
    }
  } catch (error) {
    next(error);
  }
});

// Get coin from coin name and help you to find easily
app.get('/api/coinname/:coinname', async (req, res, next) => {
  try {
    const { coinname } = req.params;
    const coin = await Coin.findOne({ name: new RegExp(coinname.trim().toLowerCase(),'ig') });
    if (coin) {
      res.json({
        rank: coin.market_data.market_cap_rank,
        symbol: coin.symbol,
        name: coin.name,
        price: coin.market_data.current_price,
        image: coin.image.large,
        lastupdate: coin.last_updated + 3
      });
    } else {
      res.json({
        message: "Coin not found."  // throw an error later.
      });
    }
  } catch (error) {
    next(error);
  }
});

// Get coin from coin name and help you to find easily -> to money
app.get('/api/coinname/:coinname/:money', async (req, res, next) => {
  try {
    const { coinname, money } = req.params;
    const coin = await Coin.findOne({ name: new RegExp(coinname.trim().toLowerCase(),'ig') });
    if (coin && coin.market_data.current_price[money.trim().toLowerCase()]) {
      res.json({
        rank: coin.market_data.market_cap_rank,
        symbol: coin.symbol,
        name: coin.name,
        price: coin.market_data.current_price[money.trim().toLowerCase()],
        image: coin.image.large,
        lastupdate: coin.last_updated + 3
      });
    } else {
      res.json({
        message: "Check coin or money."  // throw an error later.
      });
    }
  } catch (error) {
    next(error);
  }
});

// Coin symbol -> to Coin symbol exchange!
app.get('/api/coinex/:from/:to', async (req, res, next) => {
  try {
    const { from, to } = req.params;
    const coin1 = await Coin.findOne({ symbol: from.trim().toLowerCase() });
    const coin2 = await Coin.findOne({ symbol: to.trim().toLowerCase() });

    if (coin1 && coin2) {
      res.json({
        from: coin1.name,
        to: coin2.name,
        price_1: coin1.market_data.current_price.usd,  // uses USD
        price_2: coin2.market_data.current_price.usd,
        price: Number((coin1.market_data.current_price.usd / coin2.market_data.current_price.usd)),  // .toFixed(2)
        lastupdate_1: coin1.last_updated + 3,  // fix this
        lastupdate_2: coin2.last_updated + 3 
      });
    } else {
      res.json({
        message: "Check coin symbols."  // throw an error later
      });
    }
  } catch (error) {
    next(error);
  }
});

// List top coins by market cap
app.get('/api/cap/top/:number', async (req, res, next) => {
  try {
    const { number } = req.params;
    if (number <= 100 && number > 0) {
      const coins = await Coin.find(null,
      'image.large last_updated name symbol market_data.market_cap_rank market_data.current_price.usd', {
        sort: { market_cap_rank: 1 },
        skip: 0,
        limit: Number(number),
      }).exec();
      
      res.json(coins.sort((a, b) => a.market_data.market_cap_rank - b.market_data.market_cap_rank));
    } else {
      res.json({
        message: "Give number between 0 and 100."  // throw an error later.
      });
    }
  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(client, 'index.html'));
});

const server = app.listen(process.env.PORT || 5000, () => {
  const host = 'localhost';
  const port = server.address().port;
  console.log(`Server is up at http://${host}:${port}`);
});
