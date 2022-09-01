// Array words 
const words =["Hello","John","How","Are","You" ,"Wish","All","The","Best"];

  //levels
  const lvls = {"Easy" :5, "Midium" : 3 , "Hard": 2};
  
  // Default Levels
  let defaultLevel = "";
  let defaultLevelSeconds =lvls[defaultLevel] ;

  //catch html elements 
    let satrtButton = document.querySelector(".start");
    let lvlNameSpan = document.querySelector(".message .lvl");
    let secondsSpan = document.querySelector(".message .seconds");
    let theWord     = document.querySelector(".the-word");
    let input     = document.querySelector("input");
    let timer     = document.querySelector(".time span");
    let score  = document.querySelector(".score .got");
    let totalScores  = document.querySelector(".score .total");
    let finishMessage = document.querySelector(".finish");
    const select = document.getElementById('select');

select.addEventListener('change', function handleChange(event) {
  console.log(event.target.value); 


  if(event.target.value == 0)
  {
    defaultLevel = "Easy";
     defaultLevelSeconds = lvls[defaultLevel];
  }
  else if(event.target.value == 1)
  {
    defaultLevel = "Midium";
     defaultLevelSeconds = lvls[defaultLevel];
  }
  else 
  {
    defaultLevel = "Hard";
     defaultLevelSeconds = lvls[defaultLevel];
  }
      
  // setting level name and seconds & score
  lvlNameSpan.innerHTML = defaultLevel ;
  secondsSpan.innerHTML = defaultLevelSeconds ;
  timer.innerHTML       = defaultLevelSeconds ;
  totalScores.innerHTML = words.length;
  
});


// disable past event ...prevent user to past words
    input.onpaste =() => false;

  // start game 
  

    satrtButton.onclick = function()
    {
    this.remove();
    input.focus();
    genwords();
    }
    
  //get random word from array  

function genwords(){
    let randomWord = words[Math.floor(Math.random() * words.length)];
// remove the word from the array
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex,1)
    // show the random word 
    theWord.innerHTML = randomWord;
    startPlay();
}

function startPlay()
{
    timer.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
      timer.innerHTML--;
      if( timer.innerHTML=="0" ){
        clearInterval(start);
        
        //stop timer

        //compare words
        if( theWord.innerHTML.toLowerCase() == input.value.toLowerCase() )
        {
          //ipmty input field 
          input.value='';
          //increase score 
          if(score.innerHTML >= totalScores.innerHTML)
          {
              clearInterval(start);
          }else{
            score .innerHTML++;
          }
          
          
          if(words.length > 0)
          {
            genwords();

          }else{
            let span = document.createElement("span");
            span.className = 'good';
            let spanText = document.createTextNode("congratulations");
            span.appendChild(spanText);
            finishMessage.appendChild(span);
          }
  
        } else {
          let span = document.createElement("span");
          span.className = 'bad';
          let spanText = document.createTextNode("Game Over!!");
          span.appendChild(spanText);
          finishMessage.appendChild(span);

        }
      }
    }, 1000);
  }