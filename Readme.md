# Chess_Javascript
Implementation of the board game of Chess using Javascript front-end, nodejs/python backend
- Currently only implmented front-end logic to fill up the board and to switch the timer of the 2 players when a move is done.
- A move is done when a piece is drag and dropped into another square, eventHandler then fires switches the timers. 
- Different Class names added for piece type, to control styling 


Plan
- Server will allow 2 players to move pieces on the same board. 
- Server administrates the game by validating the move (valid move, state of the board, history of moves), then controlling turns
- Client should recieve the state of the board and timer and re-populate the board after opponent's move. 
