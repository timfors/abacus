var sounds = {
	_syn: window.speechSynthesis,
	_audios: {
		correctAnswer: [],
		incorrectAnswer: [],
		present: [],
		numbers: {},
		beeps: {}
	},
	_urls: {
		correctAnswer: "/audios/new_correct-{id}.mp3",
		incorrectAnswer: "/audios/new_incorrect-{id}.mp3",
		present: "/audios/new_present-{id}.mp3",
		numbers: "/audios/" + lang + "/numbers/{filename}",
		beeps: "/audios/new_sound_{id}.mp3"
	},
	_ranges: {
		correctAnswer: {
			first: 1,
			last: 18
		},
		incorrectAnswer: {
			first: 1,
			last: 47
		},
		present: {
			first: 1,
			last: 57
		}
	},
	_caches: {
		correctAnswer: {
			length: 0
		},
		incorrectAnswer: {
			length: 0
		},
		present: {
			length: 0
		}
	},
	_currentSound: null,
	_controlElements: {},
	config: {
		enabled: true,
		volume: 0.7,
		_lang: "ru",
		set lang(langStr) { // "ru" / "en"
			switch (langStr) {
				case "en":
					this._lang = langStr;
					break;
				case "ru":
					this._lang = langStr;
					break;
				default:
					console.error("Lang \"" + langStr + "\" doesn't exist. You can use \"ru\" of \"en\".");
					break;
			}
			sounds._reset();
		},
		get lang() {
			return this._lang;
		}
	},
	_initMuteToggler: function (e) {
		var _cachedVolume = sounds.config.volume;

		var elem;
		if (!e) {
			elem = $("[data-sounds-mute-toggler]");
		} else {
			elem = $(e);
		}

		sounds._controlElements.muteToggler = elem;
		sounds._controlElements.muteToggler._disable = function () {
			elem.addClass("off");
			elem.removeClass("on");
			elem[0].dataset.state = "off";
		};
		sounds._controlElements.muteToggler._enable = function () {
			elem.removeClass("off");
			elem.addClass("on");
			elem[0].dataset.state = "on";
		};

		if (elem.data("state") === "off") {
			elem.addClass("off");
			elem.removeClass("on");
			sounds.config.volume = 0;
		} else {
			elem.removeClass("off");
			elem.addClass("on");
		}

		elem.on("click", function () {
			if (elem[0].dataset.state === "off") {
				elem.removeClass("off");
				elem.addClass("on");
				sounds.config.volume = elem[0].dataset.volume * 1;
				elem[0].dataset.state = "on";
				sounds._controlElements.volumeController._enable();
			} else {
				elem.addClass("off");
				elem.removeClass("on");
				elem[0].dataset.volume = sounds.config.volume;
				sounds.config.volume = 0;
				elem[0].dataset.state = "off";
				sounds._controlElements.volumeController._disable();
			}
		});
	},
	_initVolumeController: function(inputElem) {
		var input;
		if (!inputElem) {
			input = $("[data-sounds-volume-controller]");
		} else {
			input = $(inputElem);
		}
		input.attr("type", "range");
		input.attr("min", 0);
		input.attr("max", 1);
		input.attr("step", 0.01);
		input.val(sounds.config.volume);

		sounds._controlElements.volumeController = input;
		sounds._controlElements.volumeController._disable = function () {
			input.addClass("disabled");
		};
		sounds._controlElements.volumeController._enable = function () {
			input.removeClass("disabled");
		};
		input.removeClass("disabled");

		var addition;
		if (input[0].value > 0.5) {
			addition = -2;
		} else {
			addition = 2;
		}

		input[0].style.boxShadow = "inset " +
				Math.round(input[0].clientWidth * input[0].value + addition) +
				"px 0 " + (input[0].dataset.fillColor || "#27A3DD");

		input.on("input", function () {
			sounds.config.volume = this.value * 1;
			sounds._controlElements.muteToggler._enable();

			var addition;
			if (this.value > 0.5) {
				addition = -2;
			} else {
				addition = 2;
			}

			this.style.boxShadow = "inset " +
					Math.round(this.clientWidth * this.value + addition) +
					"px 0 " + (this.dataset.fillColor || "#27A3DD");
		});
	},
	_preloadAmount: 3,
	_loadNewAudio: function (type) {
		var newAudio;
		var newAudioData = sounds._newRandomSoundData(type);
		if (newAudioData) {
			newAudio = new Audio();
			newAudio.src = newAudioData.src;
			newAudio.addEventListener("canplaythrough", func);
		}

		function func() {
			sounds._audios[type].push(newAudio);
			newAudio.removeEventListener("canplaythrough", func);
		}
	},
	_newRandomSoundData: (function () {

		function func(soundType) {
			var id;
			if (sounds._caches[soundType].length === sounds._ranges[soundType].last - sounds._ranges[soundType].first + 1) {
				return null;
			}
			id = utils.random(sounds._ranges[soundType].first, sounds._ranges[soundType].last);
			while (sounds._caches[soundType][id]) {
				id = utils.random(sounds._ranges[soundType].first, sounds._ranges[soundType].last);
			}
			sounds._caches[soundType][id] = true;
			sounds._caches[soundType].length++;
			return {
				id: id,
				src: sounds._urls[soundType].replace("{id}", id)
			}
		}

		return func;
	})(),
	_clean: function () {
		if (sounds._currentSound) {
			sounds._currentSound.pause();
			sounds._currentSound.currentTime = 0;
			sounds._currentSound = null;
		}
	},
	_reset: function () {
		sounds._clean();
		var langPrefix = sounds.config.lang === "en" ? "en/" : "ru/";
		sounds._urls.numbers = "/audios/" + langPrefix + "{filename}.mp3";
		for (var key in sounds._audios) {
			if (sounds._audios.hasOwnProperty(key))
				sounds._audios[key] = [];
		}
		for (key in sounds._caches) {
			if (sounds._caches.hasOwnProperty(key))
				sounds._caches[key] = {
					length: 0
				};
		}
		preloadAudio(true);
	},
	correctAnswer: {
		play: function () {
			if (!sounds.config.enabled) return;

			if (sounds._currentSound) {
				sounds._currentSound.pause();
				sounds._currentSound.currentTime = 0;
			}
			sounds._currentSound = sounds._audios.correctAnswer[utils.random(0, sounds._audios.correctAnswer.length - 1)];
			sounds._currentSound.volume = sounds.config.volume;
			sounds._currentSound.play();

			$(sounds._currentSound).on("ended", function () {
				sounds._currentSound = null;
			});

			sounds._loadNewAudio("correctAnswer");
		}
	},
	incorrectAnswer: {
		play: function () {
			if (!sounds.config.enabled) return;

			if (sounds._currentSound) {
				sounds._currentSound.pause();
				sounds._currentSound.currentTime = 0;
			}
			sounds._currentSound = sounds._audios.incorrectAnswer[utils.random(0, sounds._audios.incorrectAnswer.length - 1)];
			sounds._currentSound.volume = sounds.config.volume;
			sounds._currentSound.play();

			$(sounds._currentSound).on("ended", function () {
				sounds._currentSound = null;
			});

			sounds._loadNewAudio("incorrectAnswer");
		}
	},
	present: {
		play: function () {
			if (!sounds.config.enabled) return;

			if (sounds._currentSound) {
				sounds._currentSound.pause();
				sounds._currentSound.currentTime = 0;
			}
			sounds._currentSound = sounds._audios.present[utils.random(0, sounds._audios.present.length - 1)];
			sounds._currentSound.volume = sounds.config.volume;
			sounds._currentSound.play();

			$(sounds._currentSound).on("ended", function () {
				sounds._currentSound = null;
			});

			sounds._loadNewAudio("present");
		}
	},
	beeps: {
		load: function (obj) {
            var callback = obj.callback;
            var success = obj.success;
            var error = obj.error;
			var timeout = obj.timeout || 1000;
            var audio, timer;

			audio = new Audio();
			audio.src = sounds._urls.beeps.replace("{id}", "2");

			audio.addEventListener("canplaythrough", func);

			timer = setTimeout(function () {
				error();
			}, timeout);

            function func() {
                sounds._audios.beeps["number"] = this;
                this.removeEventListener("canplaythrough", func);
                clearTimeout(timer);
                (success || callback)();
            }
		},
		play: function (obj) {
			var type = obj.type;
            if (!sounds.config.enabled) return;
            if (sounds._currentSound) {
                sounds._currentSound.pause();
                sounds._currentSound.currentTime = 0;
            }
			if (sounds._audios.beeps[type]) {
				sounds._currentSound = sounds._audios.beeps[type];
				sounds._currentSound.volume = sounds.config.volume;
				sounds._currentSound.play();
			}
        }
	},
	numbers: {
		load: function (obj) {
			// syntax

			// obj = {
			// 	number: [Number]
			// 	or
			// 	numbers: [Number][],
			// 	callback: function(),
			// 	success: function(),
			// 	error: function(),
			// 	timeout: [Number] - milliseconds
			// }

			var number = obj.number;
			var numbers = obj.numbers.slice();
			var callback = obj.callback;
			var success = obj.success;
			var error = obj.error;
			var timeout = obj.timeout || 1000;
			var audio, numberStr, filename, timer;

			if (numbers) {
				for (var i = 0, l = numbers.length; i < l; i++) {
					if (numbers[i] >= -99 && numbers[i] <= 99) {
						audio = new Audio();
						numberStr = (numbers[i] + "").replace(/^([0-9])/, "+$1");
						filename = numberStr.replace("+", "plus_").replace("-", "minus_") + ".mp3";
						audio.src = sounds._urls.numbers.replace("{filename}", filename);
						// audio.customId = i;
						audio.customNumberStr = numberStr;

						audio.addEventListener("canplaythrough", func);
					} else {
						console.warn("there's no sound for " + numbers[i]);
						numbers.splice(i, 1);
						i--;
						l--;
					}
				}
				if (numbers.length === 0) {
					(success || callback)();
				} else {
					timer = setTimeout(function () {
						if (numbers.length > 0) error();
						else (success || callback)();
					}, timeout);
				}
			} else if (number) {
				if (number >= -99 && number <= 99) {
					audio = new Audio();
					numberStr = (number + "").replace(/^([0-9])/, "+$1");
					filename = numberStr.replace("+", "plus_").replace("-", "minus_") + ".mp3";
					audio.src = sounds._urls.numbers.replace("{filename}", filename);
					// audio.customId = i;

					audio.addEventListener("canplaythrough", func2);

					timer = setTimeout(function () {
						error();
					}, timeout);
				} else {
					console.warn("there's no sound for " + number);
					(success || callback)();
				}
			}

			function func() {
				sounds._audios.numbers[this.customNumberStr] = this;
				numbers.splice(0, 1);
				this.removeEventListener("canplaythrough", func);
				if (numbers.length <= 0) {
					clearTimeout(timer);
					(success || callback)();
				}
			}

			function func2() {
				sounds._audios.numbers[numberStr] = this;
				this.removeEventListener("canplaythrough", func2);
				clearTimeout(timer);
				(success || callback)();
			}
		},
		play: function (obj) {
			// syntax:

			// obj = [Number]
			// obj = {
			// 	number: [Number],
			// 	numbers: [Number][]
			// }

			var numberStr, callback, timeout;
			if (!sounds.config.enabled) return;
			if (obj.number) {
				numberStr = (obj.number + "").replace(/^([0-9])/, "+$1");
				callback = obj.callback;
				timeout = obj.timeout;
			} else {
				numberStr = (obj + "").replace(/^([0-9])/, "+$1");
			}

			if (sounds._currentSound) {
				sounds._currentSound.pause();
				sounds._currentSound.currentTime = 0;
			}
			var sound = new Audio();
			var filename = numberStr.replace("+", "plus_").replace("-", "minus_") + ".mp3";
			if (sounds._audios.numbers[numberStr]) {
				sounds._currentSound = sounds._audios.numbers[numberStr];
				sounds._currentSound.volume = sounds.config.volume;
				sounds._currentSound.play();
			} else {
				console.warn("sound for " + numberStr + " wasn't loaded");
				sounds._currentSound = sound;
				// sounds._currentSound.volume = sounds.config.volume;
				sounds._currentSound.src = sounds._urls.numbers.replace("{filename}", filename);

				sound.addEventListener("canplaythrough", func);
			}

			function func() {
				sounds._audios.numbers[numberStr] = sound;
				// sound.play();
				sound.removeEventListener("canplaythrough", func);
			}
		}
	}
};

