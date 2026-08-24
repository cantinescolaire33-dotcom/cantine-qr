let scanActif = false;

async function traiterScan(qrCode) {

    if (scanActif) {
        return;
    }

    scanActif = true;

    afficherVerification();

    try {

        const data = await envoyerScan(qrCode);

        console.log("Réponse API :", data);

        if (data.statut === "ok") {

    jouerSucces();

    afficherSucces(
        data.prenom,
        data.nom,
        data.classe
    );

}

        else if (data.statut === "deja") {

    jouerErreur();

    afficherDeja(
        data.prenom,
        data.nom
    );

}

        else if (data.statut === "inconnu") {

            afficherInconnu();

        }

        else {

            afficherMessage(
                "❌ Erreur API",
                "erreur"
            );

        }

    } catch (error) {

        console.error("Erreur :", error);

        afficherMessage(
            "❌ Erreur de connexion",
            "erreur"
        );

    }

    setTimeout(async () => {

        scanActif = false;

        afficherAttente();

        await demarrerScanner(traiterScan);

    }, CONFIG.RESCAN_DELAY);

}


window.onload = function () {

    afficherAttente();

    demarrerScanner(traiterScan);

};
