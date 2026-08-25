let audioContext = null;

function activerAudio() {

    try {

        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

        audioContext.resume();

        console.log("Audio activé");

        return true;

    } catch (error) {

        console.error("Impossible d'activer le son :", error);

        return false;

    }

}


function jouerBip(frequence, duree) {

    if (!audioContext) {
        return;
    }

    const oscillateur = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillateur.type = "sine";
    oscillateur.frequency.value = frequence;

    gain.gain.setValueAtTime(
        0.15,
        audioContext.currentTime
    );

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

}


function jouerSucces() {

    jouerBip(880, 0.20);

}


function jouerErreur() {

    jouerBip(300, 0.30);

}
