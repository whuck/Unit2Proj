//globals for score & choices
var playerPick = "";
var compPick = "";
var playerScore = 0;
var compScore = 0;
$(document).ready(function() {
    //draw player choices
    drawChoices();


    //continue game button click
    $("#continueBtn").click(function() {
        drawChoices();
    });
    //new game button click
    $("#newBtn").click(function() {
        //reset game data
        playerScore = 0;
        compScore = 0;
        $("#playerScore").text(playerScore);
        $("#cpuScore").text(compScore);
        $("#outcome").text("");
        drawChoices();
    });
    $("#rules").click(function(){
        $("#affinities").toggle();
    });
});

    //function to display the player weapon choices
    function drawChoices() {
        //hide continue and newgame btns
        $("#continueBtn").hide();
        $("#newBtn").hide();

        //clear output divs for player / cpu
        $("#player").empty();
        $("#cpu").empty();
        $("#outcome").text("");
        //add spacer divs
        var spacer = $("<div>").addClass("spacer").text("Player:");
        $("#player").append(spacer);

        var spacer2 = $("<div>").addClass("spacer").text("CPU:");
        $("#cpu").append(spacer2);
        //create choice <imgs> toss in <div>s
        var choices = ["scissors","paper","rock","lizard","spock"];
        for (i in choices) {
            var imgSrc = `sm_${choices[i]}2.png`;
            var choice = $("<div>").addClass("sel").addClass("block").addClass("choice");
            choice.attr('name',choices[i]);
            choice.attr('id',choices[i]);
            choice.append($("<img>").attr('src',imgSrc).addClass("sel"));
            $("#player").append(choice);
        }
        //add click events to choice <div>s

        $("div.sel").click(function () {
            //check to see if you can select it
            // that is.. make sure you cant keep selecting when in between rounds
            if ($(this).hasClass("sel")) {
                playerPick = this.id;
                computerPick();
            }
        });
    }

    //function makes cpu turn, and does game logic
    function computerPick() {
        //pick a weapon for cpu
        var cpuPick = Math.floor(Math.random()*5+1);
        switch (cpuPick) {
            case 1 : compPick = "scissors"; break;
            case 2 : compPick = "paper"; break;
            case 3 : compPick = "rock"; break;
            case 4 : compPick = "lizard"; break;
            case 5 : compPick = "spock"; break;
        }

        //hide other player choices
        //make them all unclickable (remove "sel" class) inbetween rounds
        var choices = $("div.choice");
        choices.each(function(){
            if(this.id !== playerPick) {
                $(this).hide();
            }
            $(this).removeClass("sel");
        });


        //display computer's choice
        var pickImg = $("<img>");
        var pickImgSrc = 'sm_'+compPick+'2.png';
        pickImg.attr('src',pickImgSrc);
        $("#cpu").append(pickImg);

        //determine winner
        var winner = "Computer wins the round!";
        if(playerPick===compPick) {
            winner="It's a draw!";
            $("#outcome").removeClass("cpu");
            $("#outcome").removeClass("player");
        }
        else {
            switch(playerPick) {
                case "rock" : if (compPick==="scissors" || compPick==="lizard") {winner="Player wins the round!"} break;
                case "paper" : if (compPick==="spock" || compPick==="rock") {winner="Player wins the round!"} break;
                case "scissors" : if (compPick==="paper" || compPick==="lizard") {winner="Player wins the round!"} break;
                case "lizard" : if (compPick==="spock" || compPick==="paper") {winner="Player wins the round!"} break;
                case "spock" : if (compPick==="scissors" || compPick==="rock") {winner="Player wins the round!"} break;
            }
            //increment winner's score
            if(winner==="Player wins the round!") {
                playerScore++;
                $("#outcome").removeClass("cpu");
                $("#outcome").addClass("player");
            }
            else if(winner==="Computer wins the round!") {
                compScore++;
                $("#outcome").removeClass("player");
                $("#outcome").addClass("cpu");
            }
        }
        //output the outcome
        $("#playerScore").text(playerScore);
        $("#cpuScore").text(compScore);
        $("#outcome").text(winner);

        //check to see if game is over
        if(playerScore == 2) {
            $("#outcome").text("You win the Game!!");
            $("#newBtn").show();
        } else if (compScore == 2) {
            $("#outcome").text("The CPU wins the Game!!");
            $("#newBtn").show();
        }
        else {
            $("#continueBtn").show();
        }
    }
//});