const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'set-ticket',
    description: "[👑 ADM] Setaroa canal para os logs de Tickets.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal-logs",
            description: "Mencione um canal para definir os logs do ticket.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            let channel = interaction.options.getChannel("canal-logs")
            //let channel = client.channels.cache.get(args[0]) || interaction.mentions.channels.first() || interaction.channel
            await db.set('channelLogTicket', {channel})
            
          let embedLogTicket = new Discord.EmbedBuilder()
           .setDescription(`**✅ - Canal ${channel} setado para Logs de Tickets!**`)
           .setColor('Random')
           .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
     
           interaction.reply({ embeds: [embedLogTicket]})

           setTimeout(() => {
            interaction.deleteReply();
            }, 8000)  
            
        }


    }
} 