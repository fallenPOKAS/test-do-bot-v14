const jimp = require("jimp")
const Discord = require('discord.js')
//const ms = require("ms")

module.exports = {
    name: 'cr7',
    description: 'A palavra ou frase que vc escrever, o Cr7 vai repetir em uma imagem.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "texto",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Digite o que o Cr7 irá dizer.",
            required: true,
        },
    ],

   /* run: async (client, interaction) => {

        let img = jimp.read("https://media.discordapp.net/attachments/927803600707682394/945122188657319996/cristiano_ronaldo_efe_festejo_polxmico.jpg_242310155.png?width=767&height=473");
        let texto = interaction.options.getString("texto")
            img.then(image => {

                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {

                    image.resize(885, 494)

                    image.print(font, 145, 330, texto, 7000)

                    image.getBuffer(jimp.MIME_PNG, (err, i) => {
                        interaction.reply({ content: `${interaction.user}`, files: [{ attachment: i, name: "cr7.png" }], ephemeral: true });
                    })*/

                    run: async(client, message, args) => {
        let img = jimp.read("https://media.discordapp.net/attachments/927803600707682394/945122188657319996/cristiano_ronaldo_efe_festejo_polxmico.jpg_242310155.png?width=767&height=473")
        let texto = interaction.options.getString("texto")
        if (!args[0]) return message.reply("**Digite uma mensagem para o Cr7 falar !**")
                        img.then(image => {
                          jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                       image.resize(885, 494)
                                           image.print(font, 260, 270, texto, 7000)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.reply({files: [{ attachment: i, name: "cr7.png****"}]}).then (msg => {
                        msg.react("⚽")
                    })
                })
            })
        })
  }
}