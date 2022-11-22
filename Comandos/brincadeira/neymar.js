const jimp = require( "jimp" )
const Discord = require("discord.js")

module.exports = {
    name: 'neymar',
    description: 'A palavra ou frase que vc escrever, o Neymar vai repetir em uma imagem.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "texto",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Digite o que o Neymar irá dizer.",
            required: true,
        },
    ],

    run: async (client, interaction) => {

        let img = jimp.read("https://media.discordapp.net/attachments/927803600707682394/945131756200275968/31442443.png?width=710&height=473");
        let texto = interaction.options.getString("texto")
            img.then(image => {

                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {

                    image.resize(885, 494)

                    image.print(font, 145, 330, texto, 7000)

                    image.getBuffer(jimp.MIME_PNG, (err, i) => {
                        interaction.reply({ content: `${interaction.user}`, files: [{ attachment: i, name: "neymar.png" }], ephemeral: true });
                    })

                })

            })


    }
}