const Discord = require("discord.js")

module.exports = {
  name: "help", // Coloque o nome do comando
  description: "Painel de comandos do bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    /*const embed = new MessageEmbed()
        .setColor("#1853c9")//#71368A
        .setThumbnail(message.guild.iconURL({ dynamic : true, format: "png", size: 1024}))
        .setTitle("**Atendimento**")
        .setDescription("Ola, Seja bem vindo a central de atendimento da **Fusion Store**.\n\nClique na categoria de acordo com o Assunto que deseja tratar via ticket.")
        //.setFooter({text: ` © Todos os direitos reservados` , message.guild.name, message.guild.iconURL({ dynamic: true })});
        .setFooter({text: `${message.guild.name} © Todos os direitos reservados` ,  iconURL: message.guild.iconURL ({ dynamic: true,format: "png", size: 16 })}); 
        const MSM = new MessageSelectMenu()
        .setCustomId('ticket')
        .setPlaceholder('Escolher uma categoria')
        for(let obj of TicketMain){
            MSM.addOptions({label : obj.label, value: obj.value, description: obj.description, emoji: obj.emoji})
        }*/

    let embed_painel = new Discord.EmbedBuilder()
    .setColor("Aqua")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos interagindo com o painel abaixo:`);

    let embed_utilidade = new Discord.EmbedBuilder()
    .setColor("Aqua")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos de **utilidade** abaixo:`);

    let embed_diversao = new Discord.EmbedBuilder()
    .setColor("Aqua")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos de **diversão** abaixo:`);

    let embed_adm = new Discord.EmbedBuilder()
    .setColor("Aqua")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos de **administração** abaixo:`);

    let painel = new Discord.ActionRowBuilder().addComponents(
        new Discord.SelectMenuBuilder()
            .setCustomId("painel_help")
            .setPlaceholder("Clique aqui!")
            
            .addOptions(
                {
                    label: "Painel Inicial",
                    //description: "",
                    emoji: "📖",
                    value: "painel"
                },
                {
                    label: "Utilidade",
                    description: "Veja meus comandos de utilidade.",
                    emoji: "✨",
                    value: "utilidade"
                },
                {
                    label: "Diversão",
                    description: "Veja meus comandos de diversão.",
                    emoji: "😅",
                    value: "diversao"
                },
                {
                    label: "Administração",
                    description: "Veja meus comandos de administração.",
                    emoji: "🔨",
                    value: "adm"
                }
            )
    )
                /*{
                    label: 'VPS | Anti-DDoS',
                    description: "Crie um canal para realizar a compra relacionada a Host.",
                    emoji: '🚀',
                    value: 'vps'
                    },
                    {
                        label: 'TEAMSPEAK 3',
                        description: "Crie um canal para realizar a compra relacionada a TeamSpeak 3.",
                        //emoji: '<:fusionstore:984283868322463744>',
                        //emoji: '<:K_humm:939225711678459934>',
                        emoji: "🤖",
                        value: 'ts3',
                    },
                    {
                        label: 'KEY PATREON',
                        description: "Crie um canal para realizar a compra relacionada a Key Patreon.",
                        //emoji: '<:fusionstore:984283868322463744>',
                        //emoji: '<:K_humm:939225711678459934>',
                        emoji: "🔑",
                        value: 'key',
                    },
                    {
                        label: 'SERVIÇOS/PROGRAMAÇÃO',
                        description: "Crie um canal para realizar o orcamento de seu serviço/programação.",
                        //emoji: '<:fusionstore:984283868322463744>',
                        //emoji: '<:K_humm:939225711678459934>',
                        emoji: "⌨️",
                        value: 'servicos',
                    },
                    {
                        label: ' Duvidas',
                        description: "Suporte sobre nossos produtos/serviços.",
                        emoji: "❓",
                        //emoji: '<:duvidas:992291796967227442>',
                        value: 'duvidas',
                    },
                    {
                        label: 'Parceria.',
                        description: "Para fechar uma parceria conosco.",
                        emoji: '🤝',
                        value: 'parceria',
                    }
            )
    )

    function makeid(length) {
        var result = "";
        var characters = "0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    if (interaction.customId !== "ticket") return;
    if (ticket) return interaction.reply({ content: "Você já possui um ticket aberto!", ephemeral: true });
    const val = new Date().getTime();
    const numerosaleatorios = makeid(10);
    if (interaction.values[0]){ // == vps && key && ts3
    let channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}-${interaction.values[0]}-${val}${numerosaleatorios}${interaction.user.discriminator}`, {
        type: "text",
        permissionOverwrites: [
            {
                id: client.user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
            },
            {
                id: interaction.user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
            },
            {
                id: interaction.guild.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
            },
        ]
    });
    interaction.reply({ content: "Seu ticket foi aberto com sucesso! <#" + channel.id + ">", ephemeral: true });
}
    else if (interaction.values[0] == servicos && duvidas && parceria){
        let channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}-${interaction.values[0]}-${val}${numerosaleatorios}${interaction.user.discriminator}`, {
            type: "text",
            permissionOverwrites: [
                {
                    id: client.user.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                },
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                },
            ]
        });
        interaction.reply({ content: "Seu ticket foi aberto com sucesso! <#" + channel.id + ">", ephemeral: true });
    }*/
    

    interaction.reply({ embeds: [embed_painel], components: [painel], ephemeral: true }).then( () => {
        interaction.channel.createMessageComponentCollector().on("collect", (c) => {
            let valor = c.values[0];

           if (valor === "painel") {
              c.deferUpdate()
               interaction.editReply({ embeds: [embed_painel] })
          } else if (valor === "utilidade") {
               c.deferUpdate()
               interaction.editReply({ embeds: [embed_utilidade] })
           } else if (valor === "diversao") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_diversao] })
           } else if (valor === "adm") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_adm] })
            }
        })
    })
    
  }
}