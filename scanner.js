let html5QrCode;

let cameraId = null;


async function trouverCamera() {

    const cameras = await Html5Qrcode.getCameras();


    if (!cameras || cameras.length === 0) {

        throw new Error("Aucune caméra détectée");

    }


    // Cherche une caméra arrière

    const cameraArriere = cameras.find(camera =>
        camera.label.toLowerCase().includes("back")
    );


    if (cameraArriere) {

        cameraId = cameraArriere.id;

    } else {

        // Si aucune caméra arrière trouvée,
        // prend la première caméra disponible

        cameraId = cameras[cameras.length - 1].id;

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
