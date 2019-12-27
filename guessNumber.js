//1. Générer nombre entre 1 et 100.
let min = 1;
let max = 100;

function getRandomIntInclusive(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1))+min;
}

let randomNumber = getRandomIntInclusive(min,max);

//2. Stocker nombre de tours joués
let guessCount = 1;

//3. Fournir moyen de saisir nombre au joueur
let guesses = document.querySelector('.guesses');
let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

//4. Stocker proposition de nombres du joueur pour qu'il puisse consulter
let lastResult = document.querySelector('.lastResult');

//5. Vérifier si le nombre proposé est correct.
let lowOrHigh = document.querySelector('.lowOrHigh');

function checkGuess() {
    let userGuess = Number(guessField.value);
    
    if (guessCount === 1) {
        guesses.textContent = 'Propositions précédentes : ';
    }
    guesses.textContent += userGuess + '.';

    //6. Si le nombre est correct
    if (userGuess === randomNumber) {
        //6.1 Message de félicitaions avec le nombre de tours joués
        lastResult.textContent = " Bravo, vous avez gagné ! C'était le " + randomNumber + " !";
        lastResult.style.color = 'green';
        lowOrHigh.textContent = ' ';
        //6.2 Empêcher le joueur de saisir un nouveau nombre
        setGameOver();

    //8. Si faux et que le nombre de tour est épuisé
    } else if (guessCount === 10) {
        //8.1 Afficher un message d'échec
        lastResult.textContent = "Vous avez perdu! C'était le " + randomNumber + " !";
        lastResult.style.color = 'red';
        //8.2 Empêcher le joueur de saisir un nouveau nb
        lowOrHigh.textContent = ' ';
        setGameOver();
    //7. Si le nombre est faux mais qu'il reste des tours
    } else {
        let leftTour = 10 - guessCount;
        //7.1 Message de mauvaise pioche avec le nombre de tours restants.
        lastResult.textContent = 'Il vous reste ' + leftTour + ' tours à jouer.' ;
        //7.2 Permettre une nouvelle proposition (+/- par rapport à la proposition précédente et afficher liste des nombres proposés)
        if (userGuess < randomNumber) {
            lowOrHigh.textContent = 'Le nombre saisi est plus petit que le nombre recherché.';
        } else if (userGuess > randomNumber) {
            lowOrHigh.textContent = 'Le nombre saisi est plus grand que le nombre recherché.';
        }
    }

    //7.3 Incrémenter de 1 le nombre de tours joués
    guessCount++;
    guessField.value = ' ';
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

//9. Redémarrer le jeu (initialisation)
let resetButton;

//10. Empêcher le joueur de saisir un nouveau nb.
//11. Afficher un contrôle pour relancer le jeu.
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Relancer le jeu";
    lastResult.appendChild(resetButton);

    resetButton.addEventListener('click', resetGame);
}
//console.log(resetButton.textContent) -> "Relancer le jeu"

//12. Relancer le jeu
function resetGame() {
    resetButton.parentNode.removeChild(resetButton);  //->retourne l'erreur "resetButton.parentNode est null"

    // This method kills the resetbutton parent
    guessCount = 1;
    let resetParas = document.querySelectorAll(".resultParas p");
    for (let i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = "white";
    randomNumber = getRandomIntInclusive(min,max);
}
