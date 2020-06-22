// DOM Manupilation
var startQuizEl = document.getElementById("startQuiz");
// Variable Declaration
var timerEl;
var containerEl;
var quizTimeEl;
var quizShowDiv;
var contentEl;
var timerInterval;


// Array of object Questions and Answers stored in a variable.
var questions = [
{
    quiz:"Inside which HTML element do   we put the JavaScript?",
    choices: ["<script>","<Javascript>","<Js>","<scripting>"],
    answer: "<script>" 
},
{
    quiz:"What is the correct syntax for reffering to an external script",
    choices: ["<script href='xxx.js'>","<script name ='xxx.js'>","<script src ='xxx.js'>","<script file ='xxx.js'>"],
    answer: "<script src ='xxx.js'>" 
},
{
    quiz:"How do you write 'Hello World' in alert box?",
    choices: ["msgBox('Hello World');","alertBox('Hello World');","msg('Hello World');","alert('Hello World');"],
    answer: "alert('Hello World');"
},
{
    quiz: "Commonly used data types DO NOT include:",
    choices: ["strings","booleans","alerts","numbers",], 
    answer: "alerts"
},
{
    quiz: "Which built-in method combines the text of two strings and returns a new string?",
    choices: ["append()","concat()", "attach()","None of the above."],
    answer: "concat()"
},

];
var scores=[];
//this is the object in which I store my players.
var entry={
      name:"",
      score:0,
};

 //This function removes all the children of el
function emptyQuiz2(el){
  
     while (el.firstChild) {
         el.removeChild(el.firstChild);
     } 
}

index=0;

var secondsLeft = (10*questions.length); //10 seconds are given for each question

function setTime() { //set the timer
  timerInterval = setInterval(function() {
 if (secondsLeft>0){     
  secondsLeft--;
 }
 else{
     secondsLeft=0; //There may be occasions when secondsLeft is negative, especially if you run out of time and answered question wrong
 }                 //in that case, set the timer to 0.
  timerEl.innerHTML = secondsLeft;
  if(secondsLeft === 0) { //when timer is 0, stop the timer. Clear the screen and at final step, dynamically create the page where you input your initials.
    clearInterval(timerInterval);
    timerEl.innerHTML = secondsLeft;  
    emptyQuiz2(quizShowDiv);
    console.log("time is over");
    finalStep();
  }

}, 1000);
}
//This function is called when startQuiz button is clicked. Timer starts, show the question page  
function quizShow(event){
if(event.target.getAttribute("id")==="startQuiz"){  
  event.preventDefault();
  timerEl=document.getElementById("time-span");
  timerEl.innerHTML=secondsLeft;
  setTime();
  containerEl=document.getElementById("container");
  containerEl.classList.add("hide");

  quizShowDiv=document.createElement("div");
  quizShowDiv.setAttribute("id","quizShow");
  showQuestion();
} 
} 
function find(e){ //finds the index of player e in the player list
 
  for (var j=0;j<scores.length;j++){
      if (scores[j].name===(e.name)){
          return j;
      }
  }
  return -1;
}
//Get the initials and the score.This function is fired up when submit button is cicked, store the player in the local storage 
function storeScore(event){
  event.preventDefault();
  var exist=-1;
  var ini=document.getElementById("initials");

   entry={
      name: ini.value.toUpperCase(),
      score:secondsLeft,
  };
  scores=JSON.parse(localStorage.getItem("contenders"));
 
  if(scores==null){
      scores=[];
      exists=-1;
  }
  else{
      var exists=find(entry);
     
  }   
  
  if(exists>=0){
      scores.splice(exists,1); //if the entry is already in the local storage, remove it first to store the new score
      console.log(scores);
      localStorage.setItem("contenders",JSON.stringify(scores));
  }
  scores.push(entry); 
      

  
  localStorage.setItem("contenders",JSON.stringify(scores));

 window.open("score.html","_top");//open the page that lists the players with max scores

      
}
//Dynamically create the page which gets the user's initials and shows their score. When submit button is clicked , storeScore function is fired up
function finalStep(){
  if(secondsLeft>0){
    clearInterval(timerInterval);
  }  
  var message=document.createElement("h1");
  message.textContent="All Done!!"
  message.setAttribute("style","margin-left:3.5em;");
  var message2=document.createElement("h2");
  message2.textContent="score: "+secondsLeft;
  message2.setAttribute("style","margin-left:5em;");
  var label=document.createElement("label");
  label.textContent="Enter Initials:"
  label.setAttribute("style","margin-left:4em;margin-top:2rem;");
  var textbox=document.createElement("input");
  textbox.setAttribute("type","text");
  textbox.setAttribute("id","initials");
  label.setAttribute("for","initials");
  textbox.setAttribute("style","margin-left:1em;margin-bottom:3em;margin-top:2em;");
  var submitButton=document.createElement("input");
  submitButton.setAttribute("type","submit");
  submitButton.setAttribute("id","submitButton");
  submitButton.setAttribute("class","button");
  submitButton.setAttribute("style","display:inline-block;position:relative;left:3%;padding:0px;font-size:0.8rem;");



  quizShowDiv.append(message);
  quizShowDiv.append(message2);
  quizShowDiv.append(label);
  quizShowDiv.append(textbox);
  quizShowDiv.append(submitButton);

  submitButton.addEventListener("click",storeScore);
  
}
//Shows the questions on the page
function showQuestion(){
  if(index>=questions.length){finalStep();return;}
  var question=document.createElement("p");
  question.textContent=questions[index].quiz;
  quizShowDiv.append(question);
  quizShowDiv.setAttribute("style","display:block");
  contentEl=document.getElementById("main-content");
  contentEl.append(quizShowDiv); 
  showOptions(); //lists the options
}
function emptyQuiz(el){ //This is called after each question is shown and user choses an option, it empties the page and shows another question
   setTimeout(function(){
      while (el.firstChild) {
          el.removeChild(el.firstChild);
      }
    
         showQuestion();
        
  },1000);  
}


