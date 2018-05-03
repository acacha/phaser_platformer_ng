var playState = {

  preload: function() {
    game.time.advancedTiming = true
    console.log('PRELOAD')

    game.load.image('wall', 'assets/wall.png');
    game.load.image('ground', 'assets/ground.png');

    game.load.spritesheet('player', 'assets/player.png', 28, 22);

  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    console.log('CREATE')

    this.cursor = game.input.keyboard.createCursorKeys();

    this.player = game.add.sprite(250, 50, 'player');
    this.player.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 600;
    this.player.animations.add('idle', [3, 4, 5, 4], 5, true);
    this.player.body.setSize(20, 20, 0, 0);
    this.player.anchor.setTo(0.5, 0.5);

    this.loadLevel();
  },

  update: function() {
    game.physics.arcade.collide(this.player, this.level);

    this.player.animations.play('idle');

    this.inputs()
  },

  inputs: function() {
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200;
    }
    else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }

    if (this.cursor.up.isDown) {
      this.jumpPlayer();
    }
  },

  render: function render() {

  //  FPS debug info
  game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");

  },

  jumpPlayer: function() {
    // && this.player.y > 100
    if (this.player.body.touching.down) {
      this.player.body.velocity.y = -220;
    }

    // if (this.player.body.touching.down && this.player.y > 100) {
    //   game.sound.mute = false;
    //   this.hasJumped = true;
    //   this.jumpSound.play();
    //   this.player.body.velocity.y = -220;
    // }
  },

  loadLevel: function(coins, enemies) {
    this.level = game.add.group();
    this.level.enableBody = true;
    game.add.sprite(90, 200/2 -50, 'wall', 0, this.level);
    game.add.sprite(390, 200/2 -50, 'wall', 0, this.level);
    game.add.sprite(500/2 - 160, 200/2 +30, 'ground', 0, this.level);
    this.level.setAll('body.immovable', true);

    // game.physics.enable(this.ground, Phaser.Physics.ARCADE);



    // this.ground.enableBody = true;
    // this.level.setAll('body.immovable', true);

  },
};


var game = new Phaser.Game(500, 200, Phaser.AUTO, 'game');

game.state.add('play', playState);
game.state.start('play');