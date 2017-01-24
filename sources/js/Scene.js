var Scene = function() {

	//variables
	var canvas;
	var canvasWidth = 1024;
	var canvasHeight = 768;
	var starsCount = 100;
	var sceneInstance = this;
	var currentLeftValue;
	var stars = [];

	//visible elements
	var boat;

	//intervals IDs
	var intervalsIDs = {
		boatTimerId : 0
	};

	//public methods
	this.build = function () {

		setCanvasSize();
		redrawCanvas();

		bindEvents();

		document.body.insertBefore(canvas, document.body.firstChild);
	};

	this.setStarsCount = function (count) {
		starsCount = count;

		return sceneInstance;
	};

	this.setSize = function (width, height) {
		canvasWidth = width;
		canvasHeight = height;

		return sceneInstance;
	};

	//private methods
	var init = function () {
		canvas = document.createElement('canvas');
	};

	var setCanvasSize = function () {
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
	}

	var fillCanvas = function () {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	};

	var drawStarrySky = function () {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#ffffff';



		for (var i = 0; i < starsCount; i++) {
			var starX;
			var starY;


			if (!!stars[i]) {
				starX = stars[i].x;
				starY = stars[i].y;
			} else {
				starX = Math.floor(Math.random() * canvasWidth + 1);
				starY = Math.floor(Math.random() * canvasHeight + 1);

				stars.push({
					x : starX ,
					y : starY
				});
			}

			ctx.beginPath();
			ctx.arc(starX, starY, 1, 0, 2 * Math.PI);
			ctx.fill();
		}
	};

	var drawBoat = function () {

		//create boat
		boat = document.createElement('img');
		boat.id = 'boat';
		boat.src = '../img/boat_41x25.png';
		boat.style.position = 'absolute';
		boat.style.display = 'block';


		//calculate start boat positoin
		if (!!currentLeftValue) {
			var startX = currentLeftValue;
		} else {
			var startX = (canvasWidth - boat.width) / 2;
			currentLeftValue = startX;
		}

		var startY = canvasHeight - 2 * boat.height;
		

		//link boat to canvas
		var ctx = canvas.getContext('2d');
		ctx.drawImage(boat, startX, startY);
		
	}

	var bindEvents = function () {

		var step;

		//События для управления кораблем
		window.onkeyup = function (event) {

			switch (event.keyCode) {
				case 37:
				case 39:
					step = 0;
					clearInterval(intervalsIDs.boatIntervalId);
				break;
			}

			return false;
		};

		window.onkeydown = function (event) {

			switch(event.keyCode) {
				case 37 :
					console.log('keydown To left');
					step = -1;
				break;
				case 39 :
					console.log('keydown To right');
					step = 1;
				break;
				default:
					return;
			}

			moveBoat(step);

			return false;
		};
	};

	var moveBoat = function (step) {

		intervalsIDs.boatTimerId = setTimeout(function tick() {
			currentLeftValue += step;
			redrawCanvas();

			//intervalsIDs.boatTimerId = setTimeout(tick, 10);
		}, 1);
	};

	var redrawCanvas = function () {
		//Context preparing
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		//Draw default elements
		fillCanvas();
		drawStarrySky();

		//Draw boat
		drawBoat();
	}

	//start actions
	init();

}