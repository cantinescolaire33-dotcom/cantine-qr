let html5QrCode;

let cameraId = null;


async function trouverCamera() {

    const cameras = await Html5Qrcode.getCameras();

    if (!cameras || cameras.length === 0) {
        throw new Error("Aucune caméra détectée");
    }

    console.log("Caméras détectées :", cameras);

    // Cherche d'abord une caméra arrière
    const camerasArriere = cameras.filter(camera => {

        const label =
            (camera.label || "").toLowerCase();

        return (
            label.includes("back") ||
            label.includes("rear") ||
            label.includes("environment")
        );

    });

    if (camerasArriere.length > 0) {

        cameraId =
            camerasArriere[camerasArriere.length - 1].id;

    } else {

        // Si aucune caméra arrière n'est identifiée,
        // on utilise simplement la première caméra disponible
        cameraId = cameras[0].id;

    }

    console.log("Caméra utilisée :", cameraId);

}


async function demarrerScanner(callback) {


    await trouverCamera();


    html5QrCode = new Html5Qrcode("reader");


    await html5QrCode.start(

        cameraId,

        {
            fps: CONFIG.FPS,
            qrbox: CONFIG.QRBOX
        },


        (decodedText)=>{


            arreterScanner();


            callback(decodedText);


        },


        (errorMessage)=>{

            // Ignorer les erreurs normales de lecture

        }


    );


}



async function arreterScanner() {


    if(html5QrCode) {

        try {

            await html5QrCode.stop();

        } catch(e) {

            console.log(e);

        }

    }


}



async function redemarrerScanner(callback) {


    await arreterScanner();


    setTimeout(()=>{

        demarrerScanner(callback);

    }, CONFIG.RESCAN_DELAY);


}
