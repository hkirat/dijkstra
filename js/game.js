var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
//bg image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//ball 1 image
var ball1Ready = false;
var ball1Image = new Image();
ball1Image.onload = function () {
	ball1Ready = true;
};
var spd=5;
ball1Image.src = "images/1.png";
var ball1 = 
{
	taut:true,
	x:0,
	y:0,
	speed:spd
}

//ball 2 image
var ball2Ready = false;
var ball2Image = new Image();
ball2Image.onload = function () {
	ball2Ready = true;
};
ball2Image.src = "images/2.png";

//ball 3 image
var ball3Ready = false;
var ball3Image = new Image();
ball3Image.onload = function () {
	ball3Ready = true;
};
ball3Image.src = "images/3.png";

//ball 4 image
var ball4Ready = false;
var ball4Image = new Image();
ball4Image.onload = function () {
	ball4Ready = true;
};
ball4Image.src = "images/4.png";

//ball 5 image
var ball5Ready = false;
var ball5Image = new Image();
ball5Image.onload = function () {
	ball5Ready = true;
};
ball5Image.src = "images/5.png";

var balls=
[
	{
		//temporary..no use
		taut:false,
		x:0,
		y:0,
		speed:spd,
		neighbour:[0,2,3],
		distance:200
	},
	{	//2
		taut:false,
		x:0,
		y:0,
		speed:spd,
		neighbour:[0,2,3],
		distance:[200,100,150]
	},
	{	//3
		taut:false,
		x:50,
		y:0,
		speed:spd,
		neighbour:[0,1,3,4],
		distance:[400,100,500,100]
	},
	{	//4
		taut:false,
		x:100,
		y:0,
		speed:spd,
		neighbour:[0,1,2],
		distance:[200,150,500]
	},
	{	//5
		taut:false,
		x:150,
		y:0,
		speed:spd,
		neighbour:[2],
		distance:[100]
	}
];

var keysDown = {};
//adding key listeners
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	f=0;
}, false);

var reset = function () 
{
	balls[1].taut=false;
	balls[2].taut=false;
	balls[3].taut=false;
	balls[4].taut=false;

	balls[1].y=0;
	balls[2].y=0;
	balls[3].y=0;
	balls[4].y=0;

};
var f=0;
var difficulty=-40;
var acc=1;
var update = function (modifier) 
{
	if (38 in keysDown)
	{ 
	reset();
	}

	if (ball1.taut==false)
	{
		ball1.y+=ball1.speed;
	}
	if (balls[1].taut==false)
	{
		balls[1].y+=balls[1].speed;
	}
	if (balls[2].taut==false)
	{
		balls[2].y+=balls[2].speed;
	}	

	if (balls[3].taut==false)
	{
		balls[3].y+=balls[3].speed;
	}	
	if (balls[4].taut==false)
	{
		balls[4].y+=balls[4].speed;
	}
	///code to check if a slack tring is going to become taut in the journey ahead
	//for (var i=0;i<balls.length;i++)
	//	balls[i].taut=true;
	for (j=1;j<balls.length;j++)
	{	if (balls[j].taut==false)
		{
			for (var i=0;i<balls[j].neighbour.length;i++)
			{
				if (balls[j].neighbour[i]==0)
				{
					if (balls[j].y>=ball1.y+balls[j].distance[i])
						balls[j].taut=true;
				}
				else if (balls[balls[j].neighbour[i]].taut==true)
				{
					if (balls[j].y>=balls[balls[j].neighbour[i]].y+balls[j].distance[i])
						balls[j].taut=true;
				}
			}
		}
	}
	if (38 in keysDown && f==0) 
	{ // Player holding upper1
		f=1;
	}
};

//function to render on the screen
var render = function () {
	if (bgReady) 
		ctx.drawImage(bgImage, 0, 0);
	
	if (ball1Ready)
			ctx.drawImage(ball1Image,ball1.x,ball1.y);


	if (ball2Ready)
			ctx.drawImage(ball2Image,balls[1].x,balls[1].y);


	if (ball3Ready)
			ctx.drawImage(ball3Image,balls[2].x,balls[2].y);

	if (ball4Ready)
			ctx.drawImage(ball4Image,balls[3].x,balls[3].y);


	if (ball5Ready)
			ctx.drawImage(ball5Image,balls[4].x,balls[4].y);


	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("maximum distance to 2: " + balls[1].y, 200, 32);
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("maximum distance to 3: " + balls[2].y, 200, 60);


	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("maximum distance to 4: " + balls[3].y, 200, 90);


	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("maximum distance to 5: " + balls[4].y, 200, 120);

	};


// the main loop of the game
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};
var then = Date.now();
reset();
main();
