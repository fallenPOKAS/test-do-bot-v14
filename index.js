const Discord = require("discord.js")
const fs = require("fs")
const config = require("./config.json")
const discordTranscripts = require('discord-html-transcripts');
const { QuickDB } = require('quick.db')
const db = new QuickDB;

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });


module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})


const discord = require('discord.js');
const { durationTime } = require('util-stunks') 
        
        client.on("interactionCreate", async (interaction) => {
            if (interaction.isSelectMenu()) {
              let choice = interaction.values[0]
              const member = interaction.member
              const server = interaction.guild.members.cache.get(client.user.id)
          
              //Username
              if (interaction.isSelectMenu()) {
                if (choice === "cargos") {
              let embedCargos = new discord.EmbedBuilder()
               .setColor('Random')
               .setTitle(`Os cargos que eu estou no momento são: `)
               .setDescription(`- ${server.roles.cache.sort
                ((a, b) => b.position - a.position)
                .filter((role) => role != interaction.guild.roles.client.user)
                .map((role) => role).join("\n -") || `Nenhum`}`)
               .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

               interaction.reply({ embeds: [embedCargos],
              ephemeral: true
            })
        }  else if(choice === "config") {
            {
              
                let embedinvite = new discord.EmbedBuilder()
                .setTitle(`📌 - Invite`)
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setDescription(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scop=ebot`)
                

                 
                 interaction.reply({ embeds: [embedinvite], ephemeral: true })

            };
         };

    }


}
})


client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})
////////////////////////////////responder a mensões////////////////////////////////
/*client.on("messageCreate", message => {
    
  if (message.author.bot) return;
  if (message.channel.type == '')
  return
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  let embed = new Discord.MessageEmbed()
    .setFooter('Nicks bot')
    .setImage('https://media.discordapp.net/attachments/965746038315028522/995760403499987034/standard_2.gif')
  .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
  .setColor("RANDOM")
  .setDescription(`Sou Um Bot De Moderação,Diversão e Muito Mais!
Meu Prefixo é ${config.prefix}
Utilize ${config.prefix}help Para Ver Meu Comandos.

🛠️ | Meu Sevidor: [Suporte](Link do servidor de suporte)
😜 | Me Adicione: [Me Adicione](Link para adicionar o bot)
🎁 | Meu Site: Link do site`)
  message.reply({ embeds: [embed] })
  }
});*/
//////////////////////////anti crash///////////////////////////////
process.on('multipleResolves', (type, reason, promise) => {
  let canal_erros = (config.canal-erros)
  client.channels.cache.get("1044086615250841651").send(`⚠️ Erro Detectado 1: \` parte 1: ${type}\`\n・\`parte 2: ${promise}\`\n・\`parte 3: ${reason}\``)
  });
  process.on('unhandRejection', (reason, promise) => {
      client.channels.cache.get("1044086615250841651").send(`⚠️ Erro Detectado 2: \`parte 1: ${reason}\`\n・\`parte 2: ${promise}\``)
  });
  
  process.on('uncaughtException', (error, origin) => { 
  setTimeout(function(){ 
    
  const embed = new Discord.MessageEmbed()
  .setTitle(`⚠️ ERRO DETECTADO:`)
  .setDescription(`\`\`\`${error}\`\`\``)
  .setColor("#ffffff")
    client.channels.cache.get("1044086615250841651").send(embed)
  }, 1000); 
  });
  
  process.on('uncaughtExceptionMonitor', (error, origin) => { });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*fs.readdir("./eventos/", (err, files) => {
  if (err) console.error(err);
  let arquivojs = files.filter(f => f.split(".").pop() === "js");
  arquivojs.forEach((f) => {
      let props = require(`./eventos/${f}`);
      client.on(f.replace(".js", ""), (...args) => props.execute(client, ...args));
  });
});*/

///  Sistema de ticket
client.on("interactionCreate", async (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "painel_ticket") {
      let opc = interaction.values[0]
      if (opc === "opc1") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 1.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc2") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 2.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc3") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 3.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setLabel('Deletar o ticket')
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          )
          .addComponents(
            new Discord.ButtonBuilder()
          .setLabel('Adicionar')
          .setCustomId("adicionar_ticket")
          .setEmoji("<:user:992133595655311410>")
          .setStyle(Discord.ButtonStyle.Primary)
          )
          .addComponents(
            new Discord.ButtonBuilder()
          .setLabel('Remover')
          .setCustomId("remover_ticket")
          .setEmoji("<:user:992133595655311410>")
          .setStyle(Discord.ButtonStyle.Secondary)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "fechar_ticket") {
      interaction.channel.send("vc apertou o botao fechar")
      let embed = new Discord.EmbedBuilder()
      .setColor("Random")
        .setThumbnail(interaction.guild.iconURL({ dynamic : true, format: "png", size: 1024}))
        .setTitle("Atendimento")
        .setDescription("**Seu ticket sera excluído em 5 segundos...**")
      .setFooter({text: `${interaction.guild.name} © Todos os direitos reservados` ,  iconURL: interaction.guild.iconURL ({ dynamic: true,format: "png", size: 16 })}); 
      interaction.channel.send({ embeds: [embed] })
      //nteraction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos...`)
      setTimeout ( () => {
        try { 
          interaction.channel.delete()
        } catch (e) {
          return;
        }
      }, 5000)
    }
  
    else if (interaction.customId === "adicionar_ticket") {
      //console.log()
              interaction.channel.send("vc apertou o botao add")
              const modal = new Discord.ModalBuilder()
                .setCustomId('myModal')
			          .setTitle('My Modal');
                
                const IdUserAdicionarInput = new Discord.TextInputBuilder()
                .setCustomId('IdUserAdicionarInput')
                  // The label is the prompt the user sees for this input
                .setLabel("Coloque o id de quem você quer adicionar ao ticket")
                  // Short means only a single line of text
                .setStyle(Discord.TextInputStyle.Short)
                .setPlaceholder("Coloque o id de quem você quer adicionar ao ticket")
                .setRequired(true);
                console.log()

                const firstActionRow = new ActionRowBuilder().addComponents(IdUserAdicionarInput);
                modal.addComponents(firstActionRow);
                console.log()
                await interaction.showModal(modal);
           /* await interaction.deferUpdate();
                    interaction.channel.send({
                        embeds: [
                          new Discord.EmbedBuilder()
                            .setColor('2f3136')
                            .setDescription('Mencione um membro para adicionar ao ticket.')
                        ],
                    })                

                    const collector = msg.createMessageCollector({ filter: x => x.user.id == interaction.user.id, time: 120000, max: 1 });
                    collector.on('collect', async (message) => {
                    const member = message.mentions.members.first() || message.guild.members.cache.get(message.content);
                    print(member)
                        if(member) {
        
                          interaction.channel.send({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                    .setColor('2f3136')
                                    .setDescription(`${member} Foi adicionado(a) com sucesso ao ticket.`)
                                ],
                            })
                            
                            interaction.channel.permissionOverwrites.edit(member.id, {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true,
                                READ_MESSAGE_HISTORY: true
                            })
                        }
                    })
                  /*  await interaction.update({})
                interaction.channel.send({ embeds: [id] }).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                    const channel = interaction.channel

                const id = new Discord.MessageEmbed()
                    .setAuthor({ name: interaction.guild.name, IconURL: interaction.guild.iconURL() })
                    .setDescription('Me passe o id do user')
                    .setColor(`${config.cor}`)
                
                });

                const coletor = interaction.channel.createMessageCollector({ filter: m => m.author.id === interaction.user.id })

                coletor.on('collect', msg => {


                    const addmembro = msg.content

                    const adicionado = new Discord.MessageEmbed()
                        .setAuthor({ name: interaction.guild.name, IconURL: interaction.guild.iconURL() })
                        .setColor(`${config.cor}`)
                        .setDescription(`O user <@${addmembro}> foi adicionado no ticket com sucesso`)


                    interaction.followUp({ embeds: [adicionado] }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 5000);
                    });

                    channel.permissionOverwrites.edit(addmembro, {
                        VIEW_CHANNEL: true, SEND_MESSAGES: true

                    })

                })*/
  }
    else if (interaction.customId === "remover_ticket") {
             interaction.deferUpdate();
             interaction.channel.send({
                embeds: [
                  new Discord.EmbedBuilder()
                    .setColor('2f3136')
                    .setDescription('Mencione um membro para remover do ticket.')
                ],
            })

            const collector = interaction.channel.createMessageCollector({ filter: x => x.author.id == interaction.user.id, time: 120000, max: 1 });
            collector.on('collect', async (message) => {
                const member = message.mentions.members.first() || message.guild.members.cache.get(message.content);
                if(member) {

                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor('2f3136')
                            .setDescription(`${member} Foi removido(a) com sucesso do ticket.`)
                        ],
                    })
                    
                    message.channel.permissionOverwrites.edit(member.id, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false,
                        READ_MESSAGE_HISTORY: false
                    })
                }
            })
  }
} })



