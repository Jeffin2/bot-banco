const fs = require("fs");

function garantirUsuario(db,id){

 if(!db.users[id]){

  db.users[id] = {
   carteira:0,
   banco:0,
   empresa:null,
   presoAte:0,
   ultimoTrabalho:0,
   emprestimo:0,
   extrato:[]
  };

 }

}

module.exports = {
 run: (message,args) => {

  let db = JSON.parse(fs.readFileSync("dados.json"));

  let id = message.author.id;

  garantirUsuario(db,id);

  let historico = db.users[id].extrato || [];

  if(historico.length === 0)
   return message.reply("📄 Você não tem movimentações ainda.");

  // pega últimos 10
  let ultimos = historico.slice(-10).reverse();

  let texto = "📄 Últimas movimentações:\n\n";

  ultimos.forEach((item)=>{
   texto += `${item}\n`;
  });

  message.reply(texto);

 }
};