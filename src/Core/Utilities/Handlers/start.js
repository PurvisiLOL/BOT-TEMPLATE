import figlet from "figlet";
import client from "../Client/client.js";
import loadEvents from "./loadEvents.js";
import connectToDB from '../../Database/connect.js';
import registerSlashCommand from "./registerSlashCommand.js";
import color from "colors";
import DiscordIntents from "../Client/intents.js";
const dev = process.env.NODE_ENV !== 'production';

//Functions to start the code
let eventCount = 0;
let loginSuccessful = false;

client.on('raw', () => {
    eventCount++;
});

client.once('ready', () => {
    loginSuccessful = true;
});

async function start() {
    let dbConnected = false; // Define dbConnected outside the then callback
    //Logins into the client and registers slash commands
    await client
        .login(process.env.token)
        .then(async () => {
            await registerSlashCommand(client);
            await loadEvents(client);
            dbConnected = await connectToDB(dbConnected);
        })
        .catch((err) => console.error(err));

    //Doing some cool art yk
    console.log("");

    const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const totalGuilds = client.guilds.cache.size;
    const botVersion = 'Bot v1';
    const botOwner = 'PurvisiLOL';
    const success = color.green('+');
    const fail = color.red('-');

    let db;
    let connected;
    let login;

    if (!dbConnected) {
        db = `[${fail}] Mongo Not Connected`;
    } else {
        db = `[${success}] Mongo Connected`;
    }

    if (!loginSuccessful) {
        connected = `[${fail}] Unconnected`;
    } else {
        connected = `[${success}] Connected`;
    }

    const llc = dev ? color.magenta : color.white;
    const blc = dev ? color.magenta : color.blue;

    const line01 = llc(String.raw`              ██████╗░░█████╗░████████╗`);
    const line02 = llc(String.raw`██╔══██╗██╔══██╗╚══██╔══╝`);
    const line03 = llc(String.raw`██████╦╝██║░░██║░░░██║░░░`);
    const line04 = llc(String.raw`██╔══██╗██║░░██║░░░██║░░░`);
    const line05 = llc(String.raw`██████╦╝╚█████╔╝░░░██║░░░`);
    const line06 = llc(String.raw`╚═════╝░░╚════╝░░░░╚═╝░░░                                                                                           `);
    const line07 = llc(String.raw``);
    const line08 = llc(String.raw``);
    const line09 = llc(String.raw`                                                        `);

    // Offset Pad
    const pad = ' '.repeat(7);

    console.log(
        String.raw`
              ${line01}
              ${line02}
              ${line03} ${pad}${blc('1.0.0')}
              ${line04} ${pad}${connected}
              ${line05} ${pad}${db}
              ${line06}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
              ${line07}
              ${line08}
              ${line09}
        `.trim()
    );

    const commandCount = client.commands ? client.commands.size : 0;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')} `;
    console.log(color.cyan(`${timestamp}`) + color.grey(`Loaded `) + color.yellow(`${commandCount} `) + color.grey(`commands`));
    console.log(color.cyan(`${timestamp}`) + color.grey(`Loaded `) + color.yellow(`${eventCount} `) + color.grey(`events`));
    console.log(color.cyan(`${timestamp}`) + color.grey(`Loaded `) + color.yellow(`${DiscordIntents.length} `) + color.grey(`intents`));
    console.log(color.blue('=================================='));
    console.log(color.cyan(`Total Members: ${totalMembers}`));
    console.log(color.green(`Total Guilds: ${totalGuilds}`));
    console.log(color.red(`Bot's Launch Time: ${new Date().toLocaleString()}`));
    console.log(color.blue(`Bot's Version: ${botVersion}`));
    console.log(color.red(`Bot's Founders: ${botOwner}`));
    console.log(color.magenta(`Bot's Developers: PurvisiLOL`));
    console.log(color.blue('=================================='));
    client.checkUpdates
}

export default start;

/*

██████╗░░█████╗░████████╗
██╔══██╗██╔══██╗╚══██╔══╝
██████╦╝██║░░██║░░░██║░░░
██╔══██╗██║░░██║░░░██║░░░
██████╦╝╚█████╔╝░░░██║░░░
╚═════╝░░╚════╝░░░░╚═╝░░░
*/