//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////  mensagem de boas vindas ////////////////////////////////

/*client.on("guildMemberUpdate", async (oldMember, newMember) => {

  const { guild } = newMember;

  const embed = new MessageEmbed()
      .setColor("PURPLE")
      .setAuthor({ name: `${newMember.user.username} impulsionou o servidor!`, iconURL: guild.iconURL({ dynamic: true, size: 512 }) })

  if (!oldMember.premiumSince && newMember.premiumSince) {

      const canvas = Canvas.createCanvas(800, 250);

      const ctx = canvas.getContext("2d");

      const background = await Canvas.loadImage("./Structures/Images/boosterImage.png");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#FF0000";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.font = "38px cursive";
      ctx.textAlign = "center"
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(newMember.displayName, canvas.width / 2, canvas.height / 1.2);

      const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: "jpg" }));

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, 25, 25, 200, 200);

      const attachment = new MessageAttachment(canvas.toBuffer(), `boost-${guild.name}-${newMember.user.username}.png`);

      embed.setDescription(`Obrigado por impulsionar o servidor!`)
      embed.setImage(`attachment://boost-${guild.name}-${newMember.user.username}.png`)
  }
})*/




client.on("interactionCreate", async interaction => {
  if (interaction.isSelectMenu()) {
     let choice = interaction.values[0]
     const member = interaction.member
     const guild = interaction.guild
   if(choice == 'duvida') {
       let embedDuvida = new Discord.EmbedBuilder()
        .setColor('Random')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setDescription(`- **Caso haja alguma dúvida em relação ao Ticket, abra ele e nós vamos retira-la!**`)
       interaction.reply({ embeds: [embedDuvida], ephemeral: true})
   } 
     
    else if (choice == 'ticket') {     
       if (interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`)) {
           let canal = interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`);

let jaTem = new Discord.EmbedBuilder()
.setDescription(`❌ **Calma! Você já tem um ticket criado em: ${canal}.**`)
.setColor('Red')
         
interaction.reply({ embeds: [jaTem], ephemeral: true })
       } else {

           let cargoTicket = await db.get("cargoModerate.cargoM"); //Cargo dos STAFF's
           let CategoriaTicket = await db.get('Categoria.Categoria') //Categoria que o Ticket será criado
          
           guild.channels.create({
             
               name: `ticket-${member.id}`,
               type: 0, 
               parent: `${CategoriaTicket.id}`, //Categoria
               topic: interaction.user.id, 
               permissionOverwrites: [
                   {
                       id: interaction.guild.id,
                       deny: ["ViewChannel"]
                   },
                   {
                       id: member.id,
                       allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
                   },
                  {
                       id: cargoTicket.id,  //Cargo STAFF
                       allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
                   }
               ]
               
             }).then( (ca) => {
               interaction.reply({ content: `**💾 - Criando Ticket...**`, ephemeral: true }).then( () => {
                   setTimeout( () => {
                       let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                           new Discord.ButtonBuilder()
                           .setLabel(` - Ticket`)
                           .setEmoji(`🎫`)
                           .setStyle(5)
                           .setURL(`https://discord.com/channels/${interaction.guild.id}/${ca.id}`)
                       )
                       interaction.editReply({ content: `**💾 - Ticket criado na categoria!**`, ephemeral: true, components: [direciandoaocanal] })
                   }, 670)
               })

                let embedCanalTicket = new Discord.EmbedBuilder()
                 .setColor('Random')
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setThumbnail(`${client.user.displayAvatarURL()}`)
                 .setDescription(`*Fale, o que você precisa?*`)
                 .addFields(
                   {
                       name: '\`\`\`Denúncias - Modelo:\`\`\`',
                       value: `*Seu nome:*\n*Nome do Envolvido:*\n*Descrição do Ocorrido:*\n*Data e hora:*\n*Provas:*\n`,
                       inline: false,
                   },
                   {
                       name: '\`\`\`Suporte Geral - Modelo:\`\`\`',
                       value: `*Seu nome:*\n*Motivo de abrir o Ticket:*\n*Descrição do Ocorrido:*\n*Data e hora:*\n`,
                       inline: false,
                   },
                 )
                 .setTimestamp()


                 let FecharTicket = new Discord.ActionRowBuilder().addComponents(
                   new Discord.ButtonBuilder()
                   .setLabel(` - Fechar & Salvar`)
                   .setEmoji(`🔒`)
                   .setCustomId('fechar')
                   .setStyle(Discord.ButtonStyle.Primary),
                   new Discord.ButtonBuilder()
                   .setLabel(` - Lock`)
                   .setEmoji(`🔐`)
                   .setCustomId('lock')
                   .setStyle(Discord.ButtonStyle.Danger),
                   new Discord.ButtonBuilder()
                   .setLabel(` - Unlock`)
                   .setEmoji(`🔓`)
                   .setCustomId('unlock')
                   .setStyle(Discord.ButtonStyle.Success)
               )                
                 
                 ca.send({ embeds: [embedCanalTicket], components: [FecharTicket] })
              })                 
       }
       
   }
} 
if(interaction.isButton) {
 if(interaction.customId === "fechar") {
   const modalTicket = new Discord.ModalBuilder()
         .setCustomId('modal_ticket')
         .setTitle(`Fechar - Ticket`)
       const resposta1 = new Discord.TextInputBuilder()
         .setCustomId('resposta')
         .setLabel('Diga-nos a razão de fechar o ticket:')
         .setStyle(Discord.TextInputStyle.Paragraph)
 
       const firstActionRow = new Discord.ActionRowBuilder().addComponents(resposta1);
       modalTicket.addComponents(firstActionRow)
       await interaction.showModal(modalTicket);
 } else if(interaction.customId === "lock") {
   const cliente = interaction.guild.members.cache.get(
       interaction.channel.topic.slice(0, 18)
   );
    let cargoTicket2 = await db.get("cargoModerate.cargoM");          
       if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
           interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
       } else {
           interaction.channel.permissionOverwrites.edit(cliente.user, {
               ViewChannel: false
             })
         interaction.reply(`**🔐 - Canal trancado, permissão de visualizar canal fechada para ${cliente.user}!**`)
  
       }            
 } else if(interaction.customId === "unlock") {
   const cliente = interaction.guild.members.cache.get(
       interaction.channel.topic.slice(0, 18)
   );
   let cargoTicket2 = await db.get("cargoModerate.cargoM");
   if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
       interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
   } else {
       interaction.channel.permissionOverwrites.edit(cliente.user, {
           ViewChannel: true
         })
     interaction.reply(`**🔑 - 🔓 - Canal destrancado, permissão de visualizar canal concedida para ${cliente.user}!**`)
   }

 }
};
if (!interaction.isModalSubmit()) return;
if (interaction.customId === 'modal_ticket') {         
 const respostaFinal = interaction.fields.getTextInputValue('resposta');

 interaction.reply({
   content: `**✅ - Resposta enviada, canal será deletado em 3s**`, ephemeral: true
 }).then ( (aviso) => {
    setTimeout( () => {
       interaction.editReply({
           content: `**✅ - Resposta enviada, canal será deletado em 2s**`, ephemeral: true
       }, 1000).then ( (aviso1) => {
           setTimeout( () => {
              interaction.editReply({
                   content: `**✅ - Resposta enviada, canal será deletado em 1s**`, ephemeral: true
               })
           }, 1000);
        })
         .then( () => {
           setTimeout(async () => {
               const cliente = interaction.guild.members.cache.get(
                   interaction.channel.topic.slice(0, 18)
               );

               let channel = interaction.channel;
               const attachment = await discordTranscripts.createTranscript(channel, {
                  fileName: `${channel.name}.html`,
                });
               
               interaction.channel.delete();
               const channelDeleted = interaction.channel.name;

               let embedLog = new Discord.EmbedBuilder()
               
                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                .setColor('Red')
                .setTitle(`${channelDeleted}`)
                .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                .addFields(
                   {
                       name: `🆔 - ID de quem fechou:`,
                       value: `\`\`\`${interaction.user.id}\`\`\``,
                       inline: true,
                   },
                   {
                       name: `🆔 - ID de quem abriu:`,
                       value: `\`\`\`${cliente.id}\`\`\``,
                       inline: true,
                   },
                   {
                       name: `💬 - Quem fechou:`,
                       value: `${interaction.user}`,
                       inline: false,
                   },
                   {
                       name: `💬 - Quem abriu:`,
                       value: `${cliente.user}`,
                       inline: false,
                   },
                   {
                       name: `🎫 - Ticket:`,
                       value: `${channelDeleted}`,
                       inline: true,
                   },
                   {
                      name: '📕 - Motivo do Fechamento:',
                      value: `\`\`\`${respostaFinal}\`\`\``,
                      inline: false,
                   },
                )
                .setTimestamp()
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)

                let embedLogUser = new Discord.EmbedBuilder()
               
                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                .setColor('Green')
                .setTitle(`Ticket Fechado!`)
                .setDescription(`*Ticket fechado, informações:*`)
                .addFields(
                   {
                       name: `💬 - Quem fechou:`,
                       value: `${interaction.user}`,
                       inline: false,
                   },
                   {
                       name: `💬 - Quem abriu:`,
                       value: `${cliente.user}`,
                       inline: false,
                   },
                   {
                      name: '📕 - Motivo do Fechamento:',
                      value: `\`\`\`${respostaFinal}\`\`\``,
                      inline: false,
                   },
                )
                .setTimestamp()
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

                let canalLogsT = await db.get('channelLogTicket.channel')


                cliente.user.send({ embeds: [embedLogUser] })
                await  interaction.guild.channels.cache.get(`${canalLogsT.id}`).send({ content: `\`💾 - Transcript ⤵\``, files: [attachment] ,embeds: [embedLog] })
           }, 1000);
        });
    });
 });
};
});




////////////////////////////////////////////////////////////////////////////////////////////////////////

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)


