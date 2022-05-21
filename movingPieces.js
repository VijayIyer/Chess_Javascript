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

//#region all initializations
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
	piece.addEventListener("dragend", removeEffect);
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
	return;
}
function readTextFile(file)
{
	return;
}
//#endregion
// to be used later to read file on server at the start

//#region converting boardConf to class attributes
// recognize class from notation in boardConf
function getColor(color)
{	
	switch(color)
	{
	    case "W": return "white";
	    case "B": return "black";
	}
	return;
}
// recognize the column on the board from notation in boardConf
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
	return;
}
// recognize piece type from notation
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
	return ;
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
	return;
}
//#endregion

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
	return;
}
function createPieceDiv(pieceType, color)
{
	var node = document.createElement("img");
	var pieceClass = getPieceClass(pieceType);
	var color = getColor(color);
	// this line controls how the piece appears
	node.setAttribute("src", getPiece(pieceClass, color));
	node.setAttribute("class", "piece"+" "+pieceClass+" "+color);
	if(pieceClass == "pawn") node.setAttribute("hasMoved", "false");
	return node;
}

function removeEffect()
{
	var validSquares = document.querySelectorAll(".valid");
	for(var square of validSquares)
	{
		square.classList.remove("valid");
	}
	return;
}

function setPlayerTimers()
{
/*	var timer1Div = document.getElementById("player1_timer");
	var timer2Div = document.getElementById("player2_timer"); */
	
		timer1.innerHTML =	Math.floor(timer1.time/60) +":"+(timer1.time%60).toLocaleString("en-US", {
	    minimumIntegerDigits: 2,
	    useGrouping: false,
		});
	
	
		timer2.innerHTML =  Math.floor(timer2.time/60)+":"+(timer2.time%60).toLocaleString("en-US", {
	    minimumIntegerDigits: 2,
	    useGrouping: false,
		});
	return;
}

function getPieceColor(piece)
{
	if(piece.classList.contains("white")) return "white";
	else return "black";
}

function getPieceType(piece)
{
	if(piece.classList.contains("pawn")) return "pawn";
	else if(piece.classList.contains("knight")) return "knight";
	else if(piece.classList.contains("bishop")) return "bishop";
	else if(piece.classList.contains("rook")) return "rook";
	else if(piece.classList.contains("queen")) return "queen";
	
	else return "king";
}


function getValidKingSquares(squares, row, col, color)
{
	var initialSquares = [[row - 1, col], [row - 1, col - 1],
	 [row - 1, col + 1],  [row+1, col], 
	 [row + 1, col - 1], [row + 1, col + 1], [row, col - 1], [row, col+1]];
	 return initialSquares.
	 filter(square => ((square[0] < 8 && square[0] >= 0) && (square[0] < 8 && square[1] >= 0))).
	 filter(square => !(squares[square[0]*8+square[1]].childElementCount > 0 && squares[square[0]*8+square[1]].firstElementChild.classList.contains(color)));
	 //&& !squares[square[0]*8+sqaure[1].classList.contains(color)]));
	 
	 return;
}

// go in pawnRules file
function getInitialPawnSquaresMove(piece, row, col, color)
{
	if(color=="white")
	{	var initialSquares1 = [[row-1, col]]; 
		if(piece.getAttribute('hasMoved') == 'false') initialSquares1.push([row-2, col]);
	}
	else {
		var initialSquares1 = [[row+1, col]]; 
		if(piece.getAttribute('hasMoved') == 'false') initialSquares1.push([row+2, col]);
	}
	
	return initialSquares1;
		
}

// go in pawnRules file
function getInitialPawnSquaresCapture(piece, row, col, color)
{
	if(color=="white")
	{	var initialSquares1 = [[row-1, col-1], [row-1, col+1]]; 
		
	}
	else {
		var initialSquares1 = [[row+1, col-1], [row+1, col+1]]; 
		
	}
	
	return initialSquares1;
		
}



