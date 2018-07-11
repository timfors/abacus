import FlashCardGame from "./flash-card-game.class.js";
import FlashCardDrawer from "./flash-card-drawer.js";
import drawBigAbakus from "./big-abakus.js";

class GameModule {
	constructor(){
		this.mode;
		this.cfg = {
			abacusCount: 1,
			difficulty: 1,
			delay: 1000,
			impulsesCount: 1,
			maxImpulsesCount: 10,
			maxDelay: 10000
		};
		this.game = FlashCardGame(cfg);
		this.gameDrawer = FlashCardDrawer(game);
	}
	showBigAbakus(){
		drawBigAbakus();
	}

	skipHello() {
	    $(".game-settings").css({"display": "table"});
	    $(".game-gray-bg").show();
	    $(".game-start-window").hide();
	}


	showSettings() {
	    this.gameDrawer.hideAnswerField()
	    $("#bigAbacus").hide();
	    $(".game-gray-bg").show();
	    $(".game-settings").show();
	    $(".game-big-pause-buttons").hide();
	    
	    

	}
	settingsGame() {
	    this.game.pause();
	    if (this.game.cfg.abacusCount === 1) {
	        $(".game-settings").css("display", "table");
	        $(".game-answer-area-bg").css("display", "none");
	    } else {
	        $(".game-settings").css("display", "table");
	        $("#multiGame").css("display", "none");
	        $("#multiGamePause").hide();
	    }
	    $(".game-gray-bg").show();
	    $(".game-pause-buttons").show();

	}

	setColumnsCount(count) {
	    if (this.cfg.abacusCount != count) {

	        $("#gameColumns" + cfg.abacusCount).css("background", "#ffffff");
	        $("#gameColumns" + cfg.abacusCount).css("color", "#000000");
	        $("#gameColumnsInactive" + this.cfg.abacusCount).css("background", "#ffffff");
	        $("#gameColumnsInactive" + this.cfg.abacusCount).css("color", "#000000");


	        $("#gameColumns" + count).css("background", "#29A4DD");
	        $("#gameColumns" + count).css("color", "#ffffff");
	        $("#gameColumnsInactive" + count).css("background", "#D3D3D3");
	        $("#gameColumnsInactive" + count).css("color", "#000000");

	        this.cfg.abacusCount = count;
	    }
	}


	changeImpulsesCount(i) {
		if (this.cfg.impulsesCount + i < 1) {
	        alert(dictionary.numberOfImpulsesCannotBeLessThan + " 1");
	    } else if (this.cfg.impulsesCount + i > this.cfg.maxImpulsesCount) {
	        alert(dictionary.numberOfImpulsesCannotBeMoreThan + " " + this.cfg.maxImpulsesCount);
	    } else {
	        this.cfg.impulsesCount += i;
	        $("#gameTerms").html(this.cfg.impulsesCount);
	        $("#gameTermsInactive").html(this.cfg.impulsesCount);
	    }
	    this.cfg.impulsesCount += i;
	    $("#gameTerms").html(this.cfg.impulsesCount);
	    $("#gameTermsInactive").html(this.cfg.impulsesCount);
	}

	changeImpulsesCountWindow() {
	    var i = prompt(dictionary.numberOfImpulses + ': ', this.cfg.impulsesCount);
	    i = parseInt(i);
	    if (i < 1) {
	        alert(dictionary.numberOfImpulsesCannotBeLessThan + " 1");
	    } else if (typeof i !== Number){
	    	alert("Please enter a number");
	    } else if (i > this.cfg.maxImpulsesCount) {
	        alert(dictionary.numberOfImpulsesCannotBeMoreThan + " " + this.cfg.maxImpulsesCount);
	    } else {
	        this.cfg.impulsesCount = i;
	        $("#gameTerms").html(this.cfg.impulsesCount);
	        $("#gameTermsInactive").html(this.cfg.impulsesCount);
	    }
	}



