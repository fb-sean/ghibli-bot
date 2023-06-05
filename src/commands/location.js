const { Embed } = require("interactions.js");
const axios = require("axios");

const emojiMapping = {
  Continental: "🌍",
  Mild: "😊",
  Tropical: "🌴",
  TODO: "📝",
  Dry: "🌵",
  Wet: "💦",
};

module.exports = {
  name: "location",
  description: "Display information about a Ghibli Studio location",
  options: [
    {
      name: "name",
      description: "The location name you want to get information about",
      type: 3,
      required: true,
    },
  ],

  async execute(interaction, client) {
    const errorembed = new Embed()
      .setTitle("Error")
      .setColor("#FF0000")
      .setDescription("The location name you provided is invalid!");
    let locationEmbed = new Embed();
    let string = interaction.options.getStringOption("name").value;

    let locationdata;
    await axios({
      method: "get",
      url: `https://ghibli.rest/locations?search=${string}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .catch((err) => {
        return interaction
          .followUp({
            embeds: [errorembed],
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(async (res) => {
        if (res.data !== null) {
          locationdata = res.data[0];
          locationEmbed
            .setTitle(locationdata.name)
            .setColor("#2B2D31")
            .addFields([
              {
                name: "Climate",
                value:
                  locationdata.climate +
                  " " +
                  emojiMapping[locationdata.climate],
                inline: true,
              },
              { name: "Terrain", value: locationdata.terrain, inline: true },
              {
                name: "Surface Water",
                value: locationdata.surface_water,
                inline: true,
              },
            ]);

          return interaction
            .followUp({
              embeds: [locationEmbed],
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  },
};
