const { Embed } = require("interactions.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  name: "donate",
  description: "Help to keep our API free for everyone through a small donation!",

  async execute(interaction, client) {
    let donate = new Embed()
      .setTitle("Support Ghibli.rest!")
      .setColor("#2B2D31")
      .setDescription("If you want to support our work and keep ghibli.rest free you might want to consider [donating](https://donate.ghibli.rest/)!")
      
      interaction
        .followUp({
          embeds: [donate],
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
