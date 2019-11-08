// const config = require("./config");
// import key from './config';
const key = require('./secrets');
const twit = require("twit");
const T = new twit(key);

function retweet() {
  let params = {
    q: "#sevenworldsoneplanet, pet",
    count: 10
  };

  T.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;
    console.log(tweets)
    
    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (response) console.log("Success! I retweeted this one! " + retweetId);
          if (err)
            console.log(
              "Uh-oh culdn't retweet this one, I might have already retweeted it."
            );
        });
      }
    }
  });
}
setInterval(retweet, 120000);
