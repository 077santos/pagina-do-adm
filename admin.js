import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    onSnapshot,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsHmolc0W2ak6CjcpVr_inPT5xIq-Ml4A",
  authDomain: "agenda-unhas-289db.firebaseapp.com",
  projectId: "agenda-unhas-289db",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const agendaRef = collection(db, "agendamentos");
const lista = document.getElementById("listaAgendamentos");

function renderizar(dados) {
    lista.innerHTML = "";

    dados.forEach((registro) => {

        const item = registro.data();

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <strong>${item.horario}</strong><br>
            ${item.nome}<br>
            📞 ${item.numero}
            <button class="cancel-btn" data-id="${registro.id}">Cancelar</button>
        `;

        lista.appendChild(card);
    });

    document.querySelectorAll("button[data-id]").forEach(botao => {

        botao.addEventListener("click", async () => {

            const id = botao.getAttribute("data-id");

            await deleteDoc(doc(db, "agendamentos", id));
        });
    });
}

const q = query(agendaRef, orderBy("criado"));

onSnapshot(q, (snapshot) => {
    renderizar(snapshot.docs);
});