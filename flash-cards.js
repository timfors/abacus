/*
* GAME CONFIG (START)
* */
var SETTINGS = 1;
var STARTED = 2;
var PAUSED = 3;
var ANSWERING = 4;
var LOOKING = 4.5;
var FINISHED = 5;

var lvl;
var terms = 1;
var delay = 1000;
var mode;
var screenCount = 0;

var currentTerm = 0;

var maxLvl = 8; // Максимальный уровень сложности
var maxTerms = 10; // Максимальное кол-во чисел
var maxDelay = 10000; // Максимальное кол-во чисел

var gameModuleSelected = 1;
/*
* END GAME CONFIG
* */

/* GAME INI */
var iterator = 0;
var gameNumber;
var isHomeWork = false;
var gameSaving = false;
var gameExamplesCount = 1;
var gameExampleNumber = 1;
var gameStatus = SETTINGS;
var gameSequensesStory = [];
var gameAnswersStory = [];
var gameSequensesReultStory = [];
var bigAbacusNumbers = [];
var gameCurrentResult = "";
var gameCurrentResultNumber = 0;
var answers = [];
/* END GAME INI */


// $(document).ready(function () {

$(window).on("load", function () {

    checkResize();
    changeGameLevel(1);
    setColumnsCount(1);

    sounds._initVolumeController();
    sounds._initMuteToggler();
    if (cookie.getCookie("fastReload") == "1") {
        cookie.setCookie("fastReload", "2", 0, "/games/menar");
        skipHello();
    }

    $(".game-settings-elem[title]").tooltip();

    $(".game-answer-area").css("height", "240px");
    $(".game-answer-area").css("min-width", "530px");
});

function skipHello() {
    $(".game-settings").css({"display": "table"});
    $(".game-gray-bg").show();
    $(".game-start-window").hide();
}

$(window).resize(function () {
    checkResize();
});

$(document).keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (e.keyCode === 13 && gameStatus > ANSWERING) {
        startGame();
    } else if (e.keyCode === 13 && gameStatus == ANSWERING) {
        if (screenCount == 1) {
            checkAnswer();
        } else {
            checkAllAnswers();
        }
    } else if(e.keyCode === 32 && gameStatus == STARTED) {
        pauseGame();
    } else if(e.keyCode === 32 && gameStatus == PAUSED) {
        resumeGame();
    }
});

function setGameMode(i) {
    if (mode != i) {
        $("#gameMode" + mode).css("background", "#ffffff");
        $("#gameMode" + mode).css("color", "#000000");
        $("#gameMode" + i).css("background", "#29A4DD");
        $("#gameMode" + i).css("color", "#ffffff");
        mode = i;
    }

    if (mode == 1) {
        showBigAbacus();
    }
}

function showSettings() {
    hideAnswerField();
    setGameMode(0);
    $("#bigAbacus").hide();
    $(".game-gray-bg").show();
    $(".game-settings").show();

    $(".game-big-pause-buttons").hide();

}

