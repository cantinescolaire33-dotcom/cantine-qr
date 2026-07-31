const result = document.getElementById("result");

function afficherMessage(message, classe = "attente") {
    result.className = "message " + classe;
    result.innerHTML = message;
}

function onScanSuccess(decodedText) {

    afficherMessage(
        "📷 QR détecté<br><br><strong>" + decodedText + "</strong>",
        "info"
    );

}

const scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,
        qrbox: 250
    },
    false
);

scanner.render(onScanSuccess);
