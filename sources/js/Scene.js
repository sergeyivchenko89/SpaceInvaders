var Scene = function() {

	//Init canvas
	var self = this;
	var canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 768;

	var starsCount = 100;
	this.currentLeftValue;
	var stars = [];
	var boatInstance;
	var requestAnimationId = 0;

	//public methods

	this.build = function () {

		redrawCanvas();

		document.body.insertBefore(canvas, document.body.firstChild);

		startGame();
	};

	this.setSize = function (width, height) {
		canvas.width = width;
		canvas.height = height;
		return this;
	};

	this.setStarsCount = function (count) {
		starsCount = count;
		return this;
	};

	this.setBoat = function (boat) {
		boatInstance = boat;

		boatInstance.setMaxLeftSpace(canvas.width - boat.getWidth());

		return this;
	}

	//private metods

	var startGame = function () {

		redrawCanvas();

		requestAnimationId = window.requestAnimationFrame(function () {
			startGame();
		});
	};

	var stopGame = function () {
		window.cancelAnimationFade(requestAnimationId);
	};

	var drawStarrySky = function () {

		var ctx = getContext();
		ctx.fillStyle = '#ffffff';

		for (var i = 0; i < starsCount; i++) {
			var starX;
			var starY;

			if (!!stars[i]) {
				starX = stars[i].x;
				starY = stars[i].y;
			} else {
				starX = Math.floor(Math.random() * canvas.width + 1);
				starY = Math.floor(Math.random() * canvas.height + 1);
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

	var redrawCanvas = function () {
		//Context preparing
		getContext().clearRect(0, 0, canvas.width, canvas.height);

		//Draw default elements
		fillCanvas();
		drawStarrySky();

		//Draw boat
		drawBoat();
	};

	var getContext = function () {
		return canvas.getContext('2d');
	};

	var fillCanvas = function () {
		var ctx = getContext();
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};

	var drawBoat = function () {

		if (!boatInstance) {
			return;
		}

		var startX = boatInstance.getLeft() > -1 ? 
			boatInstance.getLeft() : 
			(canvas.width - boatInstance.getWidth()) / 2;
		var startY = canvas.height - 2 * boatInstance.getHeight();

		boatInstance
			.setLeft(startX);
			
		//link boat to canvas
		getContext().drawImage(boatInstance.getView(), startX, startY);
	}
}



