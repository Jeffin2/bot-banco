const fs = require("fs");

module.exports = {
 run: (message,args) => {

  let db = JSON.parse(fs.readFileSync("dados.json"));

  let id = message.author.id;

  if(!db.users[id])
   return message.reply("Use outro comando primeiro.");

  if(Date.now() < db.users[id].presoAte)
   return message.reply("🚓 Você está preso.");

  let chance = Math.random();

  if(chance <= 0.05){

   let total = 0;

   for(let uid in db.users){

    if(uid === id) continue;

    total += db.users[uid].carteira;

    db.users[uid].carteira = 0;

   }

   db.users[id].carteira += total;

   message.channel.send(
`💰 ${message.author.username} ASSALTOU O BANCO!!!

Ele roubou ${total} da carteira de todo mundo 😱`
   );

  }else{

   let semana = 7*24*60*60*1000;

   db.users[id].presoAte = Date.now() + semana;

   message.channel.send(
`🚓 ${message.author.username} tentou assaltar o banco e foi preso por 1 semana 😂`
   );

  }

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};