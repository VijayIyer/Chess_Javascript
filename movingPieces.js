var currentTimer = "player1_timer";
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
		 case "pawn": return 'Chess pieces/pawn.png';
		 case "rook": return 'Chess pieces/rook.png';
		 case "bishop": return 'Chess pieces/bishop.png';s
		 case "knight": return 'Chess pieces/knight.png';
		 case "queen" : return 'Chess pieces/queen.png';
		 case "king": return 'Chess pieces/king.png';
		}	
	}
	else
	{
		switch(pieceClass)
		{
		 case "pawn": return 'Chess pieces/pawn1.png';
		 case "rook": return 'Chess pieces/rook1.png';
		 case "bishop": return 'Chess pieces/bishop1.png';
		 case "knight": return 'Chess pieces/knight1.png';
		 case "queen" : return 'Chess pieces/queen1.png';
		 case "king": return 'Chess pieces/king1.png';
		}
	}
}
function createPieceDiv(pieceType, color)
{
	var node = document.createElement("img");
	var pieceClass = getPieceClass(pieceType);
	var color = getColor(color);
	// this line controls how the piece appears
	node.setAttribute("src", getPiece(pieceClass, color));
	node.setAttribute("class", "piece"+" "+pieceClass+" "+color);
	return node;
}

function initializeBoard()
{	
	var numRows = 0;
	var numSquares = 0;
	var board = document.getElementById("board");
	while(numRows < 8)
	{
		var row = document.createElement("tr");
		row.setAttribute("id", "row"+(8-numRows));
		var temp = 0
		while(temp < 8)
		{
			var square = document.createElement("td");
			square.setAttribute("id", "square"+numSquares);
			row.appendChild(square);
			temp++;
			numSquares++;
		}
		board.appendChild(row);
		numRows++;
		
	}

	var lines = boardConf;
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
	//let pieces = document.querySelectorAll("td img");
	/*pieces.forEach(function (piece) {
	piece.setAttribute("class", "piece");
	});
	*/
	let pieces = document.querySelectorAll(".piece");
	pieces.forEach(function (piece) {
	piece.setAttribute("id", count++);
	piece.setAttribute("draggable", true);
	piece.addEventListener("dragstart", drag);
	});
	
	
	let cells = document.querySelectorAll("#board td");
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
	timer1.time = 300;
	timer2.time = 300;
	
	timer1.intervalID = null;
	timer2.intervalID = null;
	setPlayerTimers();
	startTimer('player1_timer');
}

function setPlayerTimers()
{
/*	var timer1Div = document.getElementById("player1_timer");
	var timer2Div = document.getElementById("player2_timer"); */
	if(!timer1.time == 0)
	{
		timer1.innerHTML =	Math.floor(timer1.time/60) +":"+(timer1.time%60).toLocaleString("en-US", {
	    minimumIntegerDigits: 2,
	    useGrouping: false,
		});
	}
	if(!timer2.time == 0)
	{
		timer2.innerHTML =  Math.floor(timer2.time/60)+":"+(timer2.time%60).toLocaleString("en-US", {
	    minimumIntegerDigits: 2,
	    useGrouping: false,
		});
	}

}

function sameColor(piece, parentSquare)
{
	if(parentSquare.hasChildNodes())
	{
	if(parentSquare.firstChild.classList.contains("white") && piece.classList.contains("white")) return true;
	if(parentSquare.firstChild.classList.contains("black") && piece.classList.contains("black")) return true;
	return false;
	}
	return false;
	
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var piece = document.getElementById(ev.dataTransfer.getData("text"));
  
  var parentSquare = document.getElementById(ev.target.id);
  
  while(!parentSquare.classList.contains("squares")) parentSquare = parentSquare.parentNode;
  if(!sameColor(piece, parentSquare))
  {
	  while(parentSquare.firstChild)
	  {
	  	parentSquare.removeChild(parentSquare.lastChild);
	  }
	  parentSquare.appendChild(piece);
	  if(piece.classList.contains("white"))
	  { currentTimer = "player2_timer";
	  }
	  else
	  {
	    currentTimer = "player1_timer"; 
	  }
   }
  
}

function getCurrentTimer(){
return currentTimer;
}

function startTimer(timer_id)
{
	intervalID = setInterval(() => {
			timer = document.getElementById(getCurrentTimer());
			//if(timer.seconds%60 == 0) { timer.minutes--; timer.seconds = 60;}
			timer.time--;
			setPlayerTimers();
			}, 1000);
}	

function startCountDown()
{
	timer_id = event.target.id;
	startTimer(timer_id);	
}
