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

  let autor = message.author.id;
  let alvo = message.mentions.users.first();

  garantirUsuario(db,autor);

  if(Date.now() < db.users[autor].presoAte)
   return message.reply("🚓 Você está preso e não pode transferir.");

  if(!alvo)
   return message.reply("Marque alguém para transferir.");

  if(alvo.id === autor)
   return message.reply("Você não pode transferir para você mesmo.");

  let valor = parseInt(args[1]);

  if(!valor || valor <= 0)
   return message.reply("Digite um valor válido.");

  garantirUsuario(db,alvo.id);

  if(db.users[autor].carteira < valor)
   return message.reply("Você não tem dinheiro suficiente.");

  db.users[autor].carteira -= valor;
  db.users[alvo.id].carteira += valor;

  message.reply(
`💸 Transferência realizada!
Você enviou ${valor} para ${alvo.username}`
  );

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};