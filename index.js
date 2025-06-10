
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
  const dataI = document.getElementById("DataI").value;
  const dataF = document.getElementById("DataF").value;
  const desc = document.getElementById("Desc").value;

  if (nome.trim() === "" || dataI.trim() === "" || dataF.trim() === "" || desc.trim() === "") {
    alert("Preencha todos os campos.");
    return;
  }
  db.ref("Tarefas").push({
    nome: nome,
    dataI: dataI,
    dataF: dataF,
    desc: desc
  });

  document.getElementById("NomeT").value = "";
  document.getElementById("DataI").value = "";
  document.getElementById("DataF").value = "";
  document.getElementById("Desc").value = "";
}

db.ref("Tarefas").on("value", (snapshot) => {
    let Ntarefa = 1;
  snapshot.forEach((child) => {
    const tarefa = child.val();
    const btn = document.createElement("button");
    btn.textContent = `Tarefa${Ntarefa}`;
    btn.id = `Tarefa${Ntarefa}`;
    document.getElementById("saida").appendChild(btn);
    Ntarefa++;
    btn.addEventListener('click', function(){
        const Modi = document.createElement("button");

        Modi.textContent = "Modificar";
        document.getElementById("btn").appendChild(Modi);
        document.getElementById("btn").style.width = "260px";

        document.getElementById("NomeT").value = tarefa.nome;
        document.getElementById("DataI").value = tarefa.dataI;
        document.getElementById("DataF").value = tarefa.dataF;
        document.getElementById("Desc").value = tarefa.desc;
    });
  });
});
