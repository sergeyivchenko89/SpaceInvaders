var Boat = function () {

	var boatView;
	var direction;
	var stepMovement = 10;

	this.init();

	this.bindEvents();
}

Boat.prototype.init = function () {
	boatView = document.createElement('img');
	boatView.id = 'boat';
	boatView.src = '../img/boat_41x25.png';
	boatView.style.position = 'absolute';
	boatView.style.display = 'block';
};

Boat.prototype.getView = function () {	
	return boatView;
};

Boat.prototype.getWidth = function () {
	return boatView.width;
};

Boat.prototype.getHeight = function () {
	return boatView.height;
};

Boat.prototype.bindEvents = function () {

	window.onkeyup = function (event) {
		switch (event.keyCode) {
			case 37:
			case 39:
				direction = 0;
			break;
		}
	};

	window.onkeydown = function (event) {
		switch (event.keyCode) {
			case 37:
				direction = -1;
			break;
			case 39:
				direction = 1;
			break;
		};

		onBoatMoved();
	};

};

Boat.prototype.onBoatMoved = function () {

};