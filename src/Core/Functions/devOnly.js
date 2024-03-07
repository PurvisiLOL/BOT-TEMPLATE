//Since you can't import json files directly in mjs, We will need to this
import config from "../config.json" assert { type: "json" };
import { ChatInputCommandInteraction } from "discord.js";

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 */

function devOnly(commandData, interaction) {
  try {
    if (commandData.default.devOnly) {
      //Loading the names and id of developers
      const devIds = config.developers.devID;
      const devNames = config.developers.devUserName;

      //Finding the appropriate id and name from the array for the developer
      const foundId = devIds.find((i) => i === interaction.user.id);
      const foundUsername = devNames.find(
        (u) => u === interaction.user.username
      );

      //If both the values are false then send them a error message!
      if (!foundId || !foundUsername) {
        //1 means the user is not a developer and 0 means the user is a developer!
        return 1;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return 0;
}

export default devOnly;
