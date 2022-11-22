const Discord = require("discord.js");

module.exports = {
  name: "anuncio1",
  description: "Enviar anuncio.",
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction, args) => {
        if(!interaction.member.permissions.has("ADMINISTATOR")) return interaction.reply("**Desculpa mas você não tem permissão de \`Funcionario\`!")

        let embedchat = new Discord.EmbedBuilder()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("**Escreva o id do canal que sera enviado a embed de venda!** ")

        let embed1 = new Discord.EmbedBuilder()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("**Escreva o nome do produto! **")

        let embed2 = new Discord.EmbedBuilder()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("**Escreva a quantidade disponivel do produto! **")

        let embed_erro = new Discord.EmbedBuilder()
        .setColor("FF0000")
        .setDescription(`${interaction.author} Não foi possível reconhecer um canal de texto.`);


        let embed3 = new Discord.EmbedBuilder()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("**Escreva o preço do produto! **")

        interaction.reply({ embeds: [embedchat] }).then(msg => {
            let coletor_1 = interaction.channel.createMessageCollector({ filter: mm => mm.author.id == interaction.author.id, max: 1 });
            coletor_1.on("collect", (p1) => {
                let chat = p1.mentions.channels.first() || interaction.guild.channels.cache.get(p1.content);
                if(!chat) {
                    p1.reply({ embeds: [embed_erro] })
                } else 
                if(chat) {
                interaction.reply({ embeds: [embed1] }).then(msg => {
                    let coletor_2 = interaction.channel.createMessageCollector({ filter: mm => mm.author.id == interaction.author.id, max: 1 });
                    coletor_2.on("collect", (p2) => {
                        let b2 = p2.content
                        interaction.reply({ embeds: [embed2] }).then(msg => {
                            let coletor_3 = interaction.channel.createMessageCollector({ filter: mm => mm.author.id == interaction.author.id, max: 1 });
                            coletor_3.on("collect", (p3) => {
                                let b3 = p3.content
                                interaction.reply({ embeds: [embed3] }).then(msg => {
                                    let coletor_4 = interaction.channel.createMessageCollector({ filter: mm => mm.author.id == interaction.author.id, max: 1 });
                                    coletor_4.on("collect", (p4)  => {
                                        let b4 = p4.content
                                        interaction.reply("**Sua embed de venda foi enviada para o canal!** ").then(msg => {


                                            let stockenvia = new Discord.EmbedBuilder()
                                            .setColor("RED")
                                            .setDescription(`**${interaction.guild.name} | Venda Automático**`)
                                            .setImage(interaction.guild.iconURL({ dynamic: true}))
                                            .addFields(
                                                {
                                                    name:   "✨ |  Nome: ",
                                                    value:  `**${b2}**`,
                                                },
                                                {
                                                    name:   "💰 | Stock: ",
                                                    value:  `**${b3}**`,
                                                },
                                                {
                                                    name:   "🛒 | Preço: ",
                                                    value:  `**${b4}**`,
                                                }
                                                
                                            )

                                            let buttons = new Discord.ActionRowBuilder()
                                            .addComponents(
                                                new Discord.ButtonBuilder()
                                                    .setCustomId('1')
                                                    .setStyle('SUCCESS')
                                                    .setLabel('COMPRAR')
                                                    .setEmoji('✅')
                                                    .setDisabled(false),
                                            )
                                            chat.send({ embeds: [stockenvia], components: [buttons]}).then(sla => {
                                                const filter = i => i.isButton();
                                                const collector3 = sla.createMessageComponentCollector({ filter: filter, time: 6e4 });
                                                collector3.on("collect", async (interaction) => {
                                                    if (interaction.user.id !== interaction.author.id) return;
                                    
                                                    
                                                    switch (interaction.customId) {
                                                        case '1': {
                                                            interaction.guild.channels.create('COMPRA', {
                                                                type: 'GUILD_TEXT',
                                                                permissionOverwrites: [
                                                                    {
                                                                        id: interaction.guild.roles.everyone,
                                                                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MENTION_EVERYONE']
                                                                    },
                                                                    {
                                                                        id: interaction.author.id,
                                                                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                                                                    }
                                                                ]
                                                                
                                                            }).then(emb1 => {



                                                                let buttons1 = new Discord.ActionRowBuilder()
                                                                .addComponents(
                                                                    new Discord.ButtonBuilder()
                                                                        .setCustomId('2')
                                                                        .setStyle('DANGER')
                                                                        .setLabel('FECHAR TICKET')
                                                                        .setEmoji("❌")
                                                                        .setDisabled(false),
                                                                )


                                                                let enviar1 = new Discord.EmbedBuilder()
                                                                .setColor("DARK_AQUA")
                                                                .setThumbnail(interaction.guild.iconURL({ dynamic: true}))
                                                                .setAuthor(interaction.author.tag, interaction.author.displayAvatarURL({format: "png"}))
                                                                .setDescription(`**Olá ${interaction.author} VOCÊ CRIOU UM TICKET DE COMPRA!\n\nPIX: sla132@gmail.com**`) // colocar seu pix
                                                                emb1.send({ embeds: [enviar1], components: [buttons1]}).then(msss => {
                                                                    const filter = i => i.isButton();
                                                                    const collector = msss.createMessageComponentCollector({ filter: filter, time: 6e4 });
                                                                    collector.on("collect", async (interaction) => {
                                                                        if (interaction.user.id !== interaction.author.id) return;

                                                                        switch (interaction.customId) {
                                                                            case '2': {
                                                                               emb1.delete()
                
                                                                            }

                                                                        }
                                                                    })
                                                                })
                                                                
                                                            })
                                                        }

                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
            })
        })
    }
}
