const Discord = require('discord.js');

module.exports =  {
    name: "ping",
    description: "Ver o ping do bot.",
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction, args) => {
        interaction.reply({ content: `⚠ ${interaction.user} **O meu ping está em \`${client.ws.ping}\`ms **`, ephemeral: true })

    }
}