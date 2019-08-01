import { Board } from './js/Board.js'

class App{
  constructor(divID, boardSize){
    this.board = null; //board object
    this.elem = null //app <div>

    //method
    this._initBoard(divId, boardSize);
  }

  _initBoard(divId, boardSize){
    //create board object
    this.board = new Board(boardSize);

    // Create  app <div> and append board element
    this.elem = $('<div>'). attr('id', 'board-app').append(this.board.elem);

    //append app <div> to the div inside of the html document
    $('#'+divId).append(this.elem);
  }
}
