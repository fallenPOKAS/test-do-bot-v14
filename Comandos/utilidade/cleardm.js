const Discord = require("discord.js")

module.exports = {
    name: "cleardm",
    description: `[๐ง Utilidades] Limpe todas as mensagens do bot da sua DM`,
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const dm = await interaction.member.createDM();
        await interaction.reply({
            content: `๐ **| ${interaction.user}, Estou limpando sua dm, jรก estava ficando cansado de tantas mensagens**`,
            ephemeral: true,
        });

        setTimeout(() => {
            interaction.editReply({
                content: `โ **| ${interaction.user}, Limpei com sucesso sua DM, Uffa! agora estou mais leve.**`

            })
        }, 5000)

        setTimeout(() => {
            interaction.editReply({
                content: `๐ **| ${interaction.user}, para deletar essa mensagem clique em "Ignorar Mensagem".**`,
            })
        }, 15000);

        const deleteMessages = await client.channels.cache
            .get(dm.id)
            .messages.fetch({ limit: 99 });

        await deleteMessages.map((msg) => {
            if (msg.author.bot) {
                msg.delete();
            }
        });
    }
}