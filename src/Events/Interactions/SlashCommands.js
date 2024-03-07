import { ChatInputCommandInteraction, Client } from "discord.js";
import config from "../../Core/config.json" assert { type: "json" };
import reply from "../../Core/Functions/reply.js";
import devOnly from "../../Core/Functions/devOnly.js";

export default {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    //Checking if the interaction is a command or not
    if (!interaction.isCommand()) return;
    //Getting command from the collection
    const command = client.commands.get(interaction.commandName);

    //Return an error message if the command was not found in the commands cache
    if (!command) {
      await reply(
        interaction,
        config.messageConfig.x,
        "This command doesn't exist",
        true
      );
      return;
    }
    //Check if the command is developer and user
    if (devOnly(command, interaction) === 1) {
      return reply(
        interaction,
        config.messageConfig.x,
        "Access Denied!, This command can only be accessed by developers!",
        true
      );
    }

    //Executing the command
    await command.default.execute(interaction, client);
  },
};
