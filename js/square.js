import { Player } from './player.js'
import { Weapon } from './weapon.js'

export class Square {
  static GetPlayerLocation(player){
      //get the id of the td with the player inside
      let tdId =  $('.player')[player].parent().attr('id');
      //use number method to turn string into number
      let r = Number( tdId[0]);
      let c = Number( tdId[2] );
      //return the row and column
      return { row: r, column: c};
  }

  constructor(id){
    this.id = id;
    this._blocked = false;
    this._player = null;
    this._weapon = null;
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
/*
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
*/
  setWeapon(weapon){
    //Update model
    this._weapon = weapon;

    //Update View
    let td = $('#'+this.id);
    $(td).children()[1].replaceWith(weapon.element)

  }

  removeWeapon(){
    //Update Model
    let weapon = this._weapon;
    this._weapon = null;

    //update View
    let td = $('#'+this.id);
    $(td).children()[1].replaceWith('div');

    //If a player moves into a tile with a weapon the instance property of damage needs to be updated
    //!!!!
  }

  setPlayer(p){
    //Update model
    this._player = p;

    //Update view
    let td = $('#'+this.id);
    $(td).children()[0].replaceWith(p.elem);

  }

  removePlayer(){
    //select player and update Model
    let p = this._player;
    this._player = null;

    //update View
    let td = $('#'+this.id);
    $(td).children()[0].replaceWith('div');

  }
}
