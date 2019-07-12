
class Player{
  constructor(name, booolean){
    this._name = name;
    this._active = boolean
    this.elem = this.createView()
  }

  createView(){
    //Create div with an id of player an insert name of player into div
    let elem = $('<div>').attr('id', 'player').text(this._name);
    return elem
  }

  get active(){
    return this._active
  }

  set active(){
    
  }
}
