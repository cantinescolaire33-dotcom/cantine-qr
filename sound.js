const SON_SUCCESS = new Audio("sounds/success.mp3");

function jouerSucces() {
    SON_SUCCESS.currentTime = 0;

    SON_SUCCESS.play().catch(error => {
        console.log("Son bloqué par le navigateur :", error);
    });
}
