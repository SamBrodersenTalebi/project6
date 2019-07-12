
class Board{
  constructor(size){
    this.size = size;
    this.board = this._createModel(); //array that contains all square instances for all cells
    this.elem = this._createView(); //html elem
  }
  // ------------------------------------------------------------------------
  // Model and View methods
  // ------------------------------------------------------------------------

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
        $('<tr>').attr('id',id).appendTo(trElem);
      }
      $(tableElem).append(trElem);
    }
    return tableElem;
  }

  // ------------------------------------------------------------------------
  // Squares
  // ------------------------------------------------------------------------
  getSquareWithPlayer(){

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
    let weapons = ['Axe', 'Sword', 'Knife', 'Spear'];

    while(weapons.length > 0){
      //Grab one random cell
      let randomsquare = this.getRandomSquare();
      // If the randomsquare has an instance property of weapon set to an empty string then run the code
      if(randomsquare.weapon == ''){
        randomsquare.weapon = weapons.pop();
      }
    }
  }

  addPlayer(){
    let players = [p1,p2]
    let p1 = new Player('Sam', true);
    let p2 = new Player('Jeff', false)
    while(players.length > 0){
      let randomsquare = this.getRandomSquare();
      if(randomsquare.blocked == false && randomsquare.weapon == ''){
        randomsquare.setPlayer(p);
        players.pop();
      }
    }
  }
}
