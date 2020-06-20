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
// Dom Manipulation
var startQuizEl = document.getElementById("startQuiz")
var sectionEl = document.getElementById("main-content");
var containerEl = document.getElementById("container");
var timerEl = document.getElementById("time-span");


var scores=[];

//this is the object in which I store my players.
var entry = {
    name:"",
    score:0,
};

 //This function removes all the children of el
function emptyQiz2(el){

    while (el.firstChild) {
        el.removeChild(el.firstChild);
    } 
}
index=0;


var secondsLeft = (10*questions.length); // Given that 10 second for each question.
//set time for questions.
function setTime(){
    var timeInterval = setInterval(function(){
    if(secondsLeft > 0){
        secondsLeft--;
    }
    else{
        secondsLeft = 0;
    }
    timerEl.innerHTML = secondsLeft;
    if(secondsLeft === 0){
        clearInterval(timeInterval);
        timerEl.innerHTML = secondsLeft;
        emptyQuiz2(questionDiv);
        finalStage();
    }
    },1000)
}

// This function is called when startQuiz button is clicked. Timer starts, show the question page 
function questionShow(event){
    if (event.target.getAttribute("id")=== "startQuiz"){
        event.preventDefault();
        timerEl.innerHTML = secondsLeft;
        setTime();
        containerEl.classList.add("hide");
        questionDiv=document.createElement("div");
        questionDiv.setAttribute("id","quizShow");
        showQuestion();
        
    }

}
//finds the index of player e in the player list
function find(e){ 

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
    var exist = -1;
    var ini=document.getElementById("initials");

    entry={
        name: ini.value.toUpperCase(),
        score:secondsLeft,
    };
    scores=JSON.parse(localStorage.getItem("competitor"));

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
        localStorage.setItem("competitor",JSON.stringify(scores));
    }
    scores.push(entry); 
        

    
    localStorage.setItem("competitor",JSON.stringify(scores));

    window.open("score.html","_top");//open the page that lists the players with max scores
}
// finally create a page which allow for the player to see the current score and to enter their initials to be submited and store in the local storage.
function  finalStage(){
    if (secondsLeft>0){
        clearInterval(timeInterval);
    }
    var message = document.createElement("h1");
    message.textContent = "All Done!!"
    message.setAttribute("style","margin-left:3.5em;");
    var secondMessage = document.createElement("h2");
    secondMessage.textContent = "Your Final Score is :" +secondsLeft;
    message2.setAttribute("style","margin-left:5em;");

    var label=document.createElement("label");
    label.textContent="Enter Initials:"
    label.setAttribute("style","margin-left:4em;margin-top:2rem;");
    

    var initialsBox=document.createElement("input");
    initialsBox.setAttribute("type","text");
    initialsBox.setAttribute("id","initials");
    label.setAttribute("for","initials");
    initialsBox.setAttribute("style","margin-left:1em;margin-bottom:3em;margin-top:2em;");
   

    var submitButton=document.createElement("input");
    submitButton.setAttribute("type","submit");
    submitButton.setAttribute("id","submitButton");
    submitButton.setAttribute("class","button");
    submitButton.setAttribute("style","display:inline-block;position:relative;left:3%;padding:0px;font-size:0.8rem;");
    questionDiv.append(message);
    questionDiv.append(secondMessage);
    questionDiv.append(label);
    questionDiv.append(initialsBox);
    questionDiv.append(submitButton);
    submitButton.addEventListener("click", storeScore());     

}
//Shows the questions on the page
function showQuestion(){
    if(index >= questions.length)
        {finalStage();return;}
    var question=document.createElement("p");
    question.textContent=questions[index].quiz;
    questionDiv.append(question);
    questionDiv.setAttribute("style","display:block");
    sectionEl.append(questionDiv);

    answerChoices(); //lists the options
}

function emptyQuiz(el){ //This is called after each question is shown and user choses an option, it empties the page and shows another question
    setTimeout(function(){
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

        showQuestion();

    },1000);  
}

// Show answer choices on the page and event deligation to lists.
function answerChoices(){
    var lists = document.createElement("ol");
    // for loop
    for (var i=0; i<questions[index].choices.length;i++){
        var options = document.createElement("li");
        options.textContent = questions[index].choices[i];
        var optionButton=document.createElement("button");
        optionButton.setAttribute("style",("width:"+options.innerHTML.length));
        optionButton.append(options);
        optionButton.setAttribute("id",i);
        lists.append(optionButton);

    }
    questionDiv.append(lists);
    lists.addEventListener("click",checkanswer);
}
// This function checks the player answer.
function checkanswer(event){
    event.preventDefault();
    var answer ;
    if(event.target.matches("li")){
        answer = event.target.parentElement.getAttribute("id");
    }
    else if (event.target.matches("button")){
        answer = event.target.getAttribute("id"); 
    }
    else{
        return;
    }

// show the result to the player and divide the page in section.
    questionDiv.append(document.createElement("hr"));
    var result = document.createElement("p");
    result.classList.add("answer");
    if(questions[index].choices[answer]==questions[index].answer){ //checks if answer is right
    result.textContent="Right!!";
    console.log("right");
    }
    else{
        result.textContent="Wrong!!";
        console.log("wrong");
    if((secondsLeft-20)>=0)
        {
        secondsLeft-=20; //subtract 20 seconds from the timer if the answer us wrong and we user has more than 20 seconds
        } 
    else{
        secondsLeft=0; //otherwise user runs out of time
        return;
        }   
    
    }
    questionDiv.append(result); //show the result

    if (index<questions.length){ //checks if all the questions are answered
        index++;
    } 
    else{
        alert("it's over!!");
        return;
    }

    emptyQuiz(questionDiv); //If all the question is answered, the question page is deleted.
}

// Start Quiz button. Here our start quiz button handles a click event.
startQuizEl.addEventListener("click",questionShow);
    
    

