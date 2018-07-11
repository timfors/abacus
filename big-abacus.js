export default function () {
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
function showAnswerField() {

    $(".game-answer").show();
    $(".btn-answer").show();
}