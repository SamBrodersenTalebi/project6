
class Square {
  constructor(id){
    this.id = id;
    this.blocked = false;
    this.player = null;
    this.weapon = none;
  }
  
  // ------------------------------------------------------------------------
  // GETTER AND SETTER
  // ------------------------------------------------------------------------

  get blocked(){
    return this._blocked;
  }

  //Setter takes the argument from the getter function
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

  get location(){
    let tdId =  $('#player').parent().attr('id');
    //use number method to turn string into number
    let r = Number( tdId[0]);
    let c = Number( tdId[2] );

    let location = {row:r, column: c};

    return location;
  }
}
