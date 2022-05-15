


function onload()
{
	
	let pieces = document.querySelector(".piece");
	pieces.forEach(function (piece) {
	item.addEventListener("dragstart", drag);
	});
	
	let squares = document.querySelector(".squares");
	squares.forEach(function (square) {
	item.addEventListener("dragover", allowDrop);
	item.addEventListener("drop", drop);
	});
	
	timer1 = document.getElementById("player1_timer");
	timer2 = document.getElementById("player2_timer");
	timer1.clicked = false;
	timer2.clicked = false;
	timer1.minutes = 5;
	timer1.seconds = 60;
	timer2.minutes = 5;
	timer2.seconds = 60;
	setPlayerTimers();
}

function setPlayerTimers()
{
	
	document.getElementById("player1_timer").innerHTML =	timer1.minutes+":"+(timer1.seconds%60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
});
	document.getElementById("player2_timer").innerHTML =  timer2.minutes+":"+(timer2.seconds%60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
});

}


function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function startCountDown()
{
	
	timer_id = event.target.id;
	
	timer = document.getElementById(timer_id);
	if(timer.clicked == false)
	{	timer.clicked = true;
		timer.intervalID = setInterval(() => {
			if(timer.seconds%60 == 0) timer.minutes--;
			timer.seconds--;
			setPlayerTimers();
			}, 1000);
	
	}
	else if(timer.clicked == true) {
	clearInterval(timer.intervalID); 
	timer.clicked = false;
	}
}
