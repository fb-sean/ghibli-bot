const { Embed } = require("interactions.js");
const axios = require("axios");

module.exports = {
  name: "vehicle",
  description: "Display information about a Ghibli Studio vehicle",
  options: [
    {
      name: "name",
      description: "The vehicle name you want to get information about",
      type: 3,
      required: true,
    },
  ],

  async execute(interaction, client) {
    const errorembed = new Embed()
      .setTitle("Error")
      .setColor("#FF0000")
      .setDescription("The vehicle name you provided is invalid!");
    let vehicleEmbed = new Embed();
    let string = interaction.options.getStringOption("name").value;

    let vehicledata;
    let pilotdata;
    await axios({
      method: "get",
      url: `https://ghibli.rest/vehicles?search=${string}`,
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
          vehicledata = res.data[0];
          if (vehicledata.pilot) {
            await axios({
              method: "get",
              url: vehicledata.pilot,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }).then(async (res) => {
              pilotdata = res.data[0];
            });
          }

          vehicleEmbed
            .setTitle(vehicledata.name)
            .setDescription(vehicledata.description)
            .setColor("#2B2D31")
            .addFields([
              {
                name: "Vehicle Class",
                value: vehicledata.vehicle_class,
                inline: true,
              },
              {
                name: "Lenght",
                value: vehicledata.length + "meters",
                inline: true,
              },
              {
                name: "Pilot",
                value: `[${pilotdata.name}](${vehicledata.pilot})`,
                inline: false,
              },
            ])
            .setImage(vehicledata.image);

          return interaction
            .followUp({
              embeds: [vehicleEmbed],
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  },
};