function getValidPawnSquares(piece, squares, row, col, color)
{	
	var initialSquares1 = getInitialPawnSquaresMove(piece, row, col, color)
	var initialSquares2 = getInitialPawnSquaresCapture(piece, row, col, color);	
	if(color == "white") var oppColor = "black";
	else var oppColor = "white";
	return initialSquares1.
	 filter(square => ((square[0] < 8 && square[0] >= 0) && (square[0] < 8 && square[1] >= 0))).
	 filter(square => !(squares[square[0]*8+square[1]].childElementCount > 0))
	 .concat(initialSquares2.
	 filter(square => ((square[0] < 8 && square[0] >= 0) && (square[0] < 8 && square[1] >= 0))).
	 filter(square => (squares[square[0]*8+square[1]].childElementCount > 0 && squares[square[0]*8+square[1]].firstElementChild.classList.contains(oppColor))));
	 
	 
}


function getValidKnightSquares(squares, row, col, color)
{
	var initialSquares = [[row+2, col+1], [row+2, col-1], [row+1, col+2], [row+1, col-2], 
	 [row-1, col-2], [row-1, col+2], [row-2, col+1], [row-2, col-1]];
	 return initialSquares.
	 filter(square => ((square[0] < 8 && square[0] >= 0) && (square[0] < 8 && square[1] >= 0))).
	 filter(square => !(squares[square[0]*8+square[1]].childElementCount > 0 && squares[square[0]*8+square[1]].firstElementChild.classList.contains(color)));
}

function getValidRookSquares(squares, row, col, color)
{ var initialSquares = [];
if(color == "white") var oppColor = "black";
	else var oppColor = "white";
tmp_row = row+1;
tmp_col = col;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && 
 	squares[tmp_row*8+tmp_col].childElementCount == 0)
 { initialSquares.push([tmp_row, tmp_col]); ++tmp_row;}
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor)) 
 	initialSquares.push([tmp_row, tmp_col]);
tmp_row = row - 1;
tmp_col = col;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount == 0)
 { initialSquares.push([tmp_row, tmp_col]); --tmp_row;}
 
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor)) 
 	initialSquares.push([tmp_row, tmp_col]);
tmp_row = row;
tmp_col = col + 1;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && 
 	squares[tmp_row*8+tmp_col].childElementCount == 0)
  { initialSquares.push([tmp_row, tmp_col]); ++tmp_col;}
 
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor)) 
 	initialSquares.push([tmp_row, tmp_col]);
tmp_row = row;
tmp_col = col - 1;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && 
 	squares[tmp_row*8+tmp_col].childElementCount == 0)
 { initialSquares.push([tmp_row, tmp_col]); --tmp_col;}
 
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor))
 	initialSquares.push([tmp_row, tmp_col]);
 
return initialSquares.
	 filter(square => ((square[0] < 8 && square[0] >= 0) && (square[0] < 8 && square[1] >= 0))).
	 filter(square => !(squares[square[0]*8+square[1]].childElementCount > 0 && squares[square[0]*8+square[1]].firstElementChild.classList.contains(color)));

}

function getValidBishopSquares(squares, row, col, color)
{
var initialSquares = [];
if(color == "white") var oppColor = "black";
	else var oppColor = "white";
tmp_row = row+1;
tmp_col = col+1;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && 
 	squares[tmp_row*8+tmp_col].childElementCount == 0)
 { initialSquares.push([tmp_row, tmp_col]); ++tmp_row; ++tmp_col;}
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor)) 
 	initialSquares.push([tmp_row, tmp_col]);
tmp_row = row - 1;
tmp_col = col+1;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount == 0)
 { initialSquares.push([tmp_row, tmp_col]); --tmp_row; ++tmp_col;}
 
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor)) 
 	initialSquares.push([tmp_row, tmp_col]);
