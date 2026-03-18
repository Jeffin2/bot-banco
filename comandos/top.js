const fs = require("fs");

module.exports = {
 run: (message,args) => {

  let db = JSON.parse(fs.readFileSync("dados.json"));

  let ranking = Object.entries(db.users)
   .map(([id,dados]) => {

    return {
     id:id,
     total:dados.carteira + dados.banco
    };

   });

  ranking.sort((a,b)=> b.total - a.total);

  ranking = ranking.slice(0,10);

  let texto = "🏆 Top mais ricos do servidor\n\n";

  ranking.forEach((u,i)=>{

   let user = message.guild.members.cache.get(u.id);

   let nome = user ? user.user.username : "Desconhecido";

   texto += `${i+1}. ${nome} — ${u.total}\n`;

  });

  message.reply(texto);

 }
};