function showBigAbacus() {
    $(".game-final-window").hide();
    $(".game-gray-bg").hide();
    $(".game-settings").hide();
    $(".game-pause-buttons").hide();
    $(".btn-answer").show();
    $(".game-show-full-sequence").hide();
    $(".game-hide-full-sequence").hide();
    showAnswerField();
    // setSettingsFieldToInactive();
    $(".game-big-pause-buttons").show();
    var abacusTmp = '';
    var numbersTmp = '';
    for (var i = 0; i < 10; i++) {
        abacusTmp += '<div class="abacus-col-wrapper"><div class="abacus-col">\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 5, 0);" id="abacus' + i + 'n5n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 5, 1);" id="abacus' + i + 'n5a" src="/images/games/activeFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row abacus-white-row">\n' +
            '                                    <div class="abacus-white-row"></div>\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 1, 1);" id="abacus' + i + 'n1a" src="/images/games/activeFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 2, 1);" id="abacus' + i + 'n2a" src="/images/games/activeFlash.svg">\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 1, 0);" id="abacus' + i + 'n1n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 3, 1);" id="abacus' + i + 'n3a" src="/images/games/activeFlash.svg">\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 2, 0);" id="abacus' + i + 'n2n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 4, 1);" id="abacus' + i + 'n4a" src="/images/games/activeFlash.svg">\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 3, 0);" id="abacus' + i + 'n3n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                                <div class="abacus-row">\n' +
            '                                    <div class="abacus-vertical-line"></div>\n' +
            '                                    <img class="abacusSelected" onclick="moveAbacusElem(' + i + ', 4, 0);" id="abacus' + i + 'n4n" src="/images/games/notActiveFlash.svg">\n' +
            '                                </div>\n' +
            '                            </div></div>';
        numbersTmp += '<div class="abacus-col no-border" id="bigAbacusNum' + i + '">0</div>';
    }
    bigAbacusNumbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    $("#big-abacus-fields").html(abacusTmp);
    $("#big-abacus-numbers").html(numbersTmp);

    for (var i = 0; i < bigAbacusNumbers.length; i++) {

        var n = bigAbacusNumbers[i];
        if (n > 4) {
            $("#abacus" + i + "n5n").hide();
            $("#abacus" + i + "n5a").show();
            n -= 5;
        } else {
            $("#abacus" + i + "n5n").show();
            $("#abacus" + i + "n5a").hide();
        }
        for (var k = 1; k < 5; k++) {
            $("#abacus" + i + "n" + k + "a").hide();
            $("#abacus" + i + "n" + k + "n").show();
        }
        for (var k = 1; k <= n; k++) {
            $("#abacus" + i + "n" + k + "a").show();
            $("#abacus" + i + "n" + k + "n").hide();
        }
    }
    $("#bigAbacus").show();
}

function moveAbacusElem(i, n, active) {
    if (n == 5) {
        if (active) {
            $("#abacus" + i + "n5n").show();
            $("#abacus" + i + "n5a").hide();
            bigAbacusNumbers[i] -= 5;
        } else {
            $("#abacus" + i + "n5n").hide();
            $("#abacus" + i + "n5a").show();
            bigAbacusNumbers[i] += 5;
        }
    } else {
        var num = n;
        for (var k = n; k < 5; k++) {
            $("#abacus" + i + "n" + k + "a").hide();
            $("#abacus" + i + "n" + k + "n").show();
        }

        if (active) {
            num = n - 1;
            for (var k = 1; k < n; k++) {
                $("#abacus" + i + "n" + k + "a").show();
                $("#abacus" + i + "n" + k + "n").hide();
            }
        } else {
            for (var k = 1; k <= n; k++) {
                $("#abacus" + i + "n" + k + "a").show();
                $("#abacus" + i + "n" + k + "n").hide();
            }
        }
        if (bigAbacusNumbers[i] >= 5) {
            bigAbacusNumbers[i] = 5 + num;
        } else {
            bigAbacusNumbers[i] = num;
        }
    }
    $("#bigAbacusNum" + i).html(bigAbacusNumbers[i]);
}

function checkResize() {
    // $(".game-answer-area").css("width", $(".game-answer").width() + 'px');

    // $(".game-answer-area-bg").css("margin-top", ($(document).height() / 2 - ($(".game-answer-area-bg").height() + 100) / 2) + 'px');

    // $(".game-settings").css("margin-top", ($(document).height() / 2 - ($(".game-settings").height() + 30) / 2) + 'px');
}

