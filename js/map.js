$(document).ready(function(){
  const map = $('#map');
  const game = $('#playGame')

  const gameSettings = {
    move: 3,  //a player can move three tiles
    weapons: [  //The game contains the following weapons and the have a specific damage
      {name: 'default', damage: 10},
      {name: 'sword', damage: 15},
      {name: 'gun', damage: 20},
      {name: 'sniper', damage: 25},
      {name: 'supergun', damage: 25}
    ],
    players:[
      {name: 'Player 1', life: 100, active: true},
      {name: 'Player 2', life: 100, active: false}
    ]

  }

  // add addEventListener to button so when it is clicked the map will be generated.
  game.click(function(){
    generateMap();
    $('.display').css('display', 'block');
    game.css('display', 'none');
  })

// Generate board divs with a class of div
  function generateMap(){
    for (let i = 0; i < 90; i++){
      map.append('<div class="div" divID =' + i +'></div>')
    }

    for (let i = 0; i < 12; i++){
      $('#map div:nth-child('+Math.floor(Math.random()*70)+')').addClass('black');
    }
  }

  // Information about the players
  function Player(name, player, health, damage, weapon, active){
    this.name = name;
    this.player = player;
    this.health = health;
    this.damage = damage;
    this.weapon = weapon;
    this.active = active;
  }

  let player1 = Player()


})
