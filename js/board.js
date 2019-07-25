class Board{
  constructor(size){
    this.size = size;
    this.board = this._createModel(); //array that contains all square instances for all cells
    this.players = this._createPlayers();
    this.elem = this._createView(); //html elem
  }
  // ------------------------------------------------------------------------
  // Model and View methods
  // ------------------------------------------------------------------------

  _createPlayers(){
    let p1 = new Player('Sam', true);
    let p2 = new Player('Jeff', false);
    let players = [p1,p2]
    return players;
  }

  _createModel(){
    let model = [];

    for(let row = 0; row < this.size; row++){
      model.push([]) // will push a [] for each row

      for(let column = 0; column < this.size; column++){
        let id = `${row},${column}`;
        model[row].push(new Square(id)); // push a new square for each column to the current row
      }
    }
    return model;
  }

//NEED TO APPEND TO DIVS TO TD!!!
  _createView(){
    let tableElem = $('<table>');

    for (let row = 0; row < this.size; row++){
      //create tr for each row
      let trElem = $('<tr>')

      for (let column = 0; column < this.size; column++){
        let id = `${row},${column}`;
        //append <td> to <tr> and add id to each cell
        let tdElem = $('<td>').attr('id',id).appendTo(trElem);
        for (let i = 0; i < 2; i++){
          $('<div>').appendTo(tdElem);
        }
      }
      $(tableElem).append(trElem);
    }
    return tableElem;
  }

  // ------------------------------------------------------------------------
  // Squares
  // ------------------------------------------------------------------------
  getSquareWithPlayer(active){
    //DELETE NAME ARGUMENT!
    let player = this.players[0];
    if(player.active !== active){
      player = this.players[1];
    }
    let location = Square.GetPlayerLocation(player.name);
    //return player from model array
    return this.board[location.row][location.column]

  }

  getRandomSquare(){
    let row = Math.floor(Math.random()*this.size);
    let column = Math.floor(Math.random()*this.size);
    return this.board[row][column];
  }

  //gets a specific square
  getSquare(row, column){
    return this.board[row][column]
  }

  // ------------------------------------------------------------------------
  // add blocked, weapons squares and player
  // ------------------------------------------------------------------------

  blockedsquares(){
    let i = 0;
    // while there is less than five td's that has the class of blocked then run the code
    while (i < 5){
      let randomsquare = this.getRandomSquare();
      //Grabs one random table cell and check if it is blocked
      if(randomsquare.blocked == false){
        // if random td is not blocked set it to blocked and increment i by 1.
        randomsquare.blocked = true;
        i++;
      }
    }
  }

  weaponsquares(){
    //Create weapon object and insert them into a randomsquare.
    let weapons = [new Weapon('Axe', 25), new Weapon('Sword', 20), new Weapon('Knife', 15), new Weapon('Spear', 20)];

    while(weapons.length > 0){
      //Grab one random cell
      let randomsquare = this.getRandomSquare();
      // If the randomsquare has an instance property of weapon set to an empty string then run the code
      if(randomsquare.weapon == null && randomsquare.blocked == false){
        randomsquare.setWeapon(weapons.pop());
      }
    }
  }

  addPlayer(){
    //FIX LOOP
    while(this.players.length > 0){
      let randomsquare = this.getRandomSquare();
      if(randomsquare.blocked == false && randomsquare.weapon == null && randomsquare.player == null){
        randomsquare.setPlayer(players.pop());
      }
    }
  }

  // ------------------------------------------------------------------------
  // EVENT PART TWO
  // ------------------------------------------------------------------------
  movePlayer(event){
    //Determine valid squares and add click handler
    let location = this.getSquareWithPlayer(true);
    let validSquares = this.findValidSquares(location);
    let moves = [
      //Up
      [0,1], [0,2], [0,3],
      //down
      [0,-1], [0,-2], [0,-3],
      //Left
      [1,0], [2,0], [3,0],
      //Right
      [-1,0], [-2,0], [-3,0]
    ];
    // CAN ONLY MOVE IF PLAYER IS ACTIVE
    if(player.active == true){
      //on hover shows the possible moves
      $('#table').hover(function(){
        let cells = $('td');
        //get the id of the hovered square
        let sqHover = $(this).data('id');
        // check horizontal moves
        //NEED TO TAKE OBSTRACLES INTO ACCOUNT!
        //check vertical moves
      })

      $('#table').on('click', function(){
        let

      })
      switchPlayer()

    }
  }

  findValidSquares(location){
    let validSquares = [];
    let row = location.row;
    let column = location.column;
    //Check Left moves
    for(i = 0; i < 3; i++){
      let newRow = row + i;
      let square = this.getSquare(newRow, column)
      if (newRow < 1 || newRow > this.size){
        break;
      }
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
        i++;
      }
    }
    //Check right moves
    for(i = -3; i > 0; i++){
      let newRow = row + i;
      let square = this.getSquare(newRow, column)
      if (newRow < 1 || newRow > this.size){
        break;
      }
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
        i++;
      }
    }
    //Check down moves
    for(j = 3; j < 0; j++){
      let newColumn = column + i;
      let square = this.getSquare(row, newColumn)
      if (newColumn < 1 || newColumn > this.size){
        break;
      }
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
        j++;
      }
    }
    //Check up moves
    for(j = -3; j > 0; j++){
      let newColumn = column + i;
      let square = this.getSquare(row, newColumn)
      if (newColumn < 1 || newColumn > this.size){
        break;
      }
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
        j++;
      }
    }
    return validSquares
  }

  switchPlayer(){
    // switches the active player
    if(players[0].active == true){
      players[0].active = false;
      players[1].active = true;
    }
    if(players[1].active == true){
      players[1].active = false;
      players[0].active = true;
    } 
  }

}
