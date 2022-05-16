
var boardConf = ["a1 WR", "b1 WN", "c1 WB",
"d1 WQ",
"e1 WK",
"f1 WB",
"g1 WN",
"h1 WR",
"a2 Wp",
"b2 Wp",
"c2 Wp",
"d2 Wp",
"e2 Wp",
"f2 Wp",
"g2 Wp",
"h2 Wp",
"a7 Bp",
"b7 Bp",
"c7 Bp",
"d7 Bp",
"e7 Bp",
"f7 Bp",
"g7 Bp",
"h7 Bp",
"a8 BR",
"b8 BN",
"c8 BB",
"d8 BQ",
"e8 BK",
"f8 BB",
"g8 BN",
"h8 BR"];



// to be used later to read file on server at the start
function readTextFile(file)
{
}


function getColor(color)
{	
	switch(color)
	{
	    case "W": return "white";
	    case "B": return "black";
	}
}

function getColumn(columnNotation)
{
	switch(columnNotation)
	{
		case "a": return 0;
		case "b": return 1;
		case "c": return 2;
		case "d": return 3;
		case "e": return 4;
		case "f": return 5;
		case "g": return 6;
		case "h": return 7;
	}
}
function getPieceClass(pieceType)
{	
	switch(pieceType)
	{
	    case "p": return "pawn";
	    case "R": return "rook";
	    case "N": return "knight";
	    case "B": return "bishop";
	    case "Q": return "queen";
	    case "K": return "king";
	}
}
function getPiece(pieceClass, color)
{
	if(color =="white")
	{
		switch(pieceClass)
		{
		 case "pawn": return "&#9817;";
		 case "rook": return "&#9814;";
		 case "bishop": return "&#9815;";
		 case "knight": return "&#9816;";
		 case "queen" : return "&#9813;";
		 case "king": return "&#9812;"; 
		}	
	}
	else
	{
		switch(pieceClass)
		{
		 case "pawn": return "&#9823;";
		 case "rook": return "&#9820;";
		 case "bishop": return "&#9821;";
		 case "knight": return "&#9822;";
		 case "queen" : return "&#9819;";
		 case "king": return "&#9818;"; 
		}
	}
}
function createPieceDiv(pieceType, color)
{
	var node = document.createElement("div");
	var pieceClass = getPieceClass(pieceType);
	var color = getColor(color);
	// this line controls how the piece appears
	node.innerHTML = getPiece(pieceClass, color);
	node.setAttribute("class", "piece"+" "+pieceClass+" "+color);
	return node;
}

function initializeBoard()
{	var lines = boardConf;
	var cells = document.querySelectorAll('td');
	for(var line of lines) 
	{
		var col = getColumn(line.charAt(0));
		var row = 8 - line.charAt(1);
		var color = line.charAt(3);
		var pieceType = line.charAt(4);
		var node = createPieceDiv(pieceType, color);
		cells[row*8+col].appendChild(node);
	}
}


// all initializations
function onload()
{
	initializeBoard();
	var count = 0;
	let pieces = document.querySelectorAll("td div");
	/*pieces.forEach(function (piece) {
	piece.setAttribute("class", "piece");
	});
	*/
	pieces = document.querySelectorAll(".piece");
	pieces.forEach(function (piece) {
	piece.setAttribute("id", count++);
	piece.setAttribute("draggable", true);
	piece.addEventListener("dragstart", drag);
	});
	
	
	let cells = document.querySelectorAll("td");
	cells.forEach(function(cell) {
	cell.setAttribute("class", "squares");
	});
	
	let squares = document.querySelectorAll(".squares");
	squares.forEach(function (square) {
	square.addEventListener("dragover", allowDrop);
	square.addEventListener("drop", drop);
	});
	
	timer1 = document.getElementById("player1_timer");
	timer2 = document.getElementById("player2_timer");
	timer1.clicked = false;
	timer2.clicked = false;
	timer1.minutes = 5;
	timer1.seconds = 60;
	timer2.minutes = 5;
	timer2.seconds = 60;
	timer1.intervalID = null;
	timer2.intervalID = null;
	setPlayerTimers();
	startTimer('player1_timer');
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
  while (ev.target.firstChild) {
    ev.target.removeChild(ev.target.lastChild);
  }
  ev.target.appendChild(document.getElementById(data));
  if(ev.target.classList.contains("white"))
  { startTimer("player1_timer");
    
  }
  else
  {
    startTimer("player2_timer");
    
  }
  
}

function startTimer(timer_id)
{
	timer = document.getElementById(timer_id);
	if(timer.clicked === false)
	{	timer.clicked = true;
		timer.intervalID = setInterval(() => {
			if(timer.seconds%60 == 0) timer.minutes--;
			timer.seconds--;
			setPlayerTimers();
			}, 1000);
	
	}
	else if(timer.clicked === true) {
	clearInterval(timer.intervalID); 
	timer.clicked = false;
	timer.intervalID = null;
	}
}	

function startCountDown()
{
	timer_id = event.target.id;
	startTimer(timer_id);	
}
