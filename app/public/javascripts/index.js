var App = function (options) {

	var questionIndex = -1;
	var questions = [];
	var answers = [];

	var init = function (){
		console.log("init");

		// vraag 1:
	    questions.push([
            {title: "Ik ben..."},
			{
				img: "female.png",
				keyword: "me:female"
			},
			{
				img: "male.png",
				keyword: "me:male"
			}
		]);
            questions.push([
            {title: "Ik ben voor de..."},
			{
				img: "female.png",
				keyword: "interest:female"
			},
			{
				img: "male.png",
				keyword: "interest:male"
			}
		]);

		// vraag 2:
	    questions.push([
            {title: "Open minded of ..."},
			{
				img: "openmind.png", //open.png voor sharon stone
				keyword: "openminded:true"
			},
			{
				img: "closedmind.png", //closed.png voor sharon stone
				keyword: "openminded:false"
			}
		]);

		// vraag 3:
	    questions.push([
            {title: "Ik leg mijn fond met ..."},
			{
				img: "Food-Vegan.png",
				keyword: "food:vegan"
			},
			{
				img: "Food-Hamburger.png",
				keyword: "food:hamburger"
			}
		]);

	    questions.push([
             {title: "Onze portefeuille is ..."},
			{
				img: "duurbier.png",
				keyword: "budget:big"
			},
			{
				img: "goedkoopbier.png",
				keyword: "budget:small"
			}
		]);

	    questions.push([
            {title: "We rijden met ..."},
			{
				img: "transport_bus.png",
				keyword: "transportation:bus"
			},
			{
				img: "transport_taxi.png",
				keyword: "transportation:taxi"
			}
		]);

	    questions.push([
            {title: "Als activiteit kiezen we ..."},
			{
				img: "DJing.png",
				keyword: "music:clubbing"
			},
			{
				img: "bowling.png",
				keyword: "music:bowling"
			}
		]);

	    questions.push([
            {title: "We vertrekken in de ..."},
			{
				img: "sun.png",
				keyword: "start:morning"
			},
			{
				img: "moon.png",
				keyword: "start:evening"
			}
		]);
	    questions.push([
            {title: "We gaan slapen in de ..."},
			{
				img: "moon.png",
				keyword: "end:evening"
			},
			{
				img: "sun.png",
				keyword: "end:morning"
			}
		]);


		// start vragenreeks:
		showNextQuestion();
	};

	var showNextQuestion = function () {
		questionIndex++;
		$('.questioncontainer').empty();
		$('.question-title').text("");


		if(questionIndex >= questions.length) {
			// was laatste vraag, overgaan tot POSTen van data:

			console.log('last question, POSTing');
			$('.questioncontainer').hide();
			$('.thx').show();

			// sendJSON('/rest/answers', answers, function (res) {
			// 	if(res.err) alert(res.err);
			// 	console.log(res);
			// });

			sendRealPost('/', {answersAsJSON: JSON.stringify(answers)});

			return;
		}

		// gewoon volgnede vraag tonen:
		var currentQuestion = questions[questionIndex];
		showQuestion(currentQuestion);
	};


	var showQuestion = function (question) {
		// in de question zitten 2 of meerdere anwers:
		// maar er kan ook een title inzitten tegenwoordig :-)

		for (var i = 0; i < question.length; i++) {

			var questionpart = question[i];

			// checken of questionpart een antwoord is of een obectje is met de titel
			if(questionpart.title) {
				$('.question-title').text(questionpart.title);
			}

			if(questionpart.img) {
				var answer = question[i];

				// bouw image DOM element from code:
				var $img = $(document.createElement('img'));
				$img.attr('src', '/img/' + answer.img);
				$img.attr('title', answer.keyword);
				$img.attr('data-keyword', answer.keyword); // keyword koppelen aan DOM-element om straks terug te kunnen opvragen.
				$img.addClass('answer-image');

				$img.on('click', handleImageClick);

				$('.questioncontainer').append($img);
			}

		};
	};


	var handleImageClick = function (event) {
		var $img = $(event.target);
		if ($img.attr('data-keyword') != null) {
			var keyword = $img.attr('data-keyword'); // keyword zit in de attrbutes

			answers.push(keyword); // gewoon keywords toevoegen als answers:

			showNextQuestion();
		}
	};

	var sendJSON = function (url, data, callback) {
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			async: false,
			success: callback
		});
	};

	var sendRealPost = function (path, params, method) {
	    method = method || "post"; // Set method to post by default if not specified.

	    // The rest of this code assumes you are not using a library.
	    // It can be made less wordy if you use one.
	    var form = document.createElement("form");
	    form.setAttribute("method", method);
	    form.setAttribute("action", path);

	    for(var key in params) {
	        if(params.hasOwnProperty(key)) {
	            var hiddenField = document.createElement("input");
	            hiddenField.setAttribute("type", "hidden");
	            hiddenField.setAttribute("name", key);
	            hiddenField.setAttribute("value", params[key]);

	            form.appendChild(hiddenField);
	         }
	    }

	    document.body.appendChild(form);
	    form.submit();

	}


	return {
		init: init
	};
};



$(function(){
	var app = new App();
	app.init();
});
