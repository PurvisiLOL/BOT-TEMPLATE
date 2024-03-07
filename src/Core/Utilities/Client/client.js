import { ActionRowBuilder, Client, Collection, EmbedBuilder, ButtonBuilder, ButtonStyle, Events } from "discord.js"
import DiscordIntents from "./intents.js";
import DiscordPartials from "./partials.js";
import fs from 'fs';

//Constructing the client
const client = new Client({
    intents: DiscordIntents,
    partials: DiscordPartials,
    allowedMentions: {
        parse: ["everyone", "users", "roles"]
    },
    presence: {
        activities: [{
            name: '',
            type: 4,
            state: '/help | PurvisiLOL'
        }]
    }
})

//creating collections
client.commands = new Collection();

export default client;