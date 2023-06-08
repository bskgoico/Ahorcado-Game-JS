const wordContainer = document.getElementById('wordContainer'); //Contenedor de letras.
const startButton = document.getElementById('startButton'); //Boton que inicia el juego.
const usedLettersElement = document.getElementById('usedLetters'); //Letras que utilizamos.

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

//Valores a utilizar para dibujar al hombrecito del ahorcado
const bodyParts = [
  [4, 2, 1, 1],
  [4, 3, 1, 2],
  [3, 5, 1, 1],
  [5, 5, 1, 1],
  [3, 3, 1, 1],
  [5, 3, 1, 1],
];

let selectedWord; //Letras elegidas.
let usedLetters; //Letras usadas.
let mistakes; //Errores.
let hits; //Aciertos.


// Funcion que añade letras
const addLetter = letter => {
  const letterElement = document.createElement('span');
  letterElement.innerHTML = letter.toUpperCase();
  usedLettersElement.appendChild(letterElement);
};


//Funcion que agrega las partes del cuerpo
const addBodyPart = bodyPart => {
  ctx.fillStyle = '#fff';
  ctx.fillRect(...bodyPart);
};



const wrongLetter = () => {
  addBodyPart(bodyParts[mistakes]);
  mistakes++;
  if (mistakes === bodyParts.length) endGame();
};

const endGame = () => {
  document.removeEventListener('keydown', letterEvent);
  startButton.style.display = "block";
};

const correctLetter = letter => {
  const { children } = wordContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML === letter) {
      children[i].classList.toggle('hidden');
      hits++;
    }
  }
  if (hits === selectedWord.length) endGame();
};

const letterInput = letter => {
  if (selectedWord.includes(letter)) {
    correctLetter(letter);
  } else {
    wrongLetter();
  }
  addLetter(letter);
  usedLetters.push(letter);
};

const letterEvent = event => {
  let newLetter = event.key.toUpperCase();
  if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
    letterInput(newLetter);
  }
};

const drawWord = () => {
  selectedWord.forEach(letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    letterElement.classList.add('letter');
    letterElement.classList.add('hidden');
    wordContainer.appendChild(letterElement);
  });
};

//Funcion que selecciona una palabra random de palabras.js
const selectRandomWord = () => {
  let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
  selectedWord = word.split("");
};

//Funcion que dibuja al ahorcado
const drawHangMan = () => {
  ctx.canvas.width = 120;
  ctx.canvas.height = 160;
  ctx.scale(20, 20);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillstyle = '#d95d39';
  ctx.fillRect(0, 7, 4, 1);
  ctx.fillRect(1, 0, 1, 8);
  ctx.fillRect(2, 0, 3, 1);
  ctx.fillRect(4, 1, 1, 1);
};

//Funcion que inicia el juego
const startGame = () => {
  usedLetters = [];
  mistakes = 0;
  hits = 0;
  wordContainer.innerHTML = '';
  usedLettersElement.innerHTML = '';
  startButton.style.display = 'none';
  drawHangMan();
  selectRandomWord();
  drawWord();
  document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame); //Evento que escucha cuando se hace click y llama la a la funcion que inicia el juego.