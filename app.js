let scanner;
const result = document.getElementById("result");

function afficherMessage(message, classe = "attente") {
    result.className = "message " + classe;
    result.innerHTML = message;
}

function onScanSuccess(decodedText) {

    afficherMessage("⏳ Vérification...", "info");

    fetch(
        "https://script.google.com/macros/s/AKfycbzL_0nXfOEip0sxIxzUUVSz4oJBvup35ZhAAsps1t9IgjZdyEGPQdXB741xFO1DcuVA/exec?action=scan&qr=" +
        encodeURIComponent(decodedText)
    )

    .then(response => response.json())

    .then(data => {

        if(data.statut === "ok"){

            afficherMessage(
                "✅ REPAS ENREGISTRÉ<br><br>" +
                data.prenom + " " + data.nom +
                "<br>Classe : " + data.classe,
                "ok"
            );

        }

        else if(data.statut === "deja"){

            afficherMessage(
                "🟥 DÉJÀ MANGÉ<br><br>" +
                data.prenom + " " + data.nom,
                "erreur"
            );

        }

        else{

            afficherMessage(
                "❌ ÉLÈVE INCONNU",
                "erreur"
            );

        }

    })

    .catch(err => {

        afficherMessage(
            "❌ Erreur API",
            "erreur"
        );
       
        console.error(err);

    });

}

scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,
        qrbox: 250
    },
    false
);

scanner.render(onScanSuccess);
