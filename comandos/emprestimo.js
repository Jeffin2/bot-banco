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

  if(!valor || valor <= 0)
   return message.reply("Digite um valor válido.");

  if(valor > 2000)
   return message.reply("O máximo de empréstimo é 2000.");

  if(db.users[id].emprestimo > 0)
   return message.reply("Você já tem um empréstimo.");

  let total = Math.floor(valor * 1.2);

  db.users[id].carteira += valor;

  db.users[id].emprestimo = total;

  message.reply(
  `💰 Você pegou ${valor} de empréstimo.\n` +
  `📈 Você deve pagar ${total} (20% de juros).`
  );

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};