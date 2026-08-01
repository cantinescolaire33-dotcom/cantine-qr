const result = document.getElementById("result");
const loading = document.getElementById("loading");

let html5QrCode;
let scanEnCours = false;


function afficherMessage(message, classe = "attente") {

    result.className = "message " + classe;
    result.innerHTML = message;

}


function demarrerScanner() {

    html5QrCode = new Html5Qrcode("reader");


    html5QrCode.start(

        {
            facingMode: "environment"
        },

        {
            fps: 10,
            qrbox: 250
        },


        (decodedText) => {


            if(scanEnCours){
                return;
            }


            scanEnCours = true;


            afficherMessage(
                "📷 QR détecté<br><br>" + decodedText,
                "info"
            );


            html5QrCode.stop()
            .then(() => {

                console.log("Scanner arrêté");

            });


        },

        (errorMessage) => {

        }

    )

    .then(() => {

        loading.style.display = "none";

    })

    .catch(err => {

        afficherMessage(
            "❌ Erreur caméra : " + err,
            "erreur"
        );

    });

}



demarrerScanner();
