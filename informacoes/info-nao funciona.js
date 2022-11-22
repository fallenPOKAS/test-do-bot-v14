const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "info",
    description: "[Info] Configure os sistemas.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [ 
        {
            name: "userinfo",
            description: "[Info] Veja as Informações de um usuario.",
            type: Discord.ApplicationCommandOptionType.Subcommand,//"SUB_COMMAND",
            options: [
                {
                    name: "usuario",
                    description: "Selecione um usuario.",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: false,
                }
            ],
        },  
    ],

    run: async (client, interaction, t) => {

        switch (interaction.options.getSubcommand()) {


case "userinfo": {
  
    const user = interaction.options.getUser("usuario") || interaction.user;
    const server = interaction.guild.members.cache.get(user.id);
    let presence;
//    if (!server.presence.activities.length) presence = "Nenhum";
//    else presence = server.presence.activities.join(", ");
  
    const row = new MessageActionRow();

    let but1 = new MessageButton()
    .setLabel('Cargos filosóficos')
    .setStyle('SECONDARY')
    .setEmoji(`<:cargo:1032636097034985552>`)
    .setCustomId('config')

    row.addComponents([but1]);
    

    let embed = new MessageEmbed()
      .setColor('WHITE')
      .setFooter({ text: `Comando Solicitado Por ${interaction.user}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .addFields(
        { name: `<:lapis:1033035121512685608> | Nome`, value: `${user.username}`, inline: true },
        { name: "<:tag:1033034706251415652> | Tag", value: `${user.discriminator}`, inline: true },
        { name: "<:ID:1021956840029962280> | ID", value: `${user.id}`, inline: true },
        {
          name: "📌 | Status",
          value: `\`\`\`${presence}\`\`\``,
        },
        {
          name: "🗓️ | Conta Criada",
          value: `<t:${Math.ceil(user.createdTimestamp / 1000)}>`,
        },
        {
          name: "🗓️ | Entrada no Servidor",
          value: `<t:${Math.ceil(server.joinedTimestamp / 1000)}:F>`,
        },
        {
          name: "🤖 | Bot:",
          value: `${user.bot ? "Sim" : "Não"}`,
          inline: true,
        },
        {
          name: `🚀 | Server Booster`,
          value: `${server.premiumSince
            ? `Desde <t:${Math.ceil(server.premiumSinceTimestamp / 1000)}>`
            : "Não"
            }`,
          inline: true,
        }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }));

    const embedbutt = new MessageEmbed()
      .setColor('WHITE')
      .setTitle("Cargos filosóficos")
      .setFooter({ text: `Comando Solicitado Por ${interaction.user}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`${server.roles.cache
        .sort((a, b) => b.position - a.position)
        .filter((role) => role != interaction.guild.roles.everyone)
        .map((role) => role)
        .join(" ") || `Nenhum`
        }`)

    interaction.reply({ embeds: [embed], components: [row], fetchReply: true }).then(async (msg) => {

      const filter = user => user
      const collector = msg.createMessageComponentCollector({ filter: filter, time: 100000})

      collector.on('collect', (x) => {
        x.reply({ embeds: [embedbutt], ephemeral: true })
    })

      setTimeout(() => {
          msg.delete()
      }, 100000)
  });

  } break;

      }
  }
}; 
