process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = "!";

// COLOQUE O ID DO CANAL DO BANCO AQUI
const canalBanco = "1482846703865434283";

client.once("ready", () => {

    console.log("💰 Bot de banco online!");

});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    // só funciona no canal do banco
    if (message.channel.id !== canalBanco) return;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(" ");
    const cmd = args.shift().toLowerCase();

    try {

        const comando = require(`./comandos/${cmd}.js`);

        comando.run(message, args);

    } catch (error) {

        console.log("Comando não encontrado:", cmd);

    }

});

require("dotenv").config();
client.login(process.env.TOKEN);