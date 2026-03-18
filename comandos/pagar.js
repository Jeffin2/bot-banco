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

  let valor = parseInt(args[0]);

  if(db.users[id].emprestimo <= 0)
   return message.reply("Você não tem empréstimo.");

  if(!valor || valor <= 0)
   return message.reply("Digite um valor válido.");

  if(db.users[id].carteira < valor)
   return message.reply("Você não tem dinheiro suficiente.");

  db.users[id].carteira -= valor;

  db.users[id].emprestimo -= valor;

  if(db.users[id].emprestimo <= 0){

   db.users[id].emprestimo = 0;

   message.reply("✅ Você quitou seu empréstimo!");

  }else{

   message.reply(
   `💰 Pagamento realizado.\n`+
   `📉 Restam ${db.users[id].emprestimo} para pagar.`
   );

  }

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};