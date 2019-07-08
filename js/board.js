
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
}
