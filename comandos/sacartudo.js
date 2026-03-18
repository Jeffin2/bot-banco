const fs = require("fs");

function garantirUsuario(db,id){
 if(!db.users[id]){
  db.users[id] = {
   carteira:0,
   banco:0,
   empresa:null,
   presoAte:0,
   ultimoTrabalho:0,
   emprestimo:0
  };
 }
}

module.exports = {
 run: (message,args) => {

  let db = JSON.parse(fs.readFileSync("dados.json"));
  let id = message.author.id;

  garantirUsuario(db,id);

  if(Date.now() < db.users[id].presoAte)
   return message.reply("🚓 Você está preso.");

  let valor = db.users[id].banco;

  if(valor <= 0)
   return message.reply("Você não tem dinheiro no banco.");

  db.users[id].banco = 0;
  db.users[id].carteira += valor;

  message.reply(`💰 Você sacou tudo (${valor})`);

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};