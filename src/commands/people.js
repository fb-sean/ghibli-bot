const { Embed } = require("interactions.js");
const axios = require("axios");

module.exports = {
  name: "person",
  description: "Display information about a Ghibli Studio person",
  options: [
    {
      name: "name",
      description: "The persons name you want to get information about",
      type: 3,
      required: true,
    },
  ],

  async execute(interaction, client) {
    const errorembed = new Embed()
      .setTitle("Error")
      .setColor("#FF0000")
      .setDescription("The person name you provided is invalid!");
    let personEmbed = new Embed();

    let string = interaction.options.getStringOption("name").value;

    let persondata;
    await axios({
      method: "get",
      url: `https://ghibli.rest/people?search=${string}`,
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
            persondata = res.data[0];
            personEmbed
            .setTitle(persondata.name)
            .setColor("#2B2D31")
            .addFields([
              { name: "Gender", value: persondata.gender, inline: true },
              { name: "Age", value: persondata.age + "\n", inline: false },
              { name: "Eye Color", value: persondata.eye_color + " " + ":" + persondata.eye_color.toLowerCase() + "_circle" + ":", inline: true },
              { name: "Hair Color", value: persondata.hair_color + " " + ":" + persondata.hair_color.toLowerCase() + "_circle" + ":", inline: true },
            ])

          return interaction
            .followUp({
              embeds: [personEmbed],
            })
            .catch((err) => {
              console.log(err);
            });
        } 
      });
  },
};
