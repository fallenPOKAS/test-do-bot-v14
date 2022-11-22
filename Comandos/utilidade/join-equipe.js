const { userMention, roleMention, ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, TimestampStyles, channelMention } = require('discord.js');

module.exports = {
    name: "join-equipe", //Nome do comando
    description: "「👤 equipe」 + entrada admin", //descrição do comando :D
    type: ApplicationCommandType.ChatInput,
    //ownerOnly: true,
    options: [
        {
            name: "usuário",
            description: "Escolha o Usuario que quer promover",
            type: ApplicationCommandOptionType.User,
            required: true
        }, {
            name: "cargo",
            description: "Escolha o cargo a ser assumido",
            type: ApplicationCommandOptionType.Role,
            required: true
        }
    ],
    run: async(client, interaction) => {
        const user = await interaction.options.getMember('usuário')
        const role = await interaction.options.getRole('cargo');
        const logs = client.channels.cache.get("1043337190253547601") //ID do canal que será enviada a embed

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply(`❌**  para user esse comando você precisa possui a permissão: \`\`\Manage-Roles\`\`\ **`)
        }

        if (!user || !role) {
            interaction.reply({
                embeds: new Discord.MessageEmbed() //Creditos: NicolinhaApi . Base do comando: Ferinha
            });
        } else if (user && role) {
            const { time } = require('discord.js');
            const date = new Date();
            const embed = new EmbedBuilder(
                {
                    "fields": [],
                    "title": "**Sistema**",
                    "description": `>  ${user}   **Entrou como:  [ + ${role} ]**  `,
                    "color": 1244414,
                    "thumbnail": {
                        "url": "https://www.efacil.com.br/wcsstore/AuroraStorefrontAssetStore/Landing_Pages/quem-somos/plus.png"
                    }
                }
                )
            logs.send({
                embeds: [embed]
            })
            interaction.reply({content: `Enviei a embed com sucesso`,ephemeral: true
}).then(async(msg) => {user.roles.add(role.id).catch(e => {
                    interaction.editReply({
                        content: `ERROR - Não foi possivel enviar a embed`,ephemeral: true
                    })
                })
            })            
        }
    }
}