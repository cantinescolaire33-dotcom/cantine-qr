const result = document.getElementById("result");
const loading = document.getElementById("loading");

const API_URL = "https://script.google.com/macros/s/AKfycbzL_0nXfOEip0sxIxzUUVSz4oJBvup35ZhAAsps1t9IgjZdyEGPQdXB741xFO1DcuVA/exec";


let html5QrCode;
let scanBloque = false;



function afficherMessage(message, classe = "attente") {

    result.className = "message " + classe;
    result.innerHTML = message;

}



function envoyerScan(qrCode){


    fetch(
        API_URL +
        "?action=scan&qr=" +
        encodeURIComponent(qrCode)
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


    .catch(error => {


        afficherMessage(
            "❌ Erreur API",
            "erreur"
        );


        console.error(error);


    })

    .finally(()=>{


        setTimeout(()=>{


            scanBloque = false;


            afficherMessage(
                "📷 Prêt pour le prochain élève",
                "attente"
            );

    Html5Qrcode.getCameras()
.then(cameras => {

    console.log("Caméras trouvées :", cameras);

    cameras.forEach((camera, index) => {
        console.log(index, camera.id, camera.label);
    });

})
.catch(err => {
    console.error(err);
});
            demarrerScanner();


        },2000);


    });


}




function demarrerScanner(){


    html5QrCode = new Html5Qrcode("reader");



   html5QrCode.start(

    {
        facingMode: {
            exact: "environment"
        }
    },


    {
        fps:10,
        qrbox:250,
        aspectRatio: 1.7777778
    },


        (decodedText)=>{


            if(scanBloque){
                return;
            }


            scanBloque = true;


            html5QrCode.stop()
            .then(()=>{


                afficherMessage(
                    "⏳ Vérification...",
                    "info"
                );


                envoyerScan(decodedText);


            });


        },


        (errorMessage)=>{


        }


    )


    .then(()=>{


        if(loading){
            loading.style.display="none";
        }


    })


    .catch(err=>{


        afficherMessage(
            "❌ Erreur caméra : " + err,
            "erreur"
        );


    });



}
    


demarrerScanner();
