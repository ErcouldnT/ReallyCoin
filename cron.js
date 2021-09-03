const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Mongo connected!');
});

const Coin = require('./models/Coin');
const gecko = require('./modules/gecko');

const iterateOnPage = async (pages) => {
  console.time("Elapsed time");
  let count = 1;
  for (let i = 0; i < pages.length; i++) {  // for (const item of pages) {
    const item = pages[i];
    let data = await gecko(item + 1);
    if (data.length !== 0) {
      for (const c of data) {
        const coin = await Coin.findOneAndUpdate({ id: c.id }, c, {
          new: true,
          upsert: true,
          overwrite: true  // change this later.
        });
        console.log(count,"- Coin updated:", coin.name);
        count++;
      };
      if (item === pages[pages.length - 1]) {
        console.log('All coins have been updated.');
        console.timeEnd("Elapsed time");
        i = -1;
        count = 1;
        console.time("Elapsed time");
      };
      continue;
      // await new Promise(resolve => setTimeout(resolve, 5000));
    } else {
      console.log("Empty page or API request timed out.");
      // break;
      console.timeEnd("Elapsed time");
      i = -1;
      count = 1;
      console.time("Elapsed time");
      continue;
    };
  };
};

// iterateOnPage([...Array(1).keys()]).then(_ => console.log('All coins have been updated.'));

iterateOnPage([...Array(100).keys()]);

