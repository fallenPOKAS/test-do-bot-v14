const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "emoji-id",
  description: "Obter ID de um emoji",
  options: [
      {
        name: "emoji",
        description: "Nome do emoji para obter o ID",
        required: true,
        type: ApplicationCommandOptionType.String,
      }
  ],
  run: async (client, interaction, args) => {
      if (interaction.options.getString('emoji') === undefined) {
          return interaction.reply({content: "Especifique um emoji para obter o ID dele.", ephemeral: true});
      }
      const nomeEmoji = interaction.options.getString('emoji');
      const emoji = client.emojis.cache.find(emoji => emoji.name === nomeEmoji);
    if (!emoji) {
      return interaction.reply({content: "Não foi possível encontrar o emoji com o nome fornecido. Verifique se o nome do Emoji está correto", ephemeral: true})
    }
     interaction.reply({content: 'ID DO EMOJI DA FORMA QUE TEM QUE SER USADO:\n```<:'+emoji.name+':'+emoji+'>```', ephemeral: true});
    /* let embed = new EmbedBuilder()
        .setColor("Random")
        .setThumbnail(interaction.guild.iconURL({ dynamic : true, format: "png", size: 1024}))
        .setTitle(`**BUSCAR O ID DO EMOJI **`)
        .setDescription('ID DO EMOJI DA FORMA QUE TEM QUE SER USADO: \n```<:'+ emoji.name+':'+ emoji+'>```')
        .setFooter({text: `${interaction.guild.name} © Todos os direitos reservados` ,  iconURL: interaction.guild.iconURL ({ dynamic: true,format: "png", size: 16 })}); 
        interaction.channel.send({ embeds: [embed], ephemeral: true})
    */

  },
};