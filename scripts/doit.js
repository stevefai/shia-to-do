
(function() {

if (localStorage.getItem('active')) {
	$('ul.active').html(localStorage.getItem('active'));
}

if (localStorage.getItem('completed')) {
	$('ul.completed').html(localStorage.getItem('completed'));
}

if (localStorage.getItem('failed')) {
	$('ul.failed').html(localStorage.getItem('failed'));
}




var validInput = function(inp) {
	if (inp == "") {
		return false;
	}
	for (var i = 0; i < inp.length; i++) {
		if (inp[i] != " ") {
			return true;
		}
	}
	return false;
};

var inputField = $('#todo-input');

inputField.on('keypress', function(e) {
	if (e.which === 13 && validInput(inputField.val()) ) {

		var content = inputField.val();
		
		inputField.val('');

		$('ul.active').append('<li><p class="item-content">' + content + '</p><img src="resources/close.png" alt="x"><div class="options"><a href="#" class="complete">Complete</a><a href="#" class="giveup">Give up</a></div></li>');
		localStorage.setItem('active', $('ul.active').html());
	}
});

/* SORTING */

$('#sort-by').on('click', function() {
	var l = $('#sort-by-options');
	if (l.css("display") === "block") {
		l.css("display", "none");
	}
	else {
		l.css("display", "block");
	}
});

$('#sort-by-options').on('click', 'a', function() {
	var option = $(this).text();
	var type = $(this).parent().attr("class");
	$('#sort-by').text(option);
	var allLists = $('ul.items-list');
	for (var i = 0; i < allLists.length; i++) {
		var theList = $(allLists[i]);
		if (theList.hasClass(type)) {
			theList.css('display', 'block');
		}
		else {
			theList.css('display', 'none');
		}
	}
	$('#sort-by-options').css('display', 'none');

});

/* DELETE */

var items = $('#todo-list');

$('body').on('mouseover', 'ul.items-list li', function() {
	$(this).find('img').css('display', 'inline-block');
});

$('body').on('mouseleave', 'ul.items-list li', function() {
	$(this).find('img').css('display', 'none');
});

$('body').on('click', 'ul.items-list li', function() {
	var img = $(this).find('img');
	img.css('display', 'inline-block');
	$(this).siblings().find('img').css('display', 'none');
});


$('body').on('click', 'img', function() {
	var items = $(this).parent().parent();
	$(this).closest('li').remove();

	var listClass = items.attr("class").split(" ")[0];
	localStorage.setItem(listClass, items.html());

});



var audioList = [];
audioList.push(new Audio('resources/doit.mp3'));
audioList.push(new Audio('resources/justdoit.mp3'));
audioList.push(new Audio('resources/justdoit2.mp3'));
audioList.push(new Audio('resources/nothingimpossible.mp3'));
audioList.push(new Audio('resources/stop.mp3'));
audioList.push(new Audio('resources/stopgivingup.mp3'));
audioList.push(new Audio('resources/truedreams.mp3'));
audioList.push(new Audio('resources/waiting.mp3'));
audioList.push(new Audio('resources/yesyoucan.mp3'));

var giveupAudioList = [];
giveupAudioList.push(new Audio('resources/stopgivingup.mp3'));
giveupAudioList.push(new Audio('resources/stop.mp3'));


/* COMPLETE / FAIL */

$("ul.active").on('click', '.options a', function() {
	var item = $(this).parent().parent();
	var l = item.parent();
	var localName;

	var addedTo, msg;

	if ($(this).hasClass('complete')) {
		addedTo = $('ul.completed');
		msg = 'Completed on';
		localName = 'completed';
	}
	else {
		addedTo = $('ul.failed');
		msg = 'Failed on';
		var audioIndex = Math.floor(Math.random() * giveupAudioList.length);
		giveupAudioList[audioIndex].play();
		localName = 'failed';
	}

	var content = item.find('p.item-content').text();

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var date = new Date();
	var currentDate = months[date.getMonth()] + ' ' + date.getDate().toString() + ' ' + date.getFullYear().toString();
	item.remove();
	item = '<li><p class="item-content">' + content + '</p><img src="resources/close.png" alt="x"><p class="item-info">' + msg + ' ' + currentDate + '</p></li>';
	addedTo.append(item);
	console.log($('ul.active').html());
	localStorage.setItem(localName, addedTo.html());
	localStorage.setItem('active', l.html());
});


$('button#get-motivated').click(function () {
	//var audio = document.getElementsByTagName("audio")[1];
	var audioIndex = Math.floor(Math.random() * audioList.length);
	audioList[audioIndex].play();
});

})();