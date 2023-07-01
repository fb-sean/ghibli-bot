const {Embed} = require("interactions.js");
const axios = require("axios");

module.exports = {
    name: "movie",
    description: "Display information about a Ghibli Studio movie",
    options: [
        {
            name: "title",
            description: "The movie title you want to get information about",
            type: 3,
            required: true,
            autocomplete: true,
        },
    ],

    async autoComplete(interaction, client) {
        const input = interaction.options.getStringOption("title")?.value ?? '';

        return interaction.sendAutoComplete([
            {
                name: "Test",
                value: "placeholder",
            }
        ]);

        axios
            .get('https://ghibli.rest/films?search=' + input, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
            .then(res => {
                const {
                    data,
                    status
                } = res;

                if (status !== 200) return interaction.sendAutoComplete([
                    {
                        name: "Cannot find any movie with that title.",
                        value: "placeholder",
                    }
                ]);

                interaction.sendAutoComplete(data.map(movie => {
                    return {
                        name: movie.title,
                        value: movie.title,
                    }
                }).slice(0, 25));

                console.log('Took: ' + (Date.now() - interaction.autoCompleteStart) + 'ms');
            })
            .catch(error => {
                console.error(error);
                return interaction.sendAutoComplete([
                    {
                        name: "Cannot find any movie with that title.",
                        value: "placeholder",
                    }
                ]);
            });
    },
    async execute(interaction, client) {
        const errorembed = new Embed()
            .setTitle("Error")
            .setColor("#FF0000")
            .setDescription("The movie title you provided is invalid!");
        let movieEmbed = new Embed();

        let string = interaction.options.getStringOption("title").value;

        let filmdata;
        await axios({
            method: "get",
            url: `https://ghibli.rest/films?search=${string}`,
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
                    filmdata = res.data[0];
                    movieEmbed
                        .setTitle(filmdata.title)
                        .setDescription(filmdata.description)
                        .setColor("#2B2D31")
                        .addFields([
                            {
                                name: "Original Title",
                                value: `${filmdata.original_title} ||${filmdata.original_title_romanised}||`,
                                inline: false,
                            },
                            {name: "Director", value: filmdata.director, inline: true},
                            {name: "Producer", value: filmdata.producer, inline: true},
                            {name: "Release", value: filmdata.release_date, inline: false},
                            {name: "Runtime", value: filmdata.running_time, inline: true},
                        ])

                        .setImage(filmdata.image)
                        .setThumbnail(filmdata.movie_banner);

                    return interaction
                        .followUp({
                            embeds: [movieEmbed],
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
    },
};