$(preloadAudio);

function preloadAudio(force) {

	$("[data-preloaded-audio]").remove();

	for (var i = 0; i < sounds._preloadAmount; i++) {
		var randoms = [
			sounds._newRandomSoundData("correctAnswer"),
			sounds._newRandomSoundData("incorrectAnswer"),
			sounds._newRandomSoundData("present")
		];

		$(document.body)
				.append("<audio data-preloaded-audio data-correct-answer-sound data-id='" + randoms[0].id + "' src='" + randoms[0].src + "'></audio>")
				.append("<audio data-preloaded-audio data-incorrect-answer-sound data-id='" + randoms[1].id + "' src='" + randoms[1].src + "'></audio>")
				.append("<audio data-preloaded-audio data-present-sound data-id='" + randoms[2].id + "' src='" + randoms[2].src + "'></audio>");
	}

    $(document.body)
        .append("<audio data-preloaded-audio data-beep-number-sound data-type='" + "number" + "' src='" + sounds._urls.beeps.replace("{id}", 2) + "'></audio>");

	if (force) putAudios();
	else $(window).on("load", putAudios);

	function putAudios() {
		var audio = new Audio();
		var elems = $("[data-correct-answer-sound]");

		for (var i = 0, l = elems.length; i < l; i++) {
			audio = new Audio();
			audio.src = $(elems[i]).attr("src");
			sounds._audios.correctAnswer.push(audio);
		}

		elems = $("[data-incorrect-answer-sound]");
		for (i = 0, l = elems.length; i < l; i++) {
			audio = new Audio();
			audio.src = $(elems[i]).attr("src");
			sounds._audios.incorrectAnswer.push(audio);
		}

		elems = $("[data-present-sound]");
		for (i = 0, l = elems.length; i < l; i++) {
			audio = new Audio();
			audio.src = $(elems[i]).attr("src");
			sounds._audios.present.push(audio);
		}

		elems = $("[data-beep-number-sound]");
		for (i = 0, l = elems.length; i < l; i++) {
            audio = new Audio();
            audio.src = $(elems[i]).attr("src");
            sounds._audios.beeps[$(elems[i]).data("type")] = audio;
        }
	}

}