const util = require("util");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "eval",
  description: "[👑] Testar códigos.",
//  ownerOnly: true,
  options: [
    {
      name: "codigo",
      description: "Insira o código que deseja testar.",
      type: 3,
      required: true,
    },
    {
      name: "ephemeral",
      description: "Deseja que a mensagem apareça em ephemeral?",
      type: 5,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const expression = interaction.options.getString("codigo");
    const ephemeral = interaction.options.getBoolean("ephemeral");

    const resultEmbed = new EmbedBuilder();
    const inputEmbed = new EmbedBuilder();

    inputEmbed.setColor(process.env.COLOR);
    inputEmbed.setTitle("Entrada");
    inputEmbed.setDescription(`\`\`\`js\n${expression}\`\`\``);

    try {
      const result = util.inspect(eval(expression));

      if (result.length > 4096) {
        resultEmbed.setColor(process.env.COLOR);
        resultEmbed.setTitle("Error");
        resultEmbed.setDescription(
          "O resultado ultrapassa 4096 caracteres. Por esse motivo não pode ser exibido!"
        );
      } else {
        resultEmbed.setColor(process.env.COLOR);
        resultEmbed.setTitle("Saída");
        resultEmbed.setDescription(`\`\`\`js\n${result}\n\`\`\``);
      }

      interaction.reply({
        embeds: [inputEmbed, resultEmbed],
        ephemeral: ephemeral,
      });
    } catch (err) {
      resultEmbed.setColor(process.env.COLOR);
      resultEmbed.setTitle("Saída Error");
      resultEmbed.setDescription(`\`\`\`js\n${err}\n\`\`\``);

      interaction.reply({
        embeds: [inputEmbed, resultEmbed],
        ephemeral: ephemeral,
      });
    }
  },
};