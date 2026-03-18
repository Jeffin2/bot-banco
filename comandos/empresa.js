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

  let acao = args[0];
  let nome = args.slice(1).join(" ");

  // CRIAR EMPRESA
  if(acao === "criar"){

   if(!nome)
    return message.reply("Digite o nome da empresa.");

   if(db.empresas[nome])
    return message.reply("Já existe uma empresa com esse nome.");

   if(db.users[id].empresa)
    return message.reply("Você já trabalha em uma empresa.");

   if(db.users[id].banco < 1000)
    return message.reply("Você precisa ter 1000 no banco para criar empresa.");

   db.empresas[nome] = {
    dono:id,
    saldo:0,
    membros:[id],
    ultimoPagamento:Date.now()
   };

   db.users[id].empresa = nome;

   message.reply(`🏢 Empresa ${nome} criada com sucesso!`);

  }

  // VER EMPRESAS
  else if(acao === "ver"){

   let lista = Object.keys(db.empresas);

   if(lista.length === 0)
    return message.reply("Nenhuma empresa criada.");

   message.reply(`🏢 Empresas:\n${lista.join("\n")}`);

  }

  // ENTRAR EMPRESA
  else if(acao === "entrar"){

   if(!nome)
    return message.reply("Digite o nome da empresa.");

   if(!db.empresas[nome])
    return message.reply("Empresa não existe.");

   if(db.users[id].empresa)
    return message.reply("Você já trabalha em uma empresa.");

   let empresa = db.empresas[nome];

   if(empresa.membros.includes(id))
    return message.reply("Você já está nessa empresa.");

   empresa.membros.push(id);

   db.users[id].empresa = nome;

   message.reply(`🏢 Você entrou na empresa ${nome}`);

  }

  // SAIR EMPRESA
  else if(acao === "sair"){

   if(!nome)
    return message.reply("Digite o nome da empresa.");

   if(!db.empresas[nome])
    return message.reply("Empresa não existe.");

   let empresa = db.empresas[nome];

   if(!empresa.membros.includes(id))
    return message.reply("Você não trabalha nessa empresa.");

   empresa.membros = empresa.membros.filter(m => m !== id);

   db.users[id].empresa = null;

   message.reply(`❌ Você saiu da empresa ${nome}`);

  }

  // TRABALHAR NA EMPRESA
  else if(acao === "trabalhar"){

   let empresaNome = db.users[id].empresa;

   if(!empresaNome)
    return message.reply("Você não trabalha em nenhuma empresa.");

   let empresa = db.empresas[empresaNome];

   let ganho = Math.floor(Math.random()*100)+50;

   let empresaParte = Math.floor(ganho*0.1);
   let funcionario = ganho - empresaParte;

   db.users[id].carteira += funcionario;

   empresa.saldo += empresaParte;

   message.reply(
`🏢 Você trabalhou na empresa ${empresaNome}

💰 Você ganhou ${funcionario}
🏦 Empresa recebeu ${empresaParte}`
   );

  }

  // INFO EMPRESA
  else if(acao === "info"){

   if(!nome)
    return message.reply("Digite o nome da empresa.");

   if(!db.empresas[nome])
    return message.reply("Empresa não existe.");

   let empresa = db.empresas[nome];

   let dono = message.guild.members.cache.get(empresa.dono);

   let nomeDono = dono ? dono.user.username : "Desconhecido";

   message.reply(
`🏢 Empresa: ${nome}

👑 Dono: ${nomeDono}

👥 Funcionários: ${empresa.membros.length}

🏦 Saldo: ${empresa.saldo}`
   );

  }

  fs.writeFileSync("dados.json", JSON.stringify(db,null,2));

 }
};