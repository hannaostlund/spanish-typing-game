// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "plátano",
  "cocina",
  "invierno",
  "árbol",
  "nostalgia",
  "silencio",
  "jugar",
  "amarillo",
  "verde",
  "aventura",
  "creatividad",
  "dulce",
  "escuela",
  "misterio",
  "colores",
  "alegría",
  "canción",
  "manzana",
  "zapatos",
  "reloj",
  "estrella",
  "mariposa",
  "serpiente",
  "corazón",
  "tortuga",
  "bailar",
  "cantar",
  "luz",
  "recuerdo",
  "sonrisa",
  "flor",
  "fiesta",

];

// Initalizing word 
let randomWord;

//Initializing score
let score = 0;

//initalizing time
let time = 10;

// difficulty
let difficulty = 
localStorage.getItem("difficulty") !== null 
? localStorage.getItem("difficulty")
: "medium";

// set difficulty select value
difficultySelect.value =
localStorage.getItem("difficulty") !== null
? localStorage.getItem("difficulty")
: "medium";

//focus text input at start
text.focus();

// COUNTING DOWN
const timeInterval = setInterval(updateTime, 1000);

// RANDOM WORD
function getRandomWord () {
  return words [Math.floor(Math.random() * words.length)]
  //floor will just round down
  //function to get a random word from our words array
}

// ADD WORD TO DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// UPDATE SCORE
function updateScore() {
  score ++;
  scoreEl.innerHTML = score;
}

// UPDATE TIME
function updateTime(){
  //console.log(1);
  time--;
  timeEl.innerHTML = time + "s";

  if (time===0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

// GAME OVER
function gameOver (){
  endgameEl.innerHTML = `<h1>Se acabó el tiempo!</h1> <p>Time run out! Your final score is ${score}</p> <button onClick="location.reload()">Reload</button>`;

  endgameEl.style.display = "flex";
}

addWordToDOM(); 

text.addEventListener("input", (event) => {
  const insertedText = event.target.value;
  //console.log(insertedText);

  if (insertedText === randomWord) {
    addWordToDOM();

    updateScore();

    // Clear input field
    event.target.value = "";

    //Increasing time after correct input
    //time += 5;

    if (difficulty === "hard") {
      time =+ 2; 
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
})

// SETTINGS BTN CLICK 
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// SETTINGS SELECT
settingsForm.addEventListener("change", (event) => {
  difficulty = event.target.value;

  localStorage.setItem("difficulty", difficulty);
})