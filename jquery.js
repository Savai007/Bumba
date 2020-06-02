var playing = false;
var score;
var trialsLeft;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','pineapple','watermelon'];
var step;
var action; //used for setInterval
$(function(){
  //click on start reset button
  $("#startreset").click(function()
  {

    //if we are playing
    if(playing == true){
       //reload
       location.reload();
    }else{

//we are not playing
      playing = true;//game initiated
    //set score to 0
    score=0;//set score to 0
    $("#scorevalue").html(score);

    $("#trialsLeft").show();
    trialsLeft = 3;
    addHearts();

    //hide game over box
      $("#gameOver").hide();
      ///change button text to reset game
      $("#startreset").html("Reset Game");
      //start sending fruits
      startAction();
    }
  

  });

$("#fruit1").mouseover(function(){
  score++;
  $("#scorevalue").html(score); //update score
  // document.getElementById("sliceSound").play();
  $("#sliceSound")[0].play(); //playsound.

    //stop fruit 
  clearInterval(action);
  //hide fruit
  $("#fruit1").hide("explode", 500); //slice fruit

  //send new fruit

  setTimeout(startAction, 500);
});

//slice a fruit
  // play sound 
  //explode fruit
 function addHearts(){
   $("#trialsLeft").empty();
  for(i = 0; i < trialsLeft; i++){
    $("#trialsLeft").append('<img src="images/heart.png" class="life">');
  }
 }

 //start sending fruit
 function startAction(){
   //generate a fruit
   $("#fruit1").show();
   chooseFruit(); //choose a random fruit
  $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50})
 //random top position


 //generate a random step
 step = 1+ Math.round(5*Math.random());
 //change step
 //move fruit down by one step every 10ms
action = setInterval(function(){
  $("#fruit1").css('top',
  $("#fruit1").position().top + step);


 //check if the fruit is too low
 if($("#fruit1").position().top> $("#fruitsContainer").height()){
  // check if we have trials left
      if(trialsLeft > 1){
                      $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50})
              //random top position


              //generate a random step
              step = 1+ Math.round(5*Math.random());
                  //reduce trials by one
                  trialsLeft --;
                  
                  //populate trialsLeft box
                  addHearts();
      }else{ //gameover
          playing = false; // we arent playing anymore
          $("#startreset").html("Start Game"); //change button to start game
          $("#gameOver").show(); //gameover screen
          $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
          $("#trialsLeft").hide();
        stopAction();
      }
 }

},10);
} 
  
 // generate a random fruit
 function chooseFruit(){
   $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] + '.png')
 }
 //stop dropping fruits
 function stopAction(){
clearInterval(action);
$("#fruit1").hide();

 }
});