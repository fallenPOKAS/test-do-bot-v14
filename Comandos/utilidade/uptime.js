const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = {
  name: "uptime",
  description: "Ver há quanto tempo o bot esta online.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {

    if (interaction.guild.ownerId !== interaction.user.id) return interaction.reply({ content: `Apenas o meu dono pode utilizar este comando!`, ephemeral: true })
    {
    const uptime = moment.duration(interaction.client.uptime).format(" D [Dias], H [Horas], m [Minutos]");

    interaction.reply({ content: `${interaction.user}, Estou online faz: **${uptime}**`, ephemeral: true })
  }
    }
}