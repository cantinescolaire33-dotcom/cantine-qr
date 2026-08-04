const SON_SUCCESS = new Audio("sounds/success.mp3");
const SON_ERROR = new Audio("sounds/error.mp3");


function jouerSucces(){

    SON_SUCCESS.currentTime = 0;

    SON_SUCCESS.play();

}


function jouerErreur(){

    SON_ERROR.currentTime = 0;

    SON_ERROR.play();

}