function changeGameLevel(i) {
    if (i != lvl) {
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
    lvl = i;
    gameStatus = SETTINGS;
}

function changeGameLevelWindow() {
    var i = prompt(dictionary.difficulty + ': ', lvl);
    i = parseInt(i);
    if (i < 1) {
        alert(dictionary.difficultyCannotBeLessThan + " 1 " + declOfNum(1, dictionary.digits.genitive));
    } else if (i > maxLvl) {
        alert(dictionary.difficultyCannotBeMoreThan + " " + maxLvl + " " + declOfNum(maxLvl, dictionary.digits.genitive));
    } else {
        lvl = i;
        $("#gameLevel").html(lvl + " " + declOfNum(lvl, dictionary.digits.nominative));
        $("#gameLevelInactive").html(lvl + " " + declOfNum(lvl, dictionary.digits.nominative));
    }
    gameStatus = SETTINGS;
}

function changeGameTerms(i) {
    if (terms + i < 1) {
        alert(dictionary.numberOfImpulsesCannotBeLessThan + " 1");
    } else if (terms + i > maxTerms) {
        alert(dictionary.numberOfImpulsesCannotBeMoreThan + " " + maxTerms);
    } else {
        terms += i;
        $("#gameTerms").html(terms);
        $("#gameTermsInactive").html(terms);
    }
    gameStatus = SETTINGS;
}

function changeGameTermsWindow() {
    var i = prompt(dictionary.numberOfImpulses + ': ', terms);
    i = parseInt(i);
    if (i < 1) {
        alert(dictionary.numberOfImpulsesCannotBeLessThan + " 1");
    } else if (i > maxTerms) {
        alert(dictionary.numberOfImpulsesCannotBeMoreThan + " " + maxTerms);
    } else {
        terms = i;
        $("#gameTerms").html(terms);
        $("#gameTermsInactive").html(terms);
    }
    gameStatus = SETTINGS;
}

function changeGameDelay(i) {
    if (delay + i < 100) {
        alert(dictionary.intervalCannotBeLessThan + " 0.1 " + dictionary.sec);
    } else if (delay + i > maxDelay) {
        alert(dictionary.intervalCannotBeMoreThan + " " + maxDelay / 1000 + " " + dictionary.sec);
    } else {
        delay += i;
        $("#gameDelay").html(delay / 1000 + " " + dictionary.sec);
        $("#gameDelayInactive").html(delay / 1000 + " " + dictionary.sec);
    }
    gameStatus = SETTINGS;
}

function changeGameDelayWindow() {
    var i = prompt(dictionary.interval + ': ', delay / 1000);
    i = parseFloat(i.replace(/,/g, '.')) * 1000;
    if (i < 100) {
        alert(dictionary.intervalCannotBeLessThan + " 0.1 " + dictionary.sec);
    } else if (i > maxDelay) {
        alert(dictionary.intervalCannotBeMoreThan + " " + maxDelay / 1000 + " " + dictionary.sec);
    } else {
        delay = i;
        $("#gameDelay").html(delay / 1000 + " " + dictionary.sec);
        $("#gameDelayInactive").html(delay / 1000 + " " + dictionary.sec);
    }
    gameStatus = SETTINGS;
}

function checkAllSettingsInFields() {
    $("#gameModule").val(gameModuleSelected);

    $("#gameLevel").html(lvl + " " + declOfNum(lvl, dictionary.digits.nominative));
    $("#gameLevelInactive").html(lvl + " " + declOfNum(lvl, dictionary.digits.nominative));

    $("#gameTerms").html(terms + " " + declOfNum(terms, dictionary.terms.nominative));
    $("#gameTermsInactive").html(terms + " " + declOfNum(terms, dictionary.terms.nominative));

}

function changeGameModule() {
    gameModuleSelected = $("#gameModule").val();
    gameStatus = SETTINGS;
}

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function setNewProgress(progress) {
    $("#gameProgress").attr("aria-valuenow", progress);
    $("#gameProgress").css("width", progress + "%");
    $("#gameProgress").html(progress + "%");
    $("#gameProgressFinal").attr("aria-valuenow", progress);
    $("#gameProgressFinal").css("width", progress + "%");
    $("#gameProgressFinal").html(progress + "%");
}

function showProgressBar() {
    $(".progress").show();
}

function hideProgressBar() {
    $(".progress").hide();
}

function setSettingsFieldToActive() {
    $("#gameModule").prop('disabled', false);
    $(".game-settings-field").css("display", "table");
    $(".game-settings-field-inactive").hide();
}

function setSettingsFieldToInactive() {
    $("#gameModule").prop('disabled', true);
    $(".game-settings-field").hide();
    $(".game-settings-field-inactive").css("display", "table");
}

function showAnswerField() {

    $(".game-answer").show();
    $(".btn-answer").show();
}

function hideAnswerField() {

    $(".game-answer").hide();
    $(".btn-answer").hide();
}

function showAbacusFields() {

    currentTerm++;
    $("#singleGame").hide();
    $("#multiGame").html("");
    $("#multiGame").show();
    $("#multiGamePause").show();
    // $(".game-pause-buttons-resume").hide();

    for (var screen = 0; screen < screenCount; screen++) {
        if (answers[screen] == undefined)
            answers[screen] = [];
        answers[screen][currentTerm] = gameNumber;
        var min = lvl < 2 ? 0 : Math.pow(10, lvl - 1);
        var max = lvl == 0 ? 4 : Math.pow(10, lvl) - 1;
        gameNumber = random(min, max);
        var nStr = gameNumber.toString();
        var abacusTmp = '<div class="ms-container abacus-col-container clearfix answer-area-multi" id="screen' + screen + '"><div class="abacus-fields-wrapper"><div class="abacus-fields"  id="abacus_' + screen + '">';
        var numbersTmp = '';
        console.log(screen + "; " + gameNumber);
        for (var i = 1; i <= (lvl == 0 ? 1 : lvl); i++) {
            abacusTmp += '                   <div class="abacus-col-wrapper"><div class="abacus-col">\n' +
                '                                <div class="abacus-row">\n' +
                '                                    <div class="abacus-vertical-line"></div>\n' +
                '                                    <img id="abacus' + i + 'n5ns' + screen + '" src="/images/games/notActiveFlash.svg">\n' +
                '                                </div>\n' +
                '                                <div class="abacus-row">\n' +
                '                                    <div class="abacus-vertical-line"></div>\n' +
                '                                    <img id="abacus' + i + 'n5as' + screen + '" src="/images/games/activeFlash.svg">\n' +
                '                                </div>\n' +
                '                                <div class="abacus-row abacus-white-row">\n' +
                '                                    <div class="abacus-white-row"></div>\n' +
                '                                </div>\n' +
                '                                <div class="abacus-row">\n' +
                '                                    <div class="abacus-vertical-line"></div>\n' +
                '                                    <img id="abacus' + i + 'n1as' + screen + '" src="/images/games/activeFlash.svg">\n' +
                '                                </div>\n' +
                '                                <div class="abacus-row">\n' +
                '                                    <div class="abacus-vertical-line"></div>\n' +
                '                                    <img id="abacus' + i + 'n2as' + screen + '" src="/images/games/activeFlash.svg">\n' +
                '                                    <img id="abacus' + i + 'n1ns' + screen + '" src="/images/games/notActiveFlash.svg">\n' +
                '                                </div>\n' +
                '                                <div class="abacus-row">\n' +
                '                                    <div class="abacus-vertical-line"></div>\n' +
                '                                    <img id="abacus' + i + 'n3as' + screen + '" src="/images/games/activeFlash.svg">\n' +
                '                                    <img id="abacus' + i + 'n2ns' + screen + '" src="/images/games/notActiveFlash.svg">\n' +
                '                                </div>\n' +
                '                                <div class="abacus-row">\n' +
                '                                    <div class="abacus-vertical-line"></div>\n' +
                '                                    <img id="abacus' + i + 'n4as' + screen + '" src="/images/games/activeFlash.svg">\n' +
                '                                    <img id="abacus' + i + 'n3ns' + screen + '" src="/images/games/notActiveFlash.svg">\n' +
                '                                </div>\n' +
                '                                <div class="abacus-row">\n' +
                '                                    <div class="abacus-vertical-line"></div>\n' +
                '                                    <img id="abacus' + i + 'n4ns' + screen + '" src="/images/games/notActiveFlash.svg">\n' +
                '                                </div>\n' +
                '                            </div></div>\n';
            // numbersTmp += '<div class="abacus-col no-border">' + nStr.charAt(0) + '</div>';
            nStr = nStr.substr(1);
        }
        $("#multiGame").append(abacusTmp + "</div>" +
            "<div class='game-answer-ms'><input type='text' id='game-answer-" + screen + "'/></div>" +
            "<div class='game-result-ms' id='game-result-" + screen + "'></div>" +
            "</div></div>");
        // $("#abacus-numbers").html(numbersTmp);
        $(".game-answer-field").hide();

        nStr = gameNumber.toString();
        for (var i = 1; i <= (lvl == 0 ? 1 : lvl); i++) {

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
        checkResize();

        // if (terms > 1) {
        //     setNewProgress(parseInt((currentTerm / terms) * 100));
        // }
    }
    setTimeout(function () {
        if (currentTerm < terms) {
            showAbacusFields();
        } else {
            gameStatus = ANSWERING;
            for (var screen = 0; screen < screenCount; screen++) {
                $("#abacus_" + screen).hide();
            }
            $(".game-answer-ms").show();
            // $(".question").hide();
            // $(".game-answer-field").show();
            checkResize();
        }
    }, delay);
}

function showAbacusField() {
    currentTerm++;
    $(".game-show-full-sequence").hide();
    $("#abacus-numbers").hide();

    var min = lvl < 2 ? 0 : Math.pow(10, lvl - 1);
    var max = lvl == 0 ? 4 : Math.pow(10, lvl) - 1;
    gameNumber = random(min, max);
    answers[currentTerm] = gameNumber;
    var nStr = gameNumber.toString();
    var abacusTmp = '';
    var numbersTmp = '';
    for (var i = 1; i <= (lvl == 0 ? 1 : lvl); i++) {
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
    }
    $("#abacus-fields").html(abacusTmp);
    $("#abacus-numbers").html(numbersTmp);
    $(".game-answer-field").hide();

    nStr = gameNumber.toString();
    for (var i = 1; i <= (lvl == 0 ? 1 : lvl); i++) {

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

    if (terms > 1) {
        setNewProgress(parseInt((currentTerm / terms) * 100));
    }
    if (gameStatus == STARTED) {
        setTimeout(function () {
            if (currentTerm < terms) {
                $("#abacus-fields").hide();
                setTimeout(function () {
                    showAbacusField();
                }, 175);
            } else {
                // $("#abacus-fields").hide();
                $(".question").hide();
                $(".game-answer-field").show();
                checkResize();
                $("#game-answer").focus();
                gameStatus = ANSWERING;
            }
        }, delay);
    }
}

function startGame() {
    currentTerm = 0;
    if (gameStatus == PAUSED) {
        resumeGame();
        return;
    }

    $(".game-answer").val("");


    $(".game-final-window").hide();
    $(".game-gray-bg").hide();
    $(".game-pause-buttons").hide();
    $(".game-settings").hide();
    $(".btn-answer").show();
    $(".game-show-full-sequence").hide();
    $(".game-hide-full-sequence").hide();
    showAnswerField();

    $(".game-answer-area-bg").css("display", "table");
    // $(".game-pause-buttons").show();

    checkAllSettingsInFields();
    gameStatus = STARTED;

    if (terms > 1) {
        showProgressBar();
    }
    if (screenCount == 1)
        showAbacusField();
    else
        showAbacusFields();
}

function checkAnswerFromEnter(e) {
    if (e.keyCode === 13 && gameStatus == ANSWERING) {
        if (screenCount == 1) {
            checkAnswer();
        } else {
            checkAllAnswers();
        }
    } else if (e.keyCode === 13 && gameStatus == LOOKING) {
        startGame();
    }
}

function saveAnswer() {
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

function checkAllAnswers() {
    gameStatus = LOOKING;
    $(".game-answer-ms").hide();
    for (var screen = 0; screen < screenCount; screen++) {
        var userAns = $("#game-answer-" + screen).val();
        userAns = userAns.split(/(?:,| |, )/i).filter(function (n) {
            return n != "";
        });

        var right = 0;

        for (var i = 0; i < answers.length; i++) {
            if (answers[screen][i + 1] == parseInt(userAns[i])) {
                right++;
            }
        }
        // $("#game-result-" + screen).html("Правильно " + right + " из " + terms);
        $("#game-result-" + screen).html(dictionary.rightAnswersInProcess
            .replace("{right}", right)
            .replace("{totalAmount}", terms)
        );
    }

    gameStatus = FINISHED;
}

function checkAnswer() {
    gameStatus = LOOKING;

    // if (gameExamplesCount > gameExampleNumber) {
    //     $(".game-goto-next-example").css("display", "inline-block");
    // } else {
    //     $(".game-goto-next-example").hide();
    // }
    // gameCurrentResult = $(".game-answer").val() + " " + (parseInt($(".game-answer").val()) === generator.result ? "=" : "≠") + " " + generator.result + "<br>" + (parseInt($(".game-answer").val()) === generator.result ? "Правильно!" : "");
    // gameCurrentResultNumber = parseInt($(".game-answer").val());
    //
    // if (gameExamplesCount > 1) {
    //     setNewProgress(parseInt((gameExampleNumber / gameExamplesCount) * 100));
    //     gameAnswersStory[gameExampleNumber] = $(".game-answer").val();
    //     gameSequensesStory[gameExampleNumber] = generator.sequence;
    //     gameSequensesReultStory[gameExampleNumber] = generator.result;
    //
    //     if (gameExampleNumber == gameExamplesCount && gameSaving) {
    //         saveAnswer();
    //         gameSaving = false;
    //     }
    //     if (gameExampleNumber == gameExamplesCount) {
    //         var right = 0;
    //         for (var i = 1; i <= gameExamplesCount; i++) {
    //             if (gameAnswersStory[i] == gameSequensesReultStory[i]) {
    //                 right++;
    //             }
    //         }
    //         $(".game-final-string").html("Правильно " + right + " из " + gameExamplesCount);
    //         $(".game-final-string").show();
    //         gameStatus = FINISHED;
    //     } else {
    //         gameExampleNumber++;
    //     }
    // }
    //
    // hideAnswerField();
    // $(".question").html(gameCurrentResult);
    // if (generator.sequence.length < 10) {
    //     $(".game-show-full-sequence").show();
    //     $(".game-hide-full-sequence").hide();
    // }

    if (!gameSaving) {
        $(".game-goto-next-example").css("display", "inline-block");
    } else {
        $(".game-goto-next-example").hide();
    }

    var userAns = $("#game-answer").val();
    userAns = userAns.split(/(?:,| |, )/i).filter(function (n) {
        return n != "";
    });

    var right = 0;

    for (var i = 0; i < answers.length; i++) {
        if (answers[i + 1] == parseInt(userAns[i])) {
            right++;
        }
    }
    // $(".game-final-string").html("Правильно " + right + " из " + terms);
    $(".game-final-string").html(dictionary.rightAnswersInProcess
        .replace("{right}", right)
        .replace("{totalAmount}", terms)
    );

    if (right == terms) {
        sounds.correctAnswer.play();
    } else {
        sounds.incorrectAnswer.play();
    }
    $(".game-final-string").show();
    gameStatus = FINISHED;
    showFinalWindow();


    // gameAnswersStory[gameExampleNumber] = $("#game-answer").val();
    // gameSequensesReultStory[gameExampleNumber] = gameNumber;
    //
    // if (gameExampleNumber == terms) {
    //     var right = 0;
    //     for (var i = 1; i <= terms; i++) {
    //         if (gameAnswersStory[i] == gameSequensesReultStory[i]) {
    //             right++;
    //         }
    //     }
    // }
    $(".question").show();
    $("#abacus-numbers").show();
    $(".game-show-full-sequence").show();
    $(".game-answer-field").hide();

    // gameExampleNumber++;

    checkResize();

}


function settingsGame() {
    if (gameStatus != PAUSED) {
        gameStatus = PAUSED;
        if (screenCount == 1) {
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
}

function pauseGame() {
    if (gameStatus != PAUSED) {
        gameStatus = PAUSED;
        $(".game-pause-buttons").show();
    }
}

function restartGame() {
    gameStatus = STARTED;
    gameExampleNumber = 1;
    $(".game-final-string").hide();
    startGame();
}

function goToSettings() {
    // TODO: FIX THIS SHIT!

    location.reload();

    // gameStatus = SETTINGS;
    // setSettingsFieldToActive();
    // $(".game-gray-bg").show();
    // $(".game-pause-buttons").hide();
    //
    // $(".game-settings").css("display", "table");
    // $(".game-answer-area-bg").css("display", "none");
}

function resumeGame() {
    console.log(gameStatus + " is " + PAUSED);
    if (gameStatus == PAUSED) {
        gameStatus = STARTED;
        if (screenCount == 1) {
            $(".game-gray-bg").hide();
            $(".game-pause-buttons").hide();
            $(".game-settings").hide();
            $(".game-answer-area-bg").css("display", "table");
            showAbacusField();
            // showPreGame();
        } else {
            $("#multiGame").show();
            $("#multiGamePause").show();
            if (currentTerm < terms) {
                showAbacusField();
            } else {
                gameStatus = ANSWERING;
                for (var screen = 0; screen < screenCount; screen++) {
                    $("#abacus_" + screen).hide();
                }
                $(".game-answer-ms").show();
            }
        }

        $(".game-gray-bg").hide();
        $(".game-pause-buttons").hide();
        $(".game-settings").hide();
    } else {
        startGame();
    }
}

function showFullSequence() {
    $(".game-show-full-sequence").hide();
    $(".game-hide-full-sequence").show();
    var seq = generator.sequence[0];
    for (var i = 1; i < generator.sequence.length; i++) {
        seq += "" + (generator.sequence[i] > 0) ? ("+" + generator.sequence[i]) : generator.sequence[i];
    }
    $(".question").html(seq);
}

function hideFullSequence() {

    $(".question").html(gameCurrentResult);
    if (generator.sequence.length < 11) {
        $(".game-show-full-sequence").show();
        $(".game-hide-full-sequence").hide();
    }
    checkResize();
}

var limits = [];

function setProgress() {
    gameProgress = !gameProgress;
    if (gameProgress) {
        $("#game-settings-progress").css("background", "#29A4DD");
        $("#game-settings-progress").css("color", "#ffffff");
        $("#game-settings-progress-inactive").css("background", "#29A4DD");
        $("#game-settings-progress-inactive").css("color", "#ffffff");
    } else {
        $("#game-settings-progress").css("background", "#ffffff");
        $("#game-settings-progress").css("color", "#000000");
        $("#game-settings-progress-inactive").css("background", "#ffffff");
        $("#game-settings-progress-inactive").css("color", "#000000");
    }
}

function showFinalWindow() {
    var tmp = "";
    var right = 0;

    var userAns = $("#game-answer").val();
    userAns = userAns.split(/(?:,| |, )/i).filter(function (n) {
        return n != "";
    });

    for (var i = 0; i < answers.length; i++) {
        if (answers[i + 1] == parseInt(userAns[i])) {
            right++;
        }
    }
    var persents = parseInt((right / terms) * 100);
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

    // $(".game-final-block-blue").html(right + " из " + terms + " " + declOfNum(right, ["правильный ответ", "правильных ответов", "правильных ответов"]) + ",<br>" + tmp);
    $(".game-final-block-blue").html(
        dictionary.resultingRightAnswers
            .replace("{right}", right)
            .replace("{totalAmount}", terms)
            .replace("{rightAnswers}", declOfNum(right, dictionary.rightAnswers.nominative))
        + ",<br>" + tmp
    );
    $(".game-answer-area-bg").hide();
    $(".game-final-window").show();
    if (!gameSaving) {
        $("#game-save").hide();
    }
    // $(".game-final-blocks").css("margin-top", ($(".game-final-window").height() / 2 - ($(".game-final-blocks").height() + 30) / 2) + 'px');
}

function setColumnsCount(count) {
    if (screenCount != count) {

        $("#gameColumns" + screenCount).css("background", "#ffffff");
        $("#gameColumns" + screenCount).css("color", "#000000");
        $("#gameColumnsInactive" + screenCount).css("background", "#ffffff");
        $("#gameColumnsInactive" + screenCount).css("color", "#000000");


        $("#gameColumns" + count).css("background", "#29A4DD");
        $("#gameColumns" + count).css("color", "#ffffff");
        $("#gameColumnsInactive" + count).css("background", "#D3D3D3");
        $("#gameColumnsInactive" + count).css("color", "#000000");

        screenCount = count;
    }
}
