const { Embed } = require("interactions.js");
const axios = require("axios");

module.exports = {
  name: "species",
  description: "Display information about a Ghibli Studio species",
  options: [
    {
      name: "name",
      description: "The species name you want to get information about",
      type: 3,
      required: true,
    },
  ],

  async execute(interaction, client) {
    const errorembed = new Embed()
      .setTitle("Error")
      .setColor("#FF0000")
      .setDescription("The person name you provided is invalid!");
    let speciesembed = new Embed();

    let string = interaction.options.getStringOption("name").value;

    let speciesdata;
    await axios({
      method: "get",
      url: `https://ghibli.rest/species?search=${string}`,
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
        if (res?.status === 200) {
            speciesdata = res.data[0];
            speciesembed
            .setTitle(speciesdata.name)
            .setColor("#2B2D31")
            .addFields([
              { name: "Classification", value: speciesdata.classification, inline: false },
              { name: "Eye Colors", value: speciesdata.eye_colors, inline: true },
              { name: "Hair Colors", value: speciesdata.hair_colors, inline: true },
            ])

          return interaction
            .followUp({
              embeds: [speciesembed],
            })
            .catch((err) => {
              console.log(err);
            });
        } 
      });
  },
};
