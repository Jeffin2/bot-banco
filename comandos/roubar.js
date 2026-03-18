function garantirUsuario(db,id){
 if(!db.users[id]){
  db.users[id] = {
   carteira:0,
   banco:0,
   empresa:null,
   presoAte:0,
   ultimoTrabalho:0
  };
 }
}

const fs = require("fs");

module.exports = {
 run: (message) => {

  let alvo = message.mentions.users.first();
  if(!alvo) return message.reply("Marque alguém.");

  let db = JSON.parse(fs.readFileSync("dados.json"));

  let chance = Math.random();

  if(chance > 0.25){

   let umDia = 24*60*60*1000;

   db.users[message.author.id].presoAte = Date.now()+umDia;

   message.channel.send(
   `🚓 ${message.author.username} foi preso tentando roubar!`);

   fs.writeFileSync("dados.json", JSON.stringify(db,null,2));
   return;
  }

  let dinheiro = db.users[alvo.id].carteira;

  let roubo = Math.floor(dinheiro*0.5);

  db.users[alvo.id].carteira -= roubo;
  db.users[message.author.id].carteira += roubo;

  message.reply(`🕵️ roubou ${roubo}`);

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
}