var currentMode = "draw"

var createCanvas = function(size) {
	var pixelSize = 800 / size;
	pixelSize = Math.trunc(pixelSize * 100)/100;

	if(pixelSize * size > 799.5 && pixelSize * size < 800) {
		$(container).css({"height": "801px",
						  "width": "801px"});
	}
	else {
		$(container).css({"height": "800px",
						  "width": "800px"});
	}


	for(var i = 0; i < size; i++) {
		for(var j = 0; j < size; j++) {
			$("#container").append("<div class='pixel'></div>");
		}
	}

	$(".pixel").css({"height": pixelSize,
					 "width": pixelSize});

	$(".pixel").on("mouseenter", function() {
		if(currentMode === "draw" || currentMode === "trail") {
			$(this).removeClass("opacity0")
			$(this).addClass("colored", "opacity5");
		}
		else if(currentMode === "random") {
			var randomColor = "#" + Math.floor(Math.random() * 16777216 >> 0).toString(16);
			$(this).removeClass("opacity0");
			$(this).addClass("randomcolor", "opacity5");
			$(this).css({"background-color": randomColor});
		}
		else if(currentMode === "airbrush") {
			$(this).addClass("colored");

			if($(this).hasClass("opacity0")) {
				$(this).removeClass("opacity0");
				$(this).addClass("opacity1");
			}
			else if($(this).hasClass("opacity1")) {
				$(this).removeClass("opacity1");
				$(this).addClass("opacity2");
			}
			else if($(this).hasClass("opacity2")) {
				$(this).removeClass("opacity2");
				$(this).addClass("opacity3");
			}
			else if($(this).hasClass("opacity3")) {
				$(this).removeClass("opacity3");
				$(this).addClass("opacity4");
			}
			else if($(this).hasClass("opacity4")) {
				$(this).removeClass("opacity4");
				$(this).addClass("opacity5");
			}

		}
	});

	$(".pixel").on("mouseleave", function() {
		if(currentMode === "trail") {
			$(this).animate({opacity: 0}, 600, function() {
				$(this).removeClass("colored", "opacity5");
				$(this).css({"opacity": ""});
				$(this).addClass("opacity0");
			});
		}
	});
};

var clearCanvas = function() {
	$(".colored").removeClass("colored");
	$(".randomcolor").css({"background-color": ""});
	$(".randomcolor").removeClass("randomcolor");

	$(".opacity1").removeClass("opacity1");
	$(".opacity2").removeClass("opacity2");
	$(".opacity3").removeClass("opacity3");
	$(".opacity4").removeClass("opacity4");
	$(".opacity5").removeClass("opacity5");

	$(".pixel").addClass("opacity0");
};

$(document).ready(function() {
	createCanvas(16);

	$("#clear").on("click", function() {
		clearCanvas();
	});

	$("#mode").on("click", function() {
		clearCanvas();
		if(currentMode === "draw") {
			currentMode = "random";
			$("#modelabel").text("Random");
		}
		else if(currentMode === "random") {
			currentMode = "airbrush";
			$("#modelabel").text("Airbrush");
		}
		else if(currentMode === "airbrush") {
			currentMode = "trail";
			$("#modelabel").text("Trail");
		}
		else if(currentMode === "trail") {
			currentMode = "draw";
			$("#modelabel").text("Draw");
		}
	});

	$("#size").on("click", function() {
		var newSize = parseInt(prompt("Please enter a size from 1 - 127:", "16"));

		if(0 < newSize && 128 > newSize) {
			clearCanvas();
			$(".pixel").remove();
			createCanvas(newSize);
		}
		else {
			alert("That is not a valid size.");
		}
	});
});