//when you click the list or the button, the answer is read
function validate(event){
  event.preventDefault();
  var t=event.target;
  var answer;
  if(t.matches("li")){
      answer=t.parentElement.getAttribute("id");
  }   
  else if(t.matches("button")){
      answer=t.getAttribute("id");
  }
  else{
      return;
  }
  //then put a page divider to show the answer
  quizShowDiv.append(document.createElement("hr"));
  var result=document.createElement("p"); //dynamically create the answer
  result.classList.add("answer");
  if(questions[index].choices[answer]==questions[index].answer){ //checks if answer is right
      result.textContent="Right!!";
      console.log("right");
  }
  else{
      result.textContent="Wrong!!";
      console.log("wrong");
      if((secondsLeft-5)>=0){
          secondsLeft-=5; //subtract 5 seconds from the timer if the answer us wrong and we user has more than 5 seconds
      } 
      else{
          secondsLeft=0; //otherwise user runs out of time
          return;
      }   
      
  }
  quizShowDiv.append(result); //show the result
  
  if (index<questions.length){ //checks if all the questions are answered
     index++;
  } 
  else{
     // alert("it's over!!");
      return;
  }  
 
   emptyQuiz(quizShowDiv); //If all the question is answered, the question page is deleted
   
}
//shows the question's answer and event listener is set on the list
function showOptions(){
  var list=document.createElement("ol");
  for(var i=0;i<questions[index].choices.length;i++){

      var option=document.createElement("li");
      option.textContent=questions[index].choices[i];
      var optionButton=document.createElement("button");
      optionButton.setAttribute("style",("width:"+option.innerHTML.length));
      optionButton.append(option);
      optionButton.setAttribute("id",i);
      list.append(optionButton);
      

  }

  quizShowDiv.append(list);
  list.addEventListener("click",validate);
}



startQuizEl.addEventListener("click",quizShow); //event listener for the beginning of the quiz

