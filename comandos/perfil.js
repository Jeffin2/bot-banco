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

  let user = db.users[id];

  let empresa = user.empresa ? user.empresa : "Nenhuma";

  let preso = "Não";

  if(Date.now() < user.presoAte)
   preso = "Sim";

  let texto =
`👤 Perfil de ${message.author.username}

💰 Carteira: ${user.carteira}
🏦 Banco: ${user.banco}

🏢 Empresa: ${empresa}

📉 Empréstimo: ${user.emprestimo}

🚓 Preso: ${preso}`;

  message.reply(texto);

 }
};