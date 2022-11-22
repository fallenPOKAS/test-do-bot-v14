const { 
    ApplicationCommandType,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    name: "inverter-texto",
    description: "Inverte palavras,textos,frases.",
    type: ApplicationCommandType.ChatInput,
    options: [{
        /*name: "text",
        description: "Inverte palavras",
        type: ApplicationCommandOptionType.Subcommand,
        options: [{*/
            name: "frase",
            description: "Escreva a frase",
            type: ApplicationCommandOptionType.String,
            required: true
       // }]
    }],
    
    run: async (client, interaction, args) => {
        let msg = interaction.options.getString("frase");
        const reverted = msg.split("").reverse().join("");
        let embed = new EmbedBuilder()
        .setColor("Random")
        //.setThumbnail(interaction.guild.iconURL({ dynamic : true, format: "png", size: 1024}))
        .setTitle(`Inverter texto`)
        .setDescription(`Texto original: ${msg} \nTexto invertido: ${reverted}`)
        .setFooter({text: `${interaction.guild.name} © Todos os direitos reservados` ,  iconURL: interaction.guild.iconURL ({ dynamic: true,format: "png", size: 16 })}); 
        interaction.reply({ embeds: [embed], ephemeral: true})
        //interaction.reply({
        //    content: `Resultado do texto invertido: ${reverted}`
        //});
        
    }
}