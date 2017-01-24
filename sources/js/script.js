window.onload = function () {

	var invadersCount = 1000;

	var scene = new Scene();
	scene
		.setSize(1024, 768)
		.setStarsCount(200)
		.setBoat(new Boat())
		.build();

}