tmp_row = row+1;
tmp_col = col - 1;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && 
 	squares[tmp_row*8+tmp_col].childElementCount == 0)
  { initialSquares.push([tmp_row, tmp_col]); --tmp_col; ++tmp_row;}
 
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor)) 
 	initialSquares.push([tmp_row, tmp_col]);
tmp_row = row - 1;
tmp_col = col - 1;
 while(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && 
 	squares[tmp_row*8+tmp_col].childElementCount == 0)
 { initialSquares.push([tmp_row, tmp_col]); --tmp_col; --tmp_row;}
 
 if(((tmp_row >= 0) && (tmp_row < 8) && (tmp_col >= 0) && (tmp_col < 8)) && squares[tmp_row*8+tmp_col].childElementCount > 0 && squares[tmp_row*8+tmp_col].firstElementChild.classList.contains(oppColor))
 	initialSquares.push([tmp_row, tmp_col]);
	
	
	return initialSquares.
	filter(square => Math.abs(square[0]-row) == Math.abs(square[1] - col)).
	filter(square => ((square[0] < 8 && square[0] >= 0) && (square[0] < 8 && square[1] >= 0))).
	 filter(square => !(squares[square[0]*8+square[1]].childElementCount > 0 && squares[square[0]*8+square[1]].firstElementChild.classList.contains(color)));
}

function getValidSquares(piece, squares, pieceType, currentPos, color)
{
	var row = currentPos[0];
	var col = currentPos[1];
	if(pieceType == "king") return getValidKingSquares(squares, row, col, color);
	 else if(pieceType == "pawn") return getValidPawnSquares(piece, squares, row, col, color); 
	 else if(pieceType == "knight") return getValidKnightSquares(squares, row, col, color);
	 else if(pieceType == "rook") return getValidRookSquares(squares, row, col, color);
	 else if(pieceType == "bishop") return getValidBishopSquares(squares, row, col, color);
	 else return getValidBishopSquares(squares, row, col, color).concat(getValidRookSquares(squares, row, col, color));
}

function highlightValidSquares(piece)
{
  var pieceType = getPieceType(piece);
  var pieceColor = getPieceColor(piece);
  var parentSquare = piece.parentElement.id; // parent of piece has to be a square
  var parentSquare = parentSquare.slice(parentSquare.indexOf("square")+6);
  var row = Math.floor(parentSquare/8);
  var col = parentSquare%8;
  var squares = document.querySelectorAll("#board td");
  var validSquares = getValidSquares(piece, squares, pieceType, [row, col], pieceColor);
  for(var square of validSquares) 
  {	[row, col] = square;
  	squares[row*8+col].classList.add("valid");
  }
  
  return;
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
  var piece = document.getElementById(ev.target.id);
  highlightValidSquares(piece);
  }

function drop(ev) {
  ev.preventDefault();
 
  var piece = document.getElementById(ev.dataTransfer.getData("text"));
  if(piece.classList.contains("black") && currentTimer != "player2_timer") return;
  if(piece.classList.contains("white") && currentTimer != "player1_timer") return;
  
  
  
  
  var parentSquare = document.getElementById(ev.target.id);
  
  while(!parentSquare.classList.contains("squares")) parentSquare = parentSquare.parentNode;
  if(!sameColor(piece, parentSquare))
  {
	  while(parentSquare.firstChild)
	  {
	  	parentSquare.removeChild(parentSquare.lastChild);
	  }
	  parentSquare.appendChild(piece);
	  
	  
	  // effects of the move
	  if(piece.classList.contains("pawn")) piece.setAttribute('hasMoved', 'true');
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
			if(!timer.time == 0)
			//if(timer.seconds%60 == 0) { timer.minutes--; timer.seconds = 60;}
			{
				timer.time--;
			}
				setPlayerTimers();
				}, 1000);
}	

function startCountDown()
{
	timer_id = event.target.id;
	startTimer(timer_id);	
}
