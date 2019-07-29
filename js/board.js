import { Player } from './player.js'
import { Weapon } from './weapon.js'
import { Square } from './square.js'

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
    let weapons = [new Weapon('Axe', 30), new Weapon('Sword', 20), new Weapon('Knife', 20), new Weapon('Spear', 30)];

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
    let i = 0
    while(i <= 1){
      let randomsquare = this.getRandomSquare();
      if(randomsquare.blocked == false && randomsquare.weapon == null && randomsquare.player == null){
        randomsquare.setPlayer(this.players[i]);
        i++;
      }
    }
  }

  // ------------------------------------------------------------------------
  // EVENT PART TWO
  // ------------------------------------------------------------------------
  movePlayer(){
    //Find location of the active player
    let location = this.getSquareWithPlayer(true);
    //store the squares that a player can move into in an array.
    let validSquares = this.findValidSquares(location);
    //add class to the validSquares
    this.highlight(validSquares);
    //Listen for click event on the highlighted squares
    $('.highlight').click(function(e){
      /*let xPosition = e.pageX;
      let yPosition = e.pageY;
      // retrieve elem from coordinates
      let elem = document.elementFromPoint(xPosition, yPosition);
      */
      let elem = e.target;
      //access id of elem
      let id = $(elem).attr('id');
      //get the row and column number
      let row = Number( id[0]);
      let column = Number( id[2] );
      //pass row and column to move function
      this.move(row,column);
      //remove class highlight to the validsquares
      this.removeHighlight(validSquares);
      //switch active player when the turn is done
      switchPlayer()
    })
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
      }
    }
    return validSquares
  }

  highlight(array){
    //add class highlight to objects within validSquares array
    for(i = 0; i < array.length; i++){
      let td = array[i].id;
      $('#'+td).addClass('highlight');
    }
  }

  removeHighlight(array){
    //add class highlight to objects within validSquares array
    for(i = 0; i < array.length; i++){
      let td = array[i].id;
      $('#'+td).removeClass('highlight');
    }
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

  move(row,column){
    //get square with player
    let playerSquare = this.getSquareWithPlayer(true);
    //remove player from current square
    let player = playerSquare.removePlayer();
    // get the new square
    let square = this.getSquare(row,column);
    // insert player to the new square
    square.setPlayer(player);
    //If a player passes through a weapon it needs to update the weapon of the player
    if(square.weapon !== null){
      //square.weapon accesses the weapon object
      let weaponObject = square.weapon;
      //updates the players weapon
      player.weapon = weaponObject.weapon;
      //updates the damage that a player deflicts
      player.damage = weaponObject.damage;
      //remove weapon from square
      square.removeWeapon();
    }
    // ------------------------------------------------------------------------
    // FIGHT PART THREE
    // ------------------------------------------------------------------------
    //Get id of the current box
    let fight = false;
    let id = square.id;
    let row = Number( id[0]);
    let column = Number( id[2] );
    let adjacentSquares = [];
    adjacentSquares.push(getSquare(row + 1, column));
    adjacentSquares.push(getSquare(row - 1, column));
    adjacentSquares.push(getSquare(row, column + 1));
    adjacentSquares.push(getSquare(row, column - 1));
    //Loop over the adjacentSquares to see if there is a player;
    for(i=0; i < adjacentSquares.length; i++){
      if(adjacentSquares[i].player !== null){
        fight = true;
        break;
      }
    }
    if(fight){
      fight()
    }

  }

  fight(){
    while(this.players[0].life > 0 || this.players[1].life > 0){
      //Select active player
      let activePlayer;
      let inactivePlayer;
      for(i=0; i <this.players.length; i++){
        if(this.players[i].active = true){
          activePlayer = this.players[i];
        } else{
          inactivePlayer = this.players[i];
        }
      }
      $('#attackButton').click(function(){
        let damage = activePlayer.damage;
        activePlayer.defend = false;
        if(inactivePlayer.defend == true){
          damage / 2;
        }
        inactivePlayer.life -= damage;
        switchPlayer();
      })

      $('#defendButton').click(function(){
        activePlayer.defend = true;
        switchPlayer();
      })
    }
  }

}
