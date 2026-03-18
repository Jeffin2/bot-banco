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
   return message.reply("🚓 Você está preso e não pode depositar.");

  let valor = args[0];

  if(valor === "tudo") valor = db.users[id].carteira;
  else valor = parseInt(valor);

  if(!valor || valor <= 0)
   return message.reply("Digite um valor válido.");

  if(db.users[id].carteira < valor)
   return message.reply("Você não tem esse dinheiro.");

  db.users[id].carteira -= valor;
  db.users[id].banco += valor;

  message.reply(`🏦 Você depositou ${valor}`);

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};