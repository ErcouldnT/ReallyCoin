const axios = require('axios');
const cheerio = require('cheerio');

// Axios things
const getPage = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Cheerio things
const gecko = async () => {
  try {
    const url = `https://www.coingecko.com/tr`;
    const coins = [];
    const data = await getPage(url);
    const $ = cheerio.load(data);
    // console.log($.html());

    $('tbody tr').each((i, e) => {
      const $element = $(e);
      const q = $element.find('td.table-number').text().trim();
      const name = $element.find('td a.tw-hidden').text().trim();
      const flag = $element.find('td span.tw-hidden').text().trim();
      const price = $element.find('td.td-price.price').text().trim();
      const change1h = $element.find('td.change1h').text().trim();
      const change24h = $element.find('td.change24h').text().trim();
      const change7d = $element.find('td.change7d').text().trim();
      const lit = $element.find('td.lit').text().trim();
      const cap = $element.find('td.cap').text().trim();

      const coin = {
        q: Number(q),
        name,
        flag,
        price,
        change1h,
        change24h,
        change7d,
        lit,
        cap
      };
      coins.push(coin);
    });

    return coins;
    // return coins.sort((a, b) => a.price - b.price);
  } catch (error) {
    console.log(error);
  }
};

Promise.all([gecko()]).then(results => {
  console.log(results);
});

// module.exports = gecko;
