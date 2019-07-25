class Player{
  constructor(name, boolean){
    this._name = name;
    this._active = boolean;
    this.life = 100;
    this.weapon = 'default';
    this.elem = this.createView()
  }

  createView(){
    //Create div with an id of player an insert name of player into div
    let elem = $('<div>').attr('id', this._name).attr('class', 'player').text(this._name);
    return elem
  }

  get active(){
    return this._active
  }

  set active(boolean){
    this._active = boolean;
  }
}
