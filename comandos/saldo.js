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

  message.reply(
  `💰 Carteira: ${db.users[id].carteira}
🏦 Banco: ${db.users[id].banco}`);

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
}