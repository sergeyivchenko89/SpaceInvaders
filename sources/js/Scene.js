var Scene = function() {

	//variables
	var canvas;
	var canvasWidth = 1024;
	var canvasHeight = 768;
	var starsCount = 100;
	var sceneInstance = this;

	//visible elements
	var boatInstance;

	//public methods
	this.build = function () {

		setCanvasSize();
		fillCanvas();
		drawStarrySky();

		drawBoat();

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
			var starX = Math.floor(Math.random() * canvasWidth + 1);
			var starY = Math.floor(Math.random() * canvasHeight + 1);

			ctx.beginPath();
			ctx.arc(starX, starY, 1, 0, 2 * Math.PI);
			ctx.fill();
		}
	};

	var drawBoat = function () {

		//create boat
		var boat = document.createElement('img');
		boat.src = '../img/boat.png';
		boat.onclick = function () {
			console.log('Boat click');
		}

		//link boat to canvas
		var ctx = canvas.getContext('2d');
		ctx.drawImage(boat, 0, 0);
	}

	//start actions
	init();

}