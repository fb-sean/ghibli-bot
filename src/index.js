const { Application } = require("interactions.js");
require("dotenv").config();

/* Initialize client */
const client = new Application({
  botToken: process.env.TOKEN,
  publicKey: process.env.PUBLICKEY,
  applicationId: process.env.APPLICATIONID,
  port: 6544,
});

client.on("debug", (debug) => console.log(debug));

const ghibliComponents = async () => {
  await require("./util/ghibliClient")(client);
};

ghibliComponents();
