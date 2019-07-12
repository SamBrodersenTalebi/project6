
class Square {
  constructor(id){
    this.id = id;
    this._blocked = false;
    this._player = null;
    this._weapon = '';
  }

  // ------------------------------------------------------------------------
  // GETTER AND SETTER
  // ------------------------------------------------------------------------

  // Getter is called when trying to read a property
  get blocked(){
    return this._blocked;
  }

  //Setter is called when trying to update a property
  set blocked(boolean){
    //Update model
    this._blocked = boolean;
    //Update view
    let td = $('#'+this.id);
    if(boolean){
      $(td).addClass('blocked');
    } else{
      $(td).removeClass('blocked');
    }
  }

  get weapon(){
    return this._weapon;
  }

  set weapon(string){
    //Update Model
    this._weapon = string;
    //Update View
    let td = $('#'+this.id);
    if(string.length > 0){
      $(td).addClass('weapon').children()[1].html(string);
    } else{
      $(td).removeClass('weapon')children()[1].html('');
    }
  }

  get player(){
    return this._player
  }

  set player(){
    
  }

  get location(){
    let tdId =  $('#player').parent().attr('id');
    //use number method to turn string into number
    let r = Number( tdId[0]);
    let c = Number( tdId[2] );

    let location = {row:r, column: c};

    return location;
  }
}
