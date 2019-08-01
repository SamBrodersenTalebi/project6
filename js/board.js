import { Player } from './player.js'
import { Weapon } from './weapon.js'
import { Square } from './square.js'
import { scoreBoard } from './scoreBoard.js'

export class Board{
  constructor(size){
    this.size = size;
    this.model = this._createModel(); //array that contains all square instances for all cells
    this.players = this._createPlayers(); // two player objects contained in array
    this.scoreBoard = new ScoreBoard(this.players);
    this.elem = this._createView(); //html elem
    this.restart = false;
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
    return this.model[location.row][location.column]

  }

  getRandomSquare(){
    let row = Math.floor(Math.random()*this.size);
    let column = Math.floor(Math.random()*this.size);
    return this.model[row][column];
  }

  //gets a specific square
  getSquare(row, column){
    return this.model[row][column]
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
        //calls setter
        randomsquare.weapon = weapons.pop();
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
    this.highlight(validSquares, true);
    //Listen for click event on the highlighted squares
    $('.highlight').click(function(e){
      let elem = e.target;
      //access id of elem
      let id = elem.id;
      //get the row and column number
      let row = Number( id[0]);
      let column = Number( id[2] );
      //pass row and column to move function
      this.move(row,column);
      //remove class highlight to the validsquares
      this.highlight(validSquares, false);
      //switch active player when the turn is done
      this.switchPlayer()
      // UPDATE SCOREBOARD!
      this.scoreBoard.swictchActivePlayer();
      this.scoreBoard.updatePlayerLifePoints();
      this.scoreBoard.updatePlayerWeapon();
    })
  }

  findValidSquares(location){
    let validSquares = [];
    let row = location.row;
    let column = location.column;
    //Check Left moves
    for(i = -1; i >= -3; i--){
      let newRow = row + i;
      if (newRow < 0){
        break;
      }
      let square = this.getSquare(newRow, column)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    //Check right moves
    for(i = 1; i <= 3; i++){
      let newRow = row + i;
      if (newRow > this.size - 1){
        break;
      }
      let square = this.getSquare(newRow, column)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    //Check down moves
    for(j = 1; j <= 3; j++){
      let newColumn = column + j;
      if (newColumn > this.size - 1){
        break;
      }
      let square = this.getSquare(row, newColumn)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    //Check up moves
    for(j = -1; j >= -3; j--){
      let newColumn = column + j;
      if (newColumn < 0){
        break;
      }
      let square = this.getSquare(row, newColumn)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    return validSquares
  }

  highlight(array, boolean){
    //add class highlight to objects within validSquares array
    for(i = 0; i < array.length; i++){
      array[i].highlight = boolean;
    }
  }

  switchPlayer(){
    // switches the active player
    players[0].active = ! players[0].active;
    players[1].active = ! players[1].active;
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
      //updates the players weapon by calling the setter
      player.weapon = weaponObject;
      //remove weapon from square
      square.weapon = null;
    }
    // ------------------------------------------------------------------------
    // FIGHT PART THREE
    // ------------------------------------------------------------------------
    //Get id of the current box
    let fight = false;
    let adjacentSquares = [];
    let rowRight = row+1;
    let rowLeft = row-1;
    let columnDown = column+1;
    let columnUp = column -1;
    if(rowRight > this.size -1){
      break;
    } else{
      adjacentSquares.push(this.getSquare(rowRight, column));
    }

    if(rowLeft < 0){
      break;
    } else{
      adjacentSquares.push(this.getSquare(rowLeft, column));
    }

    if(columnDown > this.size -1){
      break;
    } else{
      adjacentSquares.push(this.getSquare(row, columnDown));
    }

    if(columnUp < 0){
      break;
    } else{
      adjacentSquares.push(this.getSquare(row, columnUp));
    }

    //Loop over the adjacentSquares to see if there is a player;
    for(i=0; i < adjacentSquares.length; i++){
      if(adjacentSquares[i].player !== null){
        fight = true;
        break;
      }
    }
    if(fight){
      this.fight()
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
        let damage;
        if(activePlayer.weapon === null){
          damage = 10;
        } else{
          damage = activePlayer.weapon.damage;
        }
        activePlayer.defend = false;
        if(inactivePlayer.defend == true){
          damage / 2;
        }
        inactivePlayer.life -= damage;
        this.switchPlayer();
      })

      $('#defendButton').click(function(){
        activePlayer.defend = true;
        this.switchPlayer();
      })
      this.scoreBoard.updatePlayerLifePoints();
    }
    // save the winner
    let winner;
    if(this.players[0].life > 0){
      winner = this.players[0];
    } else{
      winner = this.players[1];
    }
    //run winner function
    let name = winner.name;
    this.gameOver(name)
  }

  gameOver(name){
    alert('The winner of the game is ' + name + '. Congratulations!')
    $('#restart').show();
  }
}
