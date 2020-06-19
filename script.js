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
},

];
// Dom Manipulation
var sectionEl = document.getElementById("main-content");
var divEl = document.getElementById("container");
var startQuizbtn = document.getElementById("my-quiz");
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
        timerEl.innerHTML = secondsLeft;
    if(secondsLeft === 0){
        clearInterval(timeInterval);
        timerEl.innerHTML = secondsLeft;
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
// This function is called when startQuiz button is clicked. Timer starts, show the question page 
function questionShow(event){
    if (event.target.getAttribute("id")=== my-quiz){
        event.preventDefault();
        setTime();
        showQuestion();
        timerEl.innerHTML = secondsLeft;
        divEl;
        divEl.classList.add("hide");
        questionDiv;
        questionDiv.setAttribute("id","quizShow");

    }

}

// Render question function

  // final result and create the result box page using javascript.
function  finalScore(){
    if (secondsLeft>0){
        clearInterval(timeInterval);
    }
    var message = document.createElement("h1");
    message.textContent = "All Done!!";
    message.setAttribute("style","margin-left:3.5em;");
    questionDiv.append(message);

    var secondMessage = document.createElement("h2");
    secondMessage.textContent = "Your Final Score is :" +score;
    message2.setAttribute("style","margin-left:5em;");
    questionDiv.append(secondMessage);

    var label=document.createElement("label");
    label.textContent="Enter Initials:"
    label.setAttribute("style","margin-left:4em;margin-top:2rem;");
    questionDiv.append(label);

    var initialsBox=document.createElement("input");
    initialsBox.setAttribute("type","text");
    initialsBox.setAttribute("id","initials");
    label.setAttribute("for","initials");
    initialsBox.setAttribute("style","margin-left:1em;margin-bottom:3em;margin-top:2em;");
    questionDiv.append(initialsBox);

    var submitButton=document.createElement("input");
    submitButton.setAttribute("type","submit");
    submitButton.setAttribute("id","submitButton");
    submitButton.setAttribute("class","button");
    submitButton.setAttribute("style","display:inline-block;position:relative;left:3%;padding:0px;font-size:0.8rem;");
    questionDiv.append(submitButton);
    
    submitButton.addEventListener("click",function(event){
        event.preventDefault();
        players.push({name:score});

    


});
}


// Start Quiz button. Here our start quiz button handles a click event.
startQuizbtn.addEventListener("click", function(event){
    event.preventDefault();
    


});