	changeGameDelayWindow() {
	    var i = prompt(dictionary.interval + ': ', this.cfg.delay / 1000);
	    i = parseFloat(i.replace(/,/g, '.')) * 1000;
	    if (i < 100) {
	        alert(dictionary.intervalCannotBeLessThan + " 0.1 " + dictionary.sec);
	    } else if (typeof i !== Number){
	    	alert("Please enter a number");
	    } else if (i > this.cfg.maxDelay) {
	        alert(dictionary.intervalCannotBeMoreThan + " " + this.cfg.maxDelay / 1000 + " " + dictionary.sec);
	    } else {
	        this.cfg.delay = i;
	        $("#gameDelay").html(this.cfg.delay / 1000 + " " + dictionary.sec);
	        $("#gameDelayInactive").html(this.cfg.delay / 1000 + " " + dictionary.sec);
	    }
	}
	changeGameDelay(i) {
	    if (this.cfg.delay + i < 100) {
	        alert(dictionary.intervalCannotBeLessThan + " 0.1 " + dictionary.sec);
	    } else if (this.cfg.delay + i > this.cfg.maxDelay) {
	        alert(dictionary.intervalCannotBeMoreThan + " " + this.cfg.maxDelay / 1000 + " " + dictionary.sec);
	    } else {
	        this.cfg.delay += i;
	        $("#gameDelay").html(this.cfg.delay / 1000 + " " + dictionary.sec);
	        $("#gameDelayInactive").html(this.cfg.delay / 1000 + " " + dictionary.sec);
	    }
	}


	changeGameLevel(i) {
	    if (i != this.cfg.difficulty) {
	        for (var l = 0; l < 9; l++) {
	            if (i != l) {
	                $("#gameSettingsLvl" + l).css("background", "#ffffff");
	                $("#gameSettingsLvl" + l).css("color", "#000000");
	            } else {
	                $("#gameSettingsLvl" + l).css("background", "#29A4DD");
	                $("#gameSettingsLvl" + l).css("color", "#ffffff");
	            }
	        }
	    }
	    this.cfg.difficulty = i;
	}

	showSettingsField() {
	    $("#gameModule").prop('disabled', false);
	    $(".game-settings-field").css("display", "table");
	    $(".game-settings-field-inactive").hide();
	}

	hideSettingsField() {
	    $("#gameModule").prop('disabled', true);
	    $(".game-settings-field").hide();
	    $(".game-settings-field-inactive").css("display", "table");
	}

	hideAnswerShield() {
	    $(".game-answer").hide();
	    $(".btn-answer").hide();
	}
	showAnswerField() {
	    $(".game-answer").show();
	    $(".btn-answer").show();
	}
	startGame() {	   
	    $(".game-answer").val("");

	    $(".game-final-window").hide();
	    $(".game-gray-bg").hide();
	    $(".game-pause-buttons").hide();
	    $(".game-settings").hide();
	    $(".btn-answer").show();
	    $(".game-show-full-sequence").hide();
	    $(".game-hide-full-sequence").hide();
	    this.showAnswerField();

	    $(".game-answer-area-bg").css("display", "table");
	    // $(".game-pause-buttons").show();

	    this.checkAllSettingsInFields();
	    
	    this.game = new FlashCardGame(cfg);
	    this.gameDrawer = new FlashCardDrawer(this.game);

	    this.game.fsm.start();
	    this.gameDrawer.drawAllGame();
	}
	setSettingsFieldToActive() {
	    $("#gameModule").prop('disabled', false);
	    $(".game-settings-field").css("display", "table");
	    $(".game-settings-field-inactive").hide();
	}

	setSettingsFieldToInactive() {
	    $("#gameModule").prop('disabled', true);
	    $(".game-settings-field").hide();
	    $(".game-settings-field-inactive").css("display", "table");
	}

	checkAllSettingsInFields() {
	    $("#gameModule").val(gameModuleSelected);

	    $("#gameLevel").html(this.gameModule.game.cfg.difficulty + " " + declOfNum(this.gameModule.game.cfg.difficulty, dictionary.digits.nominative));
	    $("#gameLevelInactive").html(this.gameModule.game.cfg.difficulty + " " + declOfNum(this.gameModule.game.cfg.difficulty, dictionary.digits.nominative));

	    $("#gameTerms").html(this.gameModule.game.cfg.impulsesCount + " " + declOfNum(this.gameModule.game.cfg.impulsesCount, dictionary.terms.nominative));
	    $("#gameTermsInactive").html(this.gameModule.game.cfg.impulsesCount + " " + declOfNum(this.gameModule.game.cfg.impulsesCount, dictionary.terms.nominative));

	}

