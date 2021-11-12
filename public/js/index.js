let sequenceOrdi = [];
let sequenceJoueur = [];
let score = 0;
let nombreSequenceDepart = 4;

let tempsAllume = 400;

let boutons = document.querySelectorAll(".boutonJeux");
let state = document.querySelector('#state')
let scoreDiv = document.querySelector('#score');
let turnDiv = document.querySelector('#turn');
state.innerHTML = 'Etat : ';

let sounds = new Array();
for(let i = 0 ; i < boutons.length ; i++) {
	sounds[i] = new Audio("sounds/"+i+".ogg");
}

function eteindreBouton(bouton) {
	bouton.id = bouton.id.split("-")[0]+"-off";
}

function allumerBouton(bouton, index) {
	sounds[index].load();
	sounds[index].play();
	bouton.id = bouton.id.split("-")[0]+"-on";

	setTimeout(function(){
		eteindreBouton(bouton);
		}, tempsAllume);
}

function clickBouton(bouton, index) {
	allumerBouton(bouton, index);

	if(sequenceOrdi[score] != index) {
		document.querySelector('.gameOver').innerHTML = 'Game Over'
	} else {
		score++;
		scoreDiv.innerHTML = score;
	}

	if(score >= sequenceOrdi.length) {
		sequenceJoueur.push(index);
		tourSuivant();
		console.log(score);
	}
}

function creerListener() {
	boutons.forEach(function(element, index) {
		element.addEventListener("click", function(){
			clickBouton(element, index);
		});
	});
}

function tourSuivant() {
	ajouterSequence();
	setTimeout(presenterSequence, tempsAllume*1.5);
}

function ajouterSequence() {
	sequenceOrdi.push(Math.floor(Math.random()*boutons.length));
}

function presenterSequence() {
    state.innerHTML = 'Computer is playing';
	sequenceOrdi.forEach(function(element, i){
		setTimeout(function(){
			allumerBouton(boutons[parseInt(element)], element);
		}, tempsAllume*i+(tempsAllume/2)*i);
	});
    state.innerHTML.replace('Computer is playing', 'Let\'s play');
}

function resetGame() {
	sequenceOrdi = [];
	sequenceJoueur = [];
	score = 0;
	nombreSequenceDepart = 4;

	tempsAllume = 400;

	for(let i = 0 ; i < nombreSequenceDepart ; i++){
		ajouterSequence();
	}
}

function startGame() {
	presenterSequence();
}

creerListener();
resetGame();
startGame();