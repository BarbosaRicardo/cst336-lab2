$(document).ready(function() {

//Global Variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

//event listener
//submit quiz button
$("button").on("click", gradeQuiz);

//question 5 images
$(".q5Choice").on("click", function(){
   $(".q5Choice").css("background","");
   $(this).css("background","rgb(255, 255, 0)");
});

displayQ4Choices();
displayQ8Choices();

function displayQ4Choices(){
   let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delware"];
   q4ChoicesArray=_.shuffle(q4ChoicesArray);

   for (let i=0; i < q4ChoicesArray.length; i++) {
      $("#q4Choices").append(` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
      value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`);
   }
}//displayQ4Choices

function displayQ8Choices(){
   let q8ChoicesArray = ["California", "Texas", "Canada", "Alaska", "Antarctica"];
   q8ChoicesArray=_.shuffle(q8ChoicesArray);

   for (let i=0; i < q8ChoicesArray.length; i++){
      $("#q8Choices").append(` <input type="radio" name="q8" id="${q8ChoicesArray[i]}" 
      vale="${q8ChoicesArray[i]}"> <label for="${q8ChoicesArray[i]}"> ${q8ChoicesArray[i]}</label>`);
   }
}//displayQ8Choices

//functions
function isFormValid(){
   let isValid= true;
   if($("#q1").val() == ""){
      isValid = false;
      $("#validationFdbk").html("Question 1 was not answered")
   }
   return isValid;
}
function rightAnswer(index){
   
   $(`#q${index}Feedback`).html("Correct!");
   $(`#q${index}Feedback`).attr("class", "bg-success text-white");
   $(`#markImg${index}`).html("<img src='img/checkmark.png'>");
   score += 12.5;
     
   }

function wrongAnswer(index){
 $(`#q${index}Feedback`).html("Incorrect!");
 $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
 $(`#markImg${index}`).html("<img src ='img/xmark.png' alt='xmark'>");
}

function gradeQuiz(){
   $("#validationFdbk").html(""); //resets validation feedback
   if (!isFormValid()) {
      return;
   }
   //variables
   score = 0;
   let q1Response = $("#q1").val().toLowerCase();
   let q2Response = $("#q2").val();
   let q4Response = $("input[name=q4]:checked").val();
   let q6Response = $("#q6").val().toLowerCase();
   let q8Response = $("input[name=q8]:checked").val();

   //question 1
   if (q1Response == "sacramento") {
      rightAnswer(1);
      }else{
         wrongAnswer(1)
      }
   
   //question 2 
   if (q2Response == "mo") {
      rightAnswer(2);
       }else{
          wrongAnswer(2);
       }

   //question 3
   if($("#Jefferson").is(":checked") && $("#Roosevelt").is(":checked") && 
   !$("#Jackson").is(":checked")&& !$("#Franklin").is(":checked")){
      rightAnswer(3);
   }else{
      wrongAnswer(3);
   }

   //question 4
   if(q4Response == "Rhode Island") {
      rightAnswer(4);
   }else{
      wrongAnswer(4);
   }

   //question5
   if($("#seal2").css("background-color") == "rgb(255, 255, 0)") {
      rightAnswer(5);
   }else{
      wrongAnswer(5);
   }

   //question6
   if(q6Response == 'alaska'){
      rightAnswer(6);
   }else{
      wrongAnswer(6);
   }

   //question7
   if($("#Lincoln").is(":checked") && $("#Garfield").is(":checked") && $("#McKinley").is(":checked") 
      && $("#Kennedy").is(":checked")){
         rightAnswer(7)
      }else{
         wrongAnswer(7)
      }

   //question8
   if(q8Response == "Alaska"){
      rightAnswer(8)
   }else{
      wrongAnswer(8)
   }
   
   $("#totalScore").html(`Total Score: ${score}`);
   $("#totalAttempts").html(`Total Attempts: ${++attempts}`);
   localStorage.setItem("total_attempts", attempts);

 //validates test greater than 80
 if(score < 80){
    $("#totalScore").html(`Total Score: ${score}`);
    $("#totalScore").attr("class", "text-danger");
    $("#jumbo").html("KEEP STUDYING AND TRY AGAIN!!!");
    $("#jumbo").attr("class","p-3 mb-2 bg-danger text-white")
    
 }else{
    $("#totalScore").html(`Total Score: ${score}`);
    $("#totalScore").attr("class","text-info");
    $("#jumbo").html("CONGRATULATIONS YOU PASSED!!!");
    $("#jumbo").attr("class", "p-3 mb-2 bg-success text-white");
 }
 return
}

});//ready

