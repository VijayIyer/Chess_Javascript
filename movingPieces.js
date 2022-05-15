timer1 = document.getElementById("player1_timer");
timer2 = document.getElementById("player2_timer");
timer1.minutes = 5;
timer1.seconds = 60;
timer2.minutes = 5;
timer2.seconds = 60;

function setPlayerTimers()
{
	document.getElementById("player1_timer").innerHTML = "5:00";
	document.getElementById("player2_timer").innerHTML = "5:00";
}

function startCountDown()
{
	timer_id = event.target.id;
	
	timer = document.getElementById(timer_id);
	
}
