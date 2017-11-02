const qwerty = document.getElementById('qwerty');
const qwertyButtons = document.querySelectorAll('#qwerty button');
const phrase = document.getElementById('phrase');
const phraseUl = document.querySelector('#phrase ul');
const start = document.getElementById('overlay');
const startTitle = document.querySelector('.start .title');
const startAnc = document.querySelector('.start .btn__reset');
const imgHeart = document.querySelectorAll('#scoreboard img');
let missed = 0;
const phrases = ['Hello World', 'How are you', 'I am Jason', 'Lovely weather', 'See you later'];
const phraseArray = getRandomPhraseArray(phrases);

//click 'start' hide the overlay
start.addEventListener('click', (ele) => {
	if(ele.target.tagName == 'A'){
		initial();
		//Get phrase and add to display
		let phraseArray = getRandomPhraseArray(phrases);
		addPhraseToDisplay(phraseArray);

	}
});
// initialize all elements
function initial(){
		start.style.display = 'none';
		missed = 0;
		//initial buttons
		for(let i = 0; i < qwertyButtons.length; i++){
			qwertyButtons[i].className = '';
			qwertyButtons[i].disabled = false;			
		}
		// initial phrase
		while (phraseUl.hasChildNodes()) {
   			phraseUl.removeChild(phraseUl.lastChild);
		}
		// initial tries
		for(let i = 0; i < imgHeart.length; i++){
			imgHeart[i].src = 'images/liveHeart.png';
		}
		// initial layover
		start.className = 'start';
}

// Get the random phrase and return the characters array of this phrase 
function getRandomPhraseArray(arr){
	let num = arr.length ;
	let numRandom = Math.floor(Math.random() * num);	
	let arry = arr[numRandom].toLowerCase().split("");
	return arry;
} 

// Add phrase to display and append each characters to ul
function addPhraseToDisplay(arr){
    for(let i = 0; i < arr.length; i++){
    	let li = document.createElement('li');
    	if(arr[i] != " ")
    	{
    		li.className = 'letter';
    	}
    	li.textContent = arr[i]
    	phraseUl.appendChild(li);
    }   
}


//Check the letter which is clicked, if it's in the arry return the letter, otherwise return null
function checkLetter(letter){
	const items = document.querySelectorAll('.letter');
	let temp = '';
	for(let i = 0; i < items.length; i++){
		if(items[i].textContent == letter){
			items[i].className += ' show';
			temp = letter;
		}
	}
	if(temp == ''){
		return null;
	}else{
		return temp;
	}
}

//Add listener, add class chosen to the button that is clicked
qwerty.addEventListener('click', (ele) => {
	if(ele.target.tagName == 'BUTTON'){
		ele.target.disabled = true;
		let letterFound = checkLetter(ele.target.textContent);
		ele.target.className = 'chosen';
		if(letterFound == null){
			imgHeart[4 - missed].src = 'images/lostHeart.png';
			missed++;
		}	
		checkWin();
	}
});


function checkWin(){
	let letters = document.querySelectorAll('.letter');
	let shows = document.querySelectorAll('.show');
	if(missed == 5){
		start.style.display = 'flex';
		start.className += ' lose';
		startTitle.textContent = 'You lose your game!';
		addReset()
	}else if(letters.length == shows.length){		
		start.style.display = 'flex';
		start.className += ' win';
		startTitle.textContent = 'You win your game!';
		addReset()
	}
}

function addReset(){
	startAnc.textContent = 'Reset';
}








