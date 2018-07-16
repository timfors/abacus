export default class FlashCardDrawer{
	constructor(game){
		this.game = game;
	}

	drawAllGame(){
		for (impulseNumbers in this.game.impulses) {
			if (this.game.cfg.abacusCount === 1) {
				this.drawSingleAbacus(impulseNumbers);
				sleep(this.game.cfg.delay);
			} else {
				this.drawMultipleAbacus(impulseNumbers);
				sleep(this.game.cfg.delay);
			}
		}
	}
	drawMultipleAbacus(impulseNumbers) {
		$("#singleGame").hide();
	    $("#multiGame").html("");
	    $("#multiGame").show();
	    $("#multiGamePause").show();
	    // $(".game-pause-buttons-resume").hide();
	    for (gameNumber in impulseNumbers) {
	    	let nStr = gameNumber.toString();
	   		let abacusTmp = '<div class="ms-container abacus-col-container clearfix answer-area-multi" id="screen' + screen + '"><div class="abacus-fields-wrapper"><div class="abacus-fields"  id="abacus_' + screen + '">';
        	let numbersTmp = '';

	    	for (let i = 1; i <= (this.game.cfg.difficulty == 0 ? 1 : this.game.cfg.difficulty); i++) {
	            abacusTmp += '<div class="abacus-col-wrapper"><div class="abacus-col">\n' +
	            '                                <div class="abacus-row">\n' +
	            '                                    <div class="abacus-vertical-line"></div>\n' +
	            '                                    <img id="abacus' + i + 'n5n" src="/images/games/notActiveFlash.svg">\n' +
	            '                                </div>\n' +
	            '                                <div class="abacus-row">\n' +
	            '                                    <div class="abacus-vertical-line"></div>\n' +
	            '                                    <img id="abacus' + i + 'n5a" src="/images/games/activeFlash.svg">\n' +
	            '                                </div>\n' +
	            '                                <div class="abacus-row abacus-white-row">\n' +
	            '                                    <div class="abacus-white-row"></div>\n' +
	            '                                </div>\n' +
	            '                                <div class="abacus-row">\n' +
	            '                                    <div class="abacus-vertical-line"></div>\n' +
	            '                                    <img id="abacus' + i + 'n1a" src="/images/games/activeFlash.svg">\n' +
	            '                                </div>\n' +
	            '                                <div class="abacus-row">\n' +
	            '                                    <div class="abacus-vertical-line"></div>\n' +
	            '                                    <img id="abacus' + i + 'n2a" src="/images/games/activeFlash.svg">\n' +
	            '                                    <img id="abacus' + i + 'n1n" src="/images/games/notActiveFlash.svg">\n' +
	            '                                </div>\n' +
	            '                                <div class="abacus-row">\n' +
	            '                                    <div class="abacus-vertical-line"></div>\n' +
	            '                                    <img id="abacus' + i + 'n3a" src="/images/games/activeFlash.svg">\n' +
	            '                                    <img id="abacus' + i + 'n2n" src="/images/games/notActiveFlash.svg">\n' +
	            '                                </div>\n' +
	            '                                <div class="abacus-row">\n' +
	            '                                    <div class="abacus-vertical-line"></div>\n' +
	            '                                    <img id="abacus' + i + 'n4a" src="/images/games/activeFlash.svg">\n' +
	            '                                    <img id="abacus' + i + 'n3n" src="/images/games/notActiveFlash.svg">\n' +
	            '                                </div>\n' +
	            '                                <div class="abacus-row">\n' +
	            '                                    <div class="abacus-vertical-line"></div>\n' +
	            '                                    <img id="abacus' + i + 'n4n" src="/images/games/notActiveFlash.svg">\n' +
	            '                                </div>\n' +
	            '                            </div></div>';
		        numbersTmp += '<div class="abacus-col no-border">' + nStr.charAt(0) + '</div>';
		        nStr = nStr.substr(1);
	        checkResize()
	        }

	    $("#multiGame").append(abacusTmp + "</div>" +
            "<div class='game-answer-ms'><input type='text' id='game-answer-" + screen + "'/></div>" +
            "<div class='game-result-ms' id='game-result-" + screen + "'></div>" +
            "</div></div>");
        // $("#abacus-numbers").html(numbersTmp);
        $(".game-answer-field").hide();

        nStr = impulseNumber.toString();
        for (var i = 1; i <= (this.game.cfg.difficulty == 0 ? 1 : this.game.cfg.difficulty); i++) {

            var n = parseInt(nStr.charAt(0));
            $("#abacus" + i + "n5as" + screen).hide();
            if (n > 4) {
                $("#abacus" + i + "n5ns" + screen).hide();
                $("#abacus" + i + "n5as" + screen).show();
                // $("#abacus" + i + "n5as"+screen).prev().hide();
                n -= 5;
            }
            for (var k = 1; k < 5; k++) {
                $("#abacus" + i + "n" + k + "as" + screen).hide();
                $("#abacus" + i + "n" + k + "ns" + screen).show();
                // $("#abacus" + i + "n" + k + "ns"+screen).prev().prev().show();
            }
            for (var k = 1; k <= n; k++) {
                $("#abacus" + i + "n" + k + "as" + screen).show();
                // $("#abacus" + i + "n" + k + "as"+screen).prev().show();
                $("#abacus" + i + "n" + k + "ns" + screen).hide();
            }
            nStr = nStr.substr(1);
        }
        $(".question").show();
        $("#game-answer").val("");
	}

	drawSingleAbacus(impulseNumber) {
		$(".game-show-full-sequence").hide();
    	$("#abacus-numbers").hide();

	    let screen = 0;
	    
    	let nStr = impulseNumber.toString();
   		let abacusTmp = '<div class="ms-container abacus-col-container clearfix answer-area-multi" id="screen' + screen + '"><div class="abacus-fields-wrapper"><div class="abacus-fields"  id="abacus_' + screen + '">';
    	let numbersTmp = '';

    	for (let i = 1; i <= (this.game.cfg.difficulty == 0 ? 1 : this.game.cfg.difficulty); i++) {
            abacusTmp += '<div class="abacus-col-wrapper"><div class="abacus-col">\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img id="abacus' + i + 'n5n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img id="abacus' + i + 'n5a" src="/images/games/activeFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row abacus-white-row">\n' +
            '                                    <div class="abacus-white-row"></div>\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img id="abacus' + i + 'n1a" src="/images/games/activeFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img id="abacus' + i + 'n2a" src="/images/games/activeFlash.svg">\n' +
            '                                    <img id="abacus' + i + 'n1n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img id="abacus' + i + 'n3a" src="/images/games/activeFlash.svg">\n' +
            '                                    <img id="abacus' + i + 'n2n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img id="abacus' + i + 'n4a" src="/images/games/activeFlash.svg">\n' +
            '                                    <img id="abacus' + i + 'n3n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img id="abacus' + i + 'n4n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                            </div></div>';
	        numbersTmp += '<div class="abacus-col no-border">' + nStr.charAt(0) + '</div>';
	        nStr = nStr.substr(1);	        
	    	
	    	$("#abacus-fields").html(abacusTmp);
    		$("#abacus-numbers").html(numbersTmp);
    		$(".game-answer-field").hide();

    		nStr = impulseNumber.toString();
	        for (var i = 1; i <= (this.game.cfg.difficulty == 0 ? 1 : this.game.cfg.difficulty); i++) {

	        	var n = parseInt(nStr.charAt(0));
		        $("#abacus" + i + "n5a").hide();
		        if (n > 4) {
		            $("#abacus" + i + "n5n").hide();
		            $("#abacus" + i + "n5a").show();
		            n -= 5;
		        }
		        for (var k = 1; k < 5; k++) {
		            $("#abacus" + i + "n" + k + "a").hide();
		            $("#abacus" + i + "n" + k + "n").show();
		        }
		        for (var k = 1; k <= n; k++) {
		            $("#abacus" + i + "n" + k + "a").show();
		            $("#abacus" + i + "n" + k + "n").hide();
		        }
		        nStr = nStr.substr(1);
		    }
		    $(".question").show();
		    $("#game-answer").val("");
		    checkResize();

	        screen++
	    }
	}

	function showFinalWindow() {
	    var tmp = "";
	    let allAnswrCount = 0;
	    let correctAnswCount = 0;
	    for (let abakus in this.game.answers){
	    	for (let answer in abakus) {
	    		if (answer.isCorrect) {
	    			correctAnswCount++;
	    		}
	    		allAnswrCount++;
	    	}
	    }
	    var userAns = $("#game-answer").val();
	    userAns = userAns.split(/(?:,| |, )/i).filter(function (n) {
	        return n != "";
	    });

	    var persents = parseInt((correctAnswCount / allAnswrCount) * 100);
	    if (persents == 0) {
	        tmp = dictionary.appeal0;
	    } else if (persents > 0 && persents <= 20) {
	        tmp = dictionary.appeal1;
	    } else if (persents > 20 && persents <= 50) {
	        tmp = dictionary.appeal2;
	    } else if (persents > 50 && persents <= 80) {
	        tmp = dictionary.appeal3;
	    } else if (persents > 80) {
	        tmp = dictionary.appeal4;
	    }

	    // $(".game-final-block-blue").html(correctAnswersCount + " из " + terms + " " + declOfNum(right, ["правильный ответ", "правильных ответов", "правильных ответов"]) + ",<br>" + tmp);
	    $(".game-final-block-blue").html(
	        dictionary.resultingRightAnswers
	            .replace("{right}", correctAnswCount)
	            .replace("{terms}", allAnswrCount)
	            .replace("{rightAnswers}", declOfNum(correctAnswCount, dictionary.rightAnswers.nominative))
	        + ",<br>" + tmp
	    );
	    $(".game-answer-area-bg").hide();
	    $(".game-final-window").show();
	    if (!gameSaving) {
	        $("#game-save").hide();
	    }
	    // $(".game-final-blocks").css("margin-top", ($(".game-final-window").height() / 2 - ($(".game-final-blocks").height() + 30) / 2) + 'px');
	}


}

function sleep (seconds) {
  const start = new Date().getTime();
  while (start) {
    if (new Date().getTime() - start > seconds * 1000){
      break;
    }
  }
}


function checkResize() {
    $(".game-answer-area").css("width", $(".game-answer").width() + 'px');

    $(".game-answer-area-bg").css("margin-top", ($(document).height() / 2 - ($(".game-answer-area-bg").height() + 100) / 2) + 'px');

    $(".game-settings").css("margin-top", ($(document).height() / 2 - ($(".game-settings").height() + 30) / 2) + 'px');
}