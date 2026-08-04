let scanActif = false;


async function traiterScan(qrCode) {


    if(scanActif){
        return;
    }


    scanActif = true;


    afficherVerification();


    const data = await envoyerScan(qrCode);



    if(data.statut === "ok"){


        afficherSucces(
            data.prenom,
            data.nom,
            data.classe
        );


    }

    else if(data.statut === "deja"){


        afficherDeja(
            data.prenom,
            data.nom
        );


    }

    else if(data.statut === "inconnu"){


        afficherInconnu();


    }

    else {


        afficherMessage(
            "❌ Erreur de connexion API",
            "erreur"
        );


    }



    setTimeout(()=>{


        afficherAttente();


        scanActif = false;


        demarrerScanner(traiterScan);



    }, CONFIG.RESCAN_DELAY);



}



window.onload = ()=>{


    afficherAttente();


    demarrerScanner(traiterScan);


};
