const result = document.getElementById("result");

function afficherMessage(message, type = "attente") {

    result.className = "message " + type;

    result.innerHTML = message;

}

function afficherSucces(prenom, nom, classe) {

    afficherMessage(
        `✅ REPAS ENREGISTRÉ<br><br>
        <strong>${prenom} ${nom}</strong><br>
        Classe : ${classe}`,
        "ok"
    );

}

function afficherDeja(prenom, nom) {

    afficherMessage(
        `🟥 DÉJÀ MANGÉ<br><br>
        <strong>${prenom} ${nom}</strong>`,
        "erreur"
    );

}

function afficherInconnu() {

    afficherMessage(
        "❌ ÉLÈVE INCONNU",
        "erreur"
    );

}

function afficherAttente() {

    afficherMessage(
        "📷 En attente du scan...",
        "attente"
    );

}

function afficherVerification() {

    afficherMessage(
        "⏳ Vérification...",
        "info"
    );

}
