import { GatewayIntentBits } from "discord.js";

//Loading necessary modules for client
const { Guilds, GuildMembers, MessageContent, GuildVoiceStates, DirectMessageReactions, DirectMessages, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const DiscordIntents = [Guilds, GuildMembers, MessageContent, GuildVoiceStates, DirectMessageReactions, DirectMessages, GuildMessages, GuildMessageReactions];

export default DiscordIntents;
