module.exports = async (client, interaction) => {
    if(interaction.isCommand()) {
        interaction.deferReply()

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (err) {
            if (err) console.error(err);
            return interaction.editReply({
                content: 'An error occurred while executing that command.',
                ephemeral: true,
            });
        }
    }

    if(interaction.isAutoComplete()) {
        interaction.autoCompleteStart = Date.now();

        const command = client.commands.get(interaction.commandName);
        if (!command && command.autoComplete) return;

        try {
            await command.autoComplete(interaction, client);
        } catch (err) {
            if (err) console.error(err);
        }
    }
};
