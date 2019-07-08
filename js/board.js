
class Board{
  constructor(size){
    this.size = size;
    this.board = this._createModel();
    this.elem = this._createView();
  }
  // ------------------------------------------------------------------------
  // Model and View methods
  // ------------------------------------------------------------------------

  _createModel(){
    let model = [];

    for(let row = 0; row < this.size; row++){
      model.push([]) // will push a [] for each row

      for(let column = 0; column < this.size; column++){
        let id = `${r},${c}`;
        model[row].push(new Square(id)); // push a new square for each column to the current row
      }
    }
    return model;
  }
}
