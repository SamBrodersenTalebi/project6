class weapon{
  constructor(weapon, damage){
    this.weapon = weapon;
    this.damage = damage;
    this.element = this.createView();
  }

  createView(){
    let elem = $('<div>').attr('class', 'weapon').text(this.weapon);
    return elem
  }
}
