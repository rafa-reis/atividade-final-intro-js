let userLogado = JSON.parse(localStorage.getItem("userLogado"));
console.log(userLogado)

let logado = document.getElementById("logado");
logado.innerHTML = `opa, ${userLogado.nome}!`;

// let listaUsuarios = JSON.parse(window.localStorage.getItem('listUser'))
// console.log(listaUsuarios)

// let dadosUsuario = listaUsuarios.find((usuario) => usuario.emailCad === userLogado.email)
// console.log(dadosUsuario)

// let tarefas = localStorage.getItem('Minhas Tarefas')
// console.log(tarefas)

// dadosUsuario.tarefas.push(novorecado);

if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página!");
  window.location.href = "index.html";
}

let formulario = document.getElementById("form-cadastro");
let inputCodigo = document.getElementById("input-codigo");
let inputDescricao = document.getElementById("input-descricao");
let inputDetalhamento = document.getElementById("input-detalhamento");
let botaoSalvar = document.getElementById("btn-salvar");
let botaoAtualizar = document.getElementById("btn-atualizar");
let botaoCancelar = document.getElementById("btn-cancelar");
let botaoSair = document.getElementById("btn-sair");
let tabelaTarefas = document.getElementById("tabela-tarefas");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  adicionarNovaTarefa();
});

document.addEventListener("DOMContentLoaded", pegarDadosStorage());

botaoCancelar.addEventListener("click", cancelarEdicao);

botaoSair.addEventListener("click", sair);

function adicionarNovaTarefa() {
  let listaTarefas = JSON.parse(localStorage.getItem("Minhas Tarefas")) || [];

  let codigoID = inputCodigo.value;

  let validarCodigo = listaTarefas.some(
    (tarefa) => tarefa.codigoID == codigoID
  );

  if (validarCodigo) {
    alert("Já existe uma tarefa cadastrada com este código ID");
    inputCodigo.value = "";
    inputCodigo.focus();

    return;
  }

  let descricaoTarefa = inputDescricao.value;
  let detalhamentoTarefa = inputDetalhamento.value;

  let tarefa = {
    codigoID,
    descricaoTarefa,
    detalhamentoTarefa,
  };

  listaTarefas.push(tarefa);

  salvarNaTabela(tarefa);
  limparCampos();
  salvarNoStorage(listaTarefas);
}

function salvarNaTabela(recados) {
  let novaLinha = document.createElement("tr");
  let colunaCodigo = document.createElement("td");
  let colunaDescricao = document.createElement("td");
  let colunaDetalhamento = document.createElement("td");
  let colunaAcoes = document.createElement("td");

  novaLinha.setAttribute("class", "registros");
  novaLinha.setAttribute("id", recados.codigoID);
  colunaCodigo.innerHTML = recados.codigoID;
  colunaCodigo.setAttribute("style", "text-align: center");
  colunaDescricao.innerHTML = recados.descricaoTarefa;
  colunaDetalhamento.innerHTML = recados.detalhamentoTarefa;
  colunaAcoes.innerHTML = `
                                <button class="btn-edit" onclick="prepararEdicao(${recados.codigoID})">Editar</button> 
                                <button class="btn-delete" onclick="apagarTarefa(${recados.codigoID})">Apagar</button> 
                             `;

  novaLinha.appendChild(colunaCodigo);
  novaLinha.appendChild(colunaDescricao);
  novaLinha.appendChild(colunaDetalhamento);
  novaLinha.appendChild(colunaAcoes);

  tabelaTarefas.appendChild(novaLinha);
}

function limparCampos() {
  inputCodigo.value = "";
  inputDescricao.value = "";
  inputDetalhamento.value = "";
}

function salvarNoStorage(listaTarefas) {
  localStorage.setItem("Minhas Tarefas", JSON.stringify(listaTarefas));
}

function pegarDadosStorage() {
  let dadosStorage = JSON.parse(localStorage.getItem("Minhas Tarefas"));

  if (dadosStorage) {
    for (let item of dadosStorage) {
      salvarNaTabela(item);
    }
  }
  return;
}

function apagarTarefa(codigoID) {
  let listaRegistros = JSON.parse(localStorage.getItem("Minhas Tarefas"));
  let indiceEncontrado = listaRegistros.findIndex(
    (tarefa) => tarefa.codigoID == codigoID
  );

  let confirma = window.confirm(
    `Tem certeza que deseja remover a tarefa de código #${codigoID}?`
  );

  if (confirma) {
    let linhasTabela = document.querySelectorAll(".registros");

    for (let linha of linhasTabela) {
      if (linha.id == codigoID) {
        tabelaTarefas.removeChild(linha);
        listaRegistros.splice(indiceEncontrado, 1);
        alert("Registro removido.");
      }
    }

    localStorage.clear();
    salvarNoStorage(listaRegistros);
  } else {
    return;
  }
}

function cancelarEdicao() {
  limparCampos();
  botaoSalvar.setAttribute("style", "display: inline-block");
  botaoAtualizar.setAttribute("style", "display: none");
  botaoCancelar.setAttribute("style", "display: none");

  inputCodigo.removeAttribute("readonly");
  inputCodigo.removeAttribute("disabled");
}

function prepararEdicao(codigoID) {
  botaoSalvar.setAttribute("style", "display: none");
  botaoAtualizar.setAttribute("style", "display: inline-block");
  botaoAtualizar.setAttribute("onclick", `atualizarTarefa(${codigoID})`);
  botaoCancelar.setAttribute("style", "display: inline-block");

  let listaTarefas = JSON.parse(localStorage.getItem("Minhas Tarefas"));
  let tarefaEncontrada = listaTarefas.find(
    (tarefa) => tarefa.codigoID == codigoID
  );

  inputCodigo.value = tarefaEncontrada.codigoID;
  inputDescricao.value = tarefaEncontrada.descricaoTarefa;
  inputDetalhamento.value = tarefaEncontrada.detalhamentoTarefa;
  inputCodigo.setAttribute("readonly", "true");
  inputCodigo.setAttribute("disabled", "true");
}

function atualizarTarefa(codigoID) {
  let novoCodigo = inputCodigo.value;
  let novaDescricao = inputDescricao.value;
  let novoDetalhamento = inputDetalhamento.value;

  let tarefaAtualizada = {
    codigoID: novoCodigo,
    descricaoTarefa: novaDescricao,
    detalhamentoTarefa: novoDetalhamento,
  };

  let listaTarefas = JSON.parse(localStorage.getItem("Minhas Tarefas"));
  let indiceEncontrado = listaTarefas.findIndex(
    (tarefa) => tarefa.codigoID == codigoID
  );

  listaTarefas[indiceEncontrado] = tarefaAtualizada;

  let linhasTabela = document.querySelectorAll(".registros");

  for (let item of linhasTabela) {
    if (item.id == codigoID) {
      let colunas = item.children;

      colunas[0].innerText = tarefaAtualizada.codigoID;
      colunas[1].innerText = tarefaAtualizada.descricaoTarefa;
      colunas[2].innerText = tarefaAtualizada.detalhamentoTarefa;
    }
  }

  localStorage.clear();
  salvarNoStorage(listaTarefas);
  cancelarEdicao();
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "index.html";
}