	checkAllAnswers() {
		let answers = [];
	    this.game.fsm.finish();
	    $(".game-answer-ms").hide();
	    for (var screen = 0; screen < this.cfg.abacusCount; screen++) {
	        var userAns = $("#game-answer-" + screen).val();
	        userAns = userAns.split(/(?:,| |, )/i).map(function (n) {
	            if (n !== '') {
	            	return parseInt(n);
	            }
	            return 0.1;
	        });
	        answers.push(userAns);
	        let right = 0;
	        for (var i = 0; i < this.game.cfg.impulsesCount i++) {
	            if ([screen][i + 1] === userAns[i]) {
	                right++;
	            }
	        }

	        // $("#game-result-" + screen).html("Правильно " + right + " из " + terms);
	        $("#game-result-" + screen).html(dictionary.rightAnswersInProcess
	            .replace("{right}", right)
	            .replace("{totalAmount}", terms)
	        );
	    }
	    this.game.submit(answers);
	}

	pauseGame() {
	    if (this.game.fsm.state != "paused") {
	        this.game.fsm.pause();
	        $(".game-pause-buttons").show();
	    }
	}
	restartGame() {
	    this.game.fsm.start();
	    $(".game-final-string").hide();
	    startGame();
	}
	resumeGame() {
		this.game.fsm.resume();
		//TODO: Write this func
	}
	saveAnswer() {
	    var answers = [];
	    var csrf = $("#csrf_value").val();
	    for (var i = 1; i <= terms; i++) {
	        var seq = gameSequensesReultStory[i];
	        var ans = gameAnswersStory[i];
	        var seqres = gameSequensesReultStory[i];

	        answers.push({
	            "answer": parseInt(seqres),
	            "userAnswer": parseInt(ans),
	            "sequence": JSON.stringify(seq)
	        });
	    }

	    $.ajax({
	        url: "/homeworks/" + homeWorkId + "/answers",
	        type: 'POST',
	        headers: {
	            'Accept': 'application/json, text/plain, */*',
	            'Content-Type': 'application/json',
	            'X-CSRF-TOKEN': csrf
	        },
	        data: JSON.stringify({
	            answers: answers
	        }),
	        success: function () {
	            window.location.href = "/student/homeworks";
	        },
	        error: function () {
	            $("#game-error").html(dictionary.savingExerciseError);
	            $("#game-error").show();
	            setTimeout(function () {
	                $("#game-error").hide();
	            }, 5000);
	        }
	    });

	}
	function setGameMode(i) {
	    if (this.mode != i) {
	        $("#gameMode" + this.mode).css("background", "#ffffff");
	        $("#gameMode" + this.mode).css("color", "#000000");
	        $("#gameMode" + i).css("background", "#29A4DD");
	        $("#gameMode" + i).css("color", "#ffffff");
	        this.mode = i;
	    }

	    if (this.mode == 1) {
	        showBigAbacus();
	    }
	}

}
const gameModule = new GameModule();


$(window).on("load", () => {
	sounds._initVolumeController();
	sounds._initMuteToggler();
	$(".game-settings-elem[title]").tooltip();
    if (cookie.getCookie("fastReload") == "1") {
        cookie.setCookie("fastReload", "2", 0, "/games/menar");
        gameModule.skipHello();
    }
    $(".game-answer-area").css("height", "240px");
    $(".game-answer-area").css("min-width", "530px");

})

$(window).resize(function () {
    checkResize();
});

$(document).keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (e.keyCode === 13 && gameModule.game.fsm.state === "ready") {
        gameModule.startGame();
        gameModule.game.fsm.start();
    } else if (e.keyCode === 13 && gameModule.game.fsm.state === "waiting") {
        gameModule.game.submit(getAnswers());
        gameModule.game.fsm.finish();
    } else if(e.keyCode === 32 && gameModule.game.fsm.state === "playing") {
    	gameModule.game.fsm.pause();
        gameModule.pauseGame();
    } else if(e.keyCode === 32 && gameModule.game.fsm.state === "paused") {
    	gameModule.game.fsm.resume();
        gameModule.startGame();
    } else if (e.keyCode === 13 && gameModule.game.fsm.state === "waiting") {
        if (screenCount == 1) {
            checkAnswer();
        } else {
            checkAllAnswers();
        }
    } else if (e.keyCode === 13 && gameModule.game.fsm.state === "finished") {
        startGame();
    }
});
