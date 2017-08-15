var canvas,
ctx;

var points = [];
var modulo = 10;
var table = 3;
var enableText;
var enablePoint;
var center;
var radius;



class Point {
	constructor(value, x, y) {
		this.value = value;
		this.location = new Vector(x, y);
	}
	
	draw() {
		if(enablePoint) {
			ctx.beginPath();
			ctx.arc(this.location.x, this.location.y, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "red";
			ctx.fill();
			ctx.stroke();
		}


		if(enableText) {
			ctx.strokeStyle = 'black';
			ctx.font = '10pt Verdana';
			ctx.fillText(this.value, this.location.x, this.location.y);
			ctx.strokeText(this.value, this.location.x, this.location.y);
		}
	}
	
	update() {
		
	}
}



function main() {
	// init
	canvas = document.getElementById('game');
	canvas.width  = window.innerWidth * 0.80;
  	canvas.height = window.innerHeight * 0.80;
	ctx = canvas.getContext("2d");
	
	center = new Vector(canvas.width / 2, canvas.height / 2);
	radius = center.y / 1.3;

	document.body.appendChild(canvas);

	init();

	//game loop
	var loop = function() {
		update();
		draw();
		window.requestAnimationFrame(loop, canvas);
	};
	
	window.requestAnimationFrame(loop, canvas);
}

// init game objects
function init() {
	
}

function update() {

	modulo = $('#modulo').val();
	table = $('#table').val();

	if(table < 0)
		table = 0;

	if(modulo < 0)
		modulo = 0;

	enableText = $('#enableText').prop('checked');
	enablePoint = $('#enablePoint').prop('checked');

	if(modulo != points.length) {
		points = [];
		var angle = (360 / modulo) * Math.PI / 180;

		for(var i = 0; i < modulo; i++) {
			var point = new Point(i, center.x, center.y);
			point.location.x = point.location.x + radius * Math.cos(angle * i + (3/2 * Math.PI));
			point.location.y = point.location.y + radius * Math.sin(angle * i + (3/2 * Math.PI));
			points.push(point);
		}
	}

	for(let i = 0; i < points.length; i++) {
		points[i].update();
	}
	
}

function draw() {
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.save();


	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	ctx.stroke();
	
	
	for(let i = 0; i < points.length; i++) {
		points[i].draw();
	}

	for(let mul = 0; mul < points.length; mul++) {
		var result = (mul * table) % modulo;

		ctx.beginPath();
		ctx.moveTo(points[mul].location.x, points[mul].location.y);
		ctx.lineTo(points[result].location.x, points[result].location.y);
		ctx.stroke();
	}
	

	ctx.restore();
}

main();