// const config = require("./config");
// import key from './config';
const key = require('./secrets');
const twit = require("twit");
const T = new twit(key);

function retweet() {
  let params = {
    q: "#sevenworldsoneplanet, monkey, pet",
    count: 10
  };

  T.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;
    console.log(tweets)
    
    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (response) console.log("SURPRISE BEECH THIS ONE WORKED " + retweetId);
          if (err)
            console.log(
              "Uhoh sth went wrong cuz UR STUPID"
            );
        });
      }
    }
  });
}
setInterval(retweet, 1500);
