const express = require("express");
const redis = require("redis");
const app = express();

//connection to redis server
const client = redis.createClient();
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send(`Number of visits: ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
