const express = require("express");
const redis = require("ioredis");
const app = express();

const process = require("process");

//connection to redis server
const client = redis.createClient({
  host: "redis-server",
  port: 6379, //default redis server
});

client.on("connect", () => {
  console.log("connected to redis successfully!");
});
client.on("error", (err) => console.log("Redis Client Error", err));

client.set("visits", 0); //key,value

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send(`Number of visits: ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port: ${port}`));
