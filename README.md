# Code-Quiz Application

## Description

* This Timer based code quiz application is developed using the HTML5, CSS and JavaScript programming language. The application display five multiple code related questions one by one when the start-quiz button is clicked.

*	Once the quiz starts the clock starts work and count down. Each question has a time limit of 10 seconds and incorrect answer lead to penalize from the score the plyer got. based on this rule the app setup to deduct 5 seconds from each of incorrect answers.

*	The player's score is calculated by the time remaining. When the time runs out and/or all questions are answered, the user is presented with their final scores and asked to enter their initials. Their final scores and initials are stored in local storage. If the user took the quiz before, his previous score will be overwritten with his last score. 

*	When the user hits the submit button, he sees the list of users with highest scores. If his score is bigger or equal to his opponents, then the player will be able to see his score in the list. The user has the option to go back to "Start Quiz" page where he can take the quiz again. He also has the option to delete the highest score. When the highest score is cleared, the user with the score is deleted from the storage. If there are more people who took the quiz, the second highest score is displayed, if not empty list will be shown.

*	When the time runs out or the player finishes all the questions, he's presented with a dynamically created page and asked to enter his initials. When he hits submit button, an entry object is formed with fields name and score. First, we get the players which are addressed as contenders from the local storage. We search if the user exits. If that's the case his entry is replaced, other wise pushed to the array of objects and stored in the local storage.

*	"score.html" is shown on top of the page which lists high scores with go back and delete buttons. We get all the contenders from the storage. We find the players with maximum score or scores and show it on the text area. When clear high score button is clicked, the highest score or scores are cleared from the local storage and text area is populated with the next highest score or scores.
![Code quiz screenshoot](https://user-images.githubusercontent.com/43423292/85214483-3613da80-b339-11ea-9365-94b271298d36.PNG)
Here you can visit the deployed version of the application: https://haymanotyealemu.github.io/Code-Quiz/
