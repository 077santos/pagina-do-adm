import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    onSnapshot,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsHmolc0W2ak6CjcpVr_inPT5xIq-Ml4A",
  authDomain: "agenda-unhas-289db.firebaseapp.com",
  projectId: "agenda-unhas-289db",
  storageBucket: "agenda-unhas-289db.firebasestorage.app",
  messagingSenderId: "362817015721",
  appId: "1:362817015721:web:b2c6ed03cf4994b57afeb8"
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

// 🔥 Tempo real SEM orderBy (mais estável)
onSnapshot(agendaRef, (snapshot) => {

    const dadosOrdenados = snapshot.docs.sort(
        (a, b) => a.data().horario.localeCompare(b.data().horario)
    );

    renderizar(dadosOrdenados);
});
