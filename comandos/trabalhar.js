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

  let db = JSON.parse(fs.readFileSync("dados.json"));

  let id = message.author.id;

  if(!db.users[id]){
   db.users[id] = {carteira:0,banco:0,presoAte:0,ultimoTrabalho:0};
  }

  if(Date.now() < db.users[id].presoAte)
   return message.reply("🚓 Você está preso.");

  let cooldown = 45*60*1000;

  if(Date.now() - db.users[id].ultimoTrabalho < cooldown){

   let restante = cooldown - (Date.now() - db.users[id].ultimoTrabalho);
   let min = Math.floor(restante/60000);

   return message.reply(`⏳ Espere ${min} minutos.`);
  }

  let ganho = Math.floor(Math.random()*200)+50;

  db.users[id].carteira += ganho;
  db.users[id].ultimoTrabalho = Date.now();

  message.reply(`💼 Você ganhou ${ganho} moedas.`);

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
}