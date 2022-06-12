function loadBoard()
{
	addSquaresToBoard();
	
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
	updatePositions();
	
}

function updatePositions()
{
	var url = "http://127.0.0.1:5000/positions";
	var req = new XMLHttpRequest();
	
	
	req.onreadystatechange = function(){
	if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var response = req.response;
       initializeBoard(JSON.parse(response).board);
       
    }
	
	};
	
	// create a JSON object
	const json = {
	    "move": document.getElementById("move").value
	};

	req.open("GET", url);
	req.setRequestHeader('Content-type', 'text/plain');
	req.send();
	
}
function addSquaresToBoard()
{
	var parent = document.getElementById("board");
	
 	while (parent.firstChild) {
	        parent.removeChild(parent.firstChild);
    		}
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
}

function initializeBoard(boardConf)
{	
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
function makeMove(){
	var url = "http://127.0.0.1:5000/move";
	var req = new XMLHttpRequest();
	
	req.onreadystatechange = function(){
	if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("game").innerHTML = req.response;
       loadBoard();
    }
	
	};
	
	// create a JSON object
	const json = {
	    "move": document.getElementById("move").value
	};

	req.open("POST", url);
	req.setRequestHeader('Content-type', 'application/json');
	req.send(JSON.stringify(json));
	
}
