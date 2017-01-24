var Scene = function() {

	//Init canvas
	this.canvas = document.createElement('canvas');
	this.canvas.width = 1024;
	this.canvas.height = 768;

	this.starsCount = 100;
	this.currentLeftValue;
	this.stars = [];
	this.boatInstance;

	this.bindEvents();
}

Scene.prototype.build = function () {
	this.redrawCanvas();

	document.body.insertBefore(this.canvas, document.body.firstChild);
};

Scene.prototype.setStarsCount = function (count) {
	this.starsCount = count;
	return this;
};

Scene.prototype.setSize = function (width, height) {
	this.canvas.width = width;
	this.canvas.height = height;
	return this;
};

Scene.prototype.setBoat = function (boat) {
	this.boatInstance = boat;
	return this;
}

Scene.prototype.redrawCanvas = function () {
	//Context preparing
	this
		.getContext()
		.clearRect(0, 0, this.canvas.width, this.canvas.height);

	//Draw default elements
	this.fillCanvas();
	this.drawStarrySky();

	//Draw boat
	this.drawBoat();
}

Scene.prototype.drawBoat = function () {

	if (!this.boatInstance) {
		return;
	}

	var startX = (this.canvas.width - this.boatInstance.getWidth()) / 2;
	var startY = this.canvas.height - 2 * this.boatInstance.getHeight();
		
	//link boat to canvas
	this
		.getContext()
		.drawImage(this.boatInstance.getView(), startX, startY);
}

Scene.prototype.drawStarrySky = function () {

	var ctx = this.getContext();
	ctx.fillStyle = '#ffffff';

	for (var i = 0; i < this.starsCount; i++) {
		var starX;
		var starY;

		if (!!this.stars[i]) {
			starX = stars[i].x;
			starY = stars[i].y;
		} else {
			starX = Math.floor(Math.random() * this.canvas.width + 1);
			starY = Math.floor(Math.random() * this.canvas.height + 1);
			this.stars.push({
				x : starX ,
				y : starY
				});
		}

		ctx.beginPath();
		ctx.arc(starX, starY, 1, 0, 2 * Math.PI);
		ctx.fill();
	}
};

Scene.prototype.fillCanvas = function () {
	var ctx = this.getContext();
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

Scene.prototype.bindEvents = function () {

	if (!!this.boatInstance) {
		this.boatInstance.onBoatMoved = function () {
			console.log('onBoatmoved');
		}
	}
}

Scene.prototype.getContext = function () {
	return this.canvas.getContext('2d');
};