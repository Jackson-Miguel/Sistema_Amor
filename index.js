const firebaseConfig = {
  apiKey: "AIzaSyCQoVkXqn5hcaok7KfztHaO9IcsnIIKPKw",
  authDomain: "sistema-5e7d1.firebaseapp.com",
  databaseURL: "https://sistema-5e7d1-default-rtdb.firebaseio.com",
  projectId: "sistema-5e7d1",
  storageBucket: "sistema-5e7d1.firebasestorage.app",
  messagingSenderId: "822894926025",
  appId: "1:822894926025:web:567b92b5453f7b71c11518",
  measurementId: "G-HSVY15L507"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sa(event) {
  event.preventDefault();

  const nome = document.getElementById("NomeT").value;
  const dataI = new Date(document.getElementById("DataI").value);
  const dataF = new Date(document.getElementById("DataF").value);
  const desc = document.getElementById("Desc").value;

  if (nome.trim() === "" || dataI === "" || dataF === "" || desc.trim() === "") {
    alert("Preencha todos os campos.");
    return;
  }
  if (dataI > dataF) {
    if (confirm("A data final da tarefa já passou")) {
      db.ref("Tarefas").push({
        nome: nome,
        dataI: dataI.toISOString().split("T")[0], // salva no formato YYYY-MM-DD
        dataF: dataF.toISOString().split("T")[0],
        desc: desc,
        concu: false
      });

      document.getElementById("NomeT").value = "";
      document.getElementById("DataI").value = "";
      document.getElementById("DataF").value = "";
      document.getElementById("Desc").value = "";
  }
  }else{
    db.ref("Tarefas").push({
      nome: nome,
      dataI: dataI.toISOString().split("T")[0], // salva no formato YYYY-MM-DD
      dataF: dataF.toISOString().split("T")[0],
      desc: desc,
      concu: false
      });

    document.getElementById("NomeT").value = "";
    document.getElementById("DataI").value = "";
    document.getElementById("DataF").value = "";
    document.getElementById("Desc").value = "";
  }
}

let Ntarefa = 1;
let chaveSelecionada = null;

db.ref("Tarefas").on("value", (snapshot) => {
  document.getElementById("saida").innerHTML = "";
  document.getElementById("btns").innerHTML = "";
  Ntarefa = 1;

  snapshot.forEach((child) => {
    const chave = child.key;
    const tarefa = child.val();

    const btn = document.createElement("button");
    btn.textContent = tarefa.nome;
    btn.id = `Tarefa-${chave}`;

    if (tarefa.concu === true) {
      document.getElementById("btns").appendChild(btn);
    } else {
      document.getElementById("saida").appendChild(btn);
    }

    Ntarefa++;

    btn.addEventListener('click', function () {
      document.getElementById("NomeT").value = tarefa.nome;
      document.getElementById("DataI").value = tarefa.dataI;
      document.getElementById("DataF").value = tarefa.dataF;
      document.getElementById("Desc").value = tarefa.desc;
      document.getElementById("Salvar").disabled = true;
      document.getElementById("Salvar").style.cursor = "not-allowed";

      chaveSelecionada = chave;
    });
  });
});

function atu(event){
  event.preventDefault();

  const nome = document.getElementById("NomeT").value;
  const dataI = document.getElementById("DataI").value;
  const dataF = document.getElementById("DataF").value;
  const desc = document.getElementById("Desc").value;

  if (nome.trim() === "" || dataI.trim() === "" || dataF.trim() === "" || desc.trim() === "") {
    alert("Selecione alguma tarefa ou crie uma tarefa primeiro.");
    return;
  }

  db.ref("Tarefas/" + chaveSelecionada).update({
    nome,
    dataI,
    dataF,
    desc
  });

  alert("Tarefa atualizada com sucesso!");
   
  document.getElementById("NomeT").value = "";
  document.getElementById("DataI").value = "";
  document.getElementById("DataF").value = "";
  document.getElementById("Desc").value = "";
  document.getElementById("Salvar").disabled = false;
  document.getElementById("Salvar").style.cursor = "pointer";

  chaveSelecionada = null;
}

function conc(event) {
  event.preventDefault();

  const nome = document.getElementById("NomeT").value;
  const dataI = document.getElementById("DataI").value;
  const dataF = document.getElementById("DataF").value;
  const desc = document.getElementById("Desc").value;

  if (!chaveSelecionada) {
    alert("Nenhuma tarefa selecionada.");
    return;
  }

  if (nome.trim() === "" || dataI.trim() === "" || dataF.trim() === "" || desc.trim() === "") {
    alert("Campos vazios. Selecione uma tarefa ou preencha os dados.");
    return;
  }

  db.ref("Tarefas/" + chaveSelecionada).update({
    concu: true
  }).then(() => {
    const btn = document.getElementById(`Tarefa-${chaveSelecionada}`);
    if (btn) {
      document.getElementById("btns").appendChild(btn);
    }

    alert("Tarefa marcada como concluída!");
  }).catch((error) => {
    console.error("Erro ao atualizar tarefa:", error);
  });

  // Limpa os campos e reseta
  document.getElementById("NomeT").value = "";
  document.getElementById("DataI").value = "";
  document.getElementById("DataF").value = "";
  document.getElementById("Desc").value = "";
  document.getElementById("Salvar").disabled = false;
  document.getElementById("Salvar").style.cursor = "pointer";

  chaveSelecionada = null;
}

function limp(event){
  event.preventDefault();

  const nome = document.getElementById("NomeT").value;
  const dataI = document.getElementById("DataI").value;
  const dataF = document.getElementById("DataF").value;
  const desc = document.getElementById("Desc").value;

  if (nome.trim() === "" || dataI.trim() === "" || dataF.trim() === "" || desc.trim() === "") {
    alert("Todos os campos estão vazios.");
    return;
  }

  document.getElementById("NomeT").value = "";
  document.getElementById("DataI").value = "";
  document.getElementById("DataF").value = "";
  document.getElementById("Desc").value = "";

  document.getElementById("Salvar").disabled = false;
  document.getElementById("Salvar").style.cursor = "pointer";
}
