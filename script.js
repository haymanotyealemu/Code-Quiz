// Array of object Questions and Answers stored in a variable.
var questions = [{quiz:"Inside which HTML element do   we put the JavaScript?",
    choices: ["<script>","<Javascript>","<Js>","<scripting>"],
answer: "<script>" },
{
    quiz:"What is the correct syntax for reffering to an external script",
    choices: ["<script href='xxx.js'>","<script name ='xxx.js'>","<script src ='xxx.js'>","<script file ='xxx.js'>"],
    answer: "<script src ='xxx.js'>" },
{
        quiz:"How do you write 'Hello World' in alert box?",
        choices: ["msgBox('Hello World');","alertBox('Hello World');","msg('Hello World');","alert('Hello World');"],
        answer: "alert('Hello World')"
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
}

];
// Dom Manipulation
var sectionEl = document.getElementById("main-content");
var divEl = document.getElementById("container");
var startQuizbtn = document.getElementById("my-submit");
var timerEl = document.getElementById("time-span");

// Variable Declaration
var questionDiv = document.createElement("div");
var secondsLeft = 20*questions.length; // Given that 20 second for each question.
var score = 0;
var index = 0;

//set time for questions.
function setTime(){
    var timeInterval = setInterval(function(){
    if(secondsLeft > 0){
        secondsLeft--;
    }
    else{
        secondsLeft = 0;
    }
        timerEl = secondsLeft;
    if(secondsLeft === 0){
        clearInterval(timeInterval);
        timerEl = secondsLeft;
        emptyQuiz2(questionDiv);
        finalScore();
    }
    },1000)
}

var scores=[];
//this is the object in which I store my players.
var players={
    name:"",
    score:0,
};

 //This function removes all the children of el
function emptyQuiz2(el){

    while (el.firstChild) {
        el.removeChild(el.firstChild);
    } 
}

//Shows the questions on the page
function showQuestion(){
    if(index >= questions.length)
    { finalScore();
        return;}
    var question=document.createElement("p");
    question.textContent=questions[index].quiz;
    questionDiv.append(question);
    questionDiv.setAttribute("style","display:block");
    sectionEl.append(questionDiv);
    answerChoices(); //lists the options
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
    lists.addEventListener("click",validate);
}


// Render question function

let lastquestionIndex = questions.length - 1;
let runningquestionIndex = 0;
function renderQuestion(){
    

}
// Start Quiz button. Here our start quiz button handles a click event.
startQuizbtn.addEventListener("click", function(event){
    event.preventDefault();
    var questionDiv = document.createElement("div");
    questionDiv.textContent = (questions[i]);
    divEl.appendChild(questionDiv);


});

