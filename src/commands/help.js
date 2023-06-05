const { Embed } = require("interactions.js");
require("dotenv").config();

module.exports = {
  name: "help",
  description: "Get a list of all available commands",

  async execute(interaction, client) {
    const help = new Embed()
      .setTitle("Ghibli.rest | Help menu")
      .setColor("#2B2D31")
      .setDescription(
        "A bot that displays information about Studio ghibli based on the **[ghibli.rest](https://ghibli.rest/)** API. \n\n**Commands:**"
      )
      .addFields([
        {
          name: "</movie:1113190251263967242>",
          value: "Search for a ghibli related movie and display information about it.",
          inline: false,
        },
        {
          name: "</location:1113486030251765791>",
          value: `Search for a ghibli related location and display information about it.`,
          inline: false,
        },
        {
          name: "</people:1114539739828211744>",
          value: `Search for a ghibli related person and display information about it.`,
          inline: false,
        },
        {
          name: "</species:1114541486806138950>",
          value: `Search for a ghibli related species and display information about it.`,
          inline: false,
        },
        {
          name: "</vehicle:1113226867227512862>",
          value: `Search for a ghibli related vehicle and display information about it.`,
          inline: false,
        },
        {
          name: "</donate:1114536546310303794>",
          value: `Help to keep our API free for everyone through a small donation!`,
          inline: false,
        },
      ]);

      interaction
        .followUp({
          embeds: [help],
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
