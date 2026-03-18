require("dotenv").config();

const express = require("express");
const app = express();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = "!";

// 🌐 Servidor web (necessário pro Render)
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot está online!");
});

app.listen(PORT, () => {
  console.log("Servidor web rodando!");
});

// 🤖 Bot pronto
client.once("ready", () => {
  console.log("Bot de economia online!");
});

// 📩 Sistema de comandos
client.on("messageCreate", async (message) => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(" ");
  const cmd = args.shift().toLowerCase();

  try {
    const comando = require(`./comandos/${cmd}.js`);
    comando.run(message, args);
  } catch (error) {
    // comando não existe (silencioso)
  }

});

// 🔐 Login seguro
client.login(process.env.TOKEN);