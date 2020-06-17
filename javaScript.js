var playing = false;
var score ;//note :we are not giving vale 0 
var timeremaining ;
var action;
var correctAnswer;


//if we click on the start/reset
document.getElementById("startReset").onclick = 
    function(){
        //if we are playing
        if(playing == true){
            
            //reload page
            location.reload();//reload webpage
        }else{
            //if we are not playing    
             //change mode to palying
            playing = true; 
            //set score to 0
            score = 0;
                       
            document.getElementById("scorevalue").innerHTML = score;
            //show countdown box
            show("timeRemaining")            
            
            //note:added some logic
            timeremaining = 60;
            document.getElementById("timeRemainingValue").innerHTML = timeremaining;
            
            //hiding game over box
            hide("gameOver");
            
            //change button :reset    
            document.getElementById("startReset").innerHTML = "Reset Game";
            
            //start countdown 
            startCountDown();
            
            //generate a new Q and A
            generateQA();
        }
}

//functions sections:

//start counter
function startCountDown(){
    action = setInterval(function(){
        timeremaining -=1;
        
        document.getElementById("timeRemainingValue").innerHTML = timeremaining;
        
        //to prevent the decrement counter from getting negative
        if(timeremaining == 0){//game over
            stopCountDown();
            show("gameOver");
            
            //display game over 
            document.getElementById("gameOver").style.display = "block";
            //changing the tet of gameOver
             document.getElementById("gameOver").innerHTML = "<p>* Game Over *</p><p>Your Score is "+score+".</p>";            
            
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false; 
            
            document.getElementById("startReset").innerHTML= "Start Game";
            
        }
    },1000); //it's in milli seconds but interval required is 1sec so taken 1000
}
    
//stop counter
function stopCountDown(){
    clearInterval(action);
}

//hide element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate Q and A
function generateQA(){
    var x = 1 + Math.round(Math.random()*9);//Generate no btw 0 to 9 but adding 1 gives 1 to 10
    var y = 1 + Math.round(Math.random()*9);//Generate no btw 1 to 9
    correctAnswer = x*y;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    //fill any random one box with correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    //fill other boxes with wrong answer
    
    var answers = [correctAnswer];
    
    for(i=1 ; i<5; i++){
        if(i != correctPosition){
            //Comparison operator :!==  not equal value and type , 
            //!= : not equal type
            //=== : equal value and equal type
            
            var wrongAnswer;
            
            //to prevent grenerating the correct answers in two or more boxes
            //try repalcing the do-while with while loop it will gives undefined values in the boxes
            do{
                wrongAnswer = (1 + Math.round(Math.random()*9))*(1 + Math.round(Math.random()*9));//generating any random wrong answer
            //fill box with wrong answer
                
            }while(answers.indexOf(wrongAnswer) > -1)//note : no ; after do-while loop
                
            document.getElementById("box"+i).innerHTML = wrongAnswer;  
            answers.push(wrongAnswer);
            
        }
    }
}

for(i=1 ; i<5; i++){
    document.getElementById("box"+i).onclick =
    function(){
    //check if we are playing
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
            //correct answer
            
            //increase score by 1
            score++;
            
            document.getElementById("scorevalue").innerHTML = score;
            
            //hiding the wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);
            
            //generate Q and A
            generateQA();
            
        }else{
            //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);
        }
    }
}
}



//if we click on answer box
    //if we are playing
        //correct
            //yes
                //increase score
                //show correct box for line
                //generate new Q&A
            //no
                //show try again box for 1sec




        //set score to 0
        //show countdown box
        //reduce time by 1sec in loops
            //timeleft
                //yes: continue
                //no:gameover
            //change button :reset
            //generate new Q&A





//if we click on answer box
    //if we are playing
        //correct
            //yes
                //increase score
                //show correct box for line
                //generate new Q&A
            //no
                //show try again box for 1sec