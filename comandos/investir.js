const fs = require("fs");

module.exports = {
 run: (message,args) => {

  let db = JSON.parse(fs.readFileSync("dados.json"));

  let id = message.author.id;

  let valor = parseInt(args[0]);

  if(!valor || valor <= 0)
   return message.reply("Digite um valor válido.");

  if(db.users[id].carteira < valor)
   return message.reply("Você não tem esse dinheiro.");

  let chance = Math.random();

  if(chance <= 0.10){

   let aumento = Math.floor(valor*(Math.random()*0.05+0.01));

   db.users[id].carteira += aumento;

   message.reply(
`📈 Investimento deu certo!

Você ganhou ${aumento}`
   );

  }else{

   message.reply(
`📉 Investimento falhou...`
   );

  }

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};