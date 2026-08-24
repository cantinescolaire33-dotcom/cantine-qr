let audioContext = null;

function initialiserSon() {

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}


function jouerBip(frequence, duree) {

    try {

        initialiserSon();

        const oscillateur = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillateur.frequency.value = frequence;
        oscillateur.type = "sine";

        gain.gain.setValueAtTime(0.15, audioContext.currentTime);

        oscillateur.connect(gain);
        gain.connect(audioContext.destination);

        oscillateur.start();

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duree
        );

        oscillateur.stop(
            audioContext.currentTime + duree
        );

    } catch (error) {

        console.log("Son indisponible :", error);

    }

}


function jouerSucces() {

    jouerBip(880, 0.20);

}


function jouerErreur() {

    jouerBip(300, 0.30);

}
