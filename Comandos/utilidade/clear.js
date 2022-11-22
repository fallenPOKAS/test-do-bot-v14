const wait = require("timers/promises").setTimeout;
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
  name: "clear",
  description: "Apagar mensagens do chat ou de um usuario.",
  type: Discord.ApplicationCommandType.ChatInput,
//  userPermissions: ["MANAGE_MESSAGES"],
//  botPermissions: ["MANAGE_MESSAGES"],
  options: [
    {
      name: "quantidade",
      description: "Informe a quantidade de mensagens que deseja apagar.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "usuario",
      description: "Selecione o usuário pelo qual deseja apagar as mensagens.",
      type:  Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    let amount = interaction.options.getString("quantidade");
    let User = interaction.options.getUser("usuario");
    let Response = new Discord.EmbedBuilder().setColor("Random");
    //let Response = new EmbedBuilder().setColor("Random");

    const Messages = await interaction.channel.messages.fetch();

    if (amount > 100) return interaction.reply({ content: `❌ | **Você pode apagar no máximo 100 mensagens por vez!**`, ephemeral: true })

    if (amount < 1) return interaction.reply({ content: `❌ | **Você não pode apagar menos de 1 mensagem!**`, ephemeral: true })

    if (User) {
      let i = 0;
      const filtered = [];
      (await Messages).filter((m) => {
        if (m.author.id === User.id && amount > i) {
          filtered.push(m);
          i++;
        }
      });
      interaction.channel.bulkDelete(filtered, true).then(async (messages) => {
        Response.setDescription(
          `**🪄 | Deletando __${messages.size}__ mensagens de ${User.tag}**.`
        );
        interaction.reply({
          embeds: [Response],
        });
        await wait(5000);
        interaction.deleteReply();
      });
    } else {
      interaction.channel.bulkDelete(amount, true).then(async (messages) => {
        Response.setDescription(
          `**🪄 | Deletando __${messages.size}__ mensagens.**`
        );
        interaction.reply({
          embeds: [Response],
        });
        await wait(5000);
        interaction.deleteReply();
      });
    }
  },
};
