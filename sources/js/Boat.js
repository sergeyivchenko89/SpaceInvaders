var Boat = function () {

	var boatView;
	var step = 10;
	var leftSpace = -1;
	var maxLeftSpace;
	

	var self = this;

	/* public methods */

	this.getView = function () {	
		return boatView;
	};

	this.getWidth = function () {
		return boatView.width;
	};

	this.getHeight = function () {
		return boatView.height;
	};

	this.setLeft = function (value) {
		leftSpace = value;
	}

	this.getLeft = function () {
		return leftSpace;
	};

	this.setMaxLeftSpace = function (value) {
		maxLeftSpace = value;
	};

	this.getMaxLeftSpace = function () {
		return maxLeftSpace;
	};


	/* private methods */

	var init = function () {
		boatView = document.createElement('img');
		boatView.id = 'boat';
		boatView.src = '../img/boat_41x25.png';
		boatView.style.position = 'absolute';
		boatView.style.display = 'block';
	};

	var bindEvents = function () {

		window.onkeydown = onKeyDown;

	};

	var onKeyDown = function (event) {

		var direction;

		switch (event.keyCode) {
			case 37:
				direction = -1;
			break;
			case 38 :
				shoot();
			break;
			case 39:
				direction = 1;
			break;
			default:
				return;
		};

		moveTo(direction);
	};

	var moveTo = function (direction) {

		if (
			leftSpace === maxLeftSpace && direction > 0 || 
			leftSpace === 0 && direction < 0
		) {
			return;
		}

		leftSpace += direction * step;

		if (leftSpace > maxLeftSpace) {
			leftSpace = maxLeftSpace;
		} else if (leftSpace < 0) {
			leftSpace = 0;
		}

		self.getView().style.left = leftSpace + 'px';
	}

	var shoot = function () {
		console.log(self.getView());
	}

	//init part
	init();

	bindEvents();
}