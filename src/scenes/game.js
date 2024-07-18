import Player from "../gameobjects/player";
import Generator from "../gameobjects/generator";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.player = null;
    this.score = -5;
    this.scoreText = null;
    this.lives = 3;
    this.livesText = null;
    this.movingLeft = false;
    this.movingRight = false;
    this.pointerDown = false;
    this.stars = true;
    this.velocityX = 0;

    // Modify these for traits
    this.extraLife = false;
    this.easy = false;
  }

  init(data) {
    this.name = data.name;
    this.number = data.number;
  }

  /*
    We use the `preload` method to load all the assets that we need for the game.
    We also set the score to 0 in the registry, so we can access it from other scenes.
    */
  preload() {
    this.registry.set("score", 0);
    this.load.bitmapFont(
      "arcade",
      "assets/fonts/arcade.png",
      "assets/fonts/arcade.xml"
    );
    this.load.spritesheet("player", "./assets/images/player.png", {
      frameWidth: 64,
      frameHeight: 72,
    });
    this.load.spritesheet("enemy", "./assets/images/enemy.png", {
      frameWidth: 70,
      frameHeight: 70,
    });
    this.load.spritesheet("arrow", "./assets/images/arrow.png", {
      frameWidth: 62,
      frameHeight: 65,
    });

    this.score = -5;
    this.lives = 3;
    this.stars = true;
    this.hardStars = true;
    this.velocityX = 0;
    this.movingLeft = false;
    this.movingRight = false;
    this.pointerDown = false;
  }

  /*
Here we do several things.

- We use the `create` method to initialize the game.
- We set some variables to store width and height that we may need later.,
- We set the background color, and create the player, the enemies, and the coins.
- We also create the keyboard input to listen to the space key.
- Also, we add a collider between the player and the enemies and an overlap
between the player and the coins. The key part there is to set a function that will be called when the player overlaps with a coin or hits an obstacle.
*/
  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.worldTop = this.width / 16;
    this.worldBottom = this.width / 2

    this.cameras.main.setBackgroundColor(0x000000);
    this.physics.world.setBounds(0, this.worldTop, this.width, this.worldBottom - this.worldTop, true, true, true, true)
    this.enemies = this.add.group();
    this.pointers = this.add.group();
    this.generator = new Generator(this);
    this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.player = new Player(this, this.center_width, 250);
    this.player.init();
    this.scoreText = this.add
      .bitmapText(this.width / 8, 25, "arcade", "Score: 0", 15)
      .setOrigin(0.5);
    this.livesText = this.add
      .bitmapText(
        this.width - this.width / 8,
        25,
        "arcade",
        "Lives: " + this.lives,
        15
      )
      .setOrigin(0.5);

    this.add
      .bitmapText(this.center_width, 25, "arcade", "The Gravitron", 40)
      .setOrigin(0.5);

    this.timerText = this.add
      .bitmapText(
        this.center_width,
        this.height / 5 * 4,
        "arcade",
        -this.score,
        50
      )
      .setOrigin(0.5);

    this.message = this.add
      .bitmapText(
        this.center_width,
        (this.height / 16) * 10,
        "arcade",
        "Avoid the enemies!",
        25
      )
      .setOrigin(0.5);
    this.subMessage = this.add
      .bitmapText(
        this.center_width,
        (this.height / 16) * 11,
        "arcade",
        "controls: LEFT, RIGHT, A, D",
        15
      )
      .setOrigin(0.5);

    this.physics.world.on("worldbounds", (body, up, down, _left, _right) => {
      if (up || down) {
        body.gameObject.toggleFlipY()
      }
    });

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hitObstacle,
      () => {
        return true;
      },
      this
    );

    /*
    We use `updateScoreEvent` to update the score every 100ms so the player can see the score increasing as long as he survives.
    */
    this.updateScoreEvent = this.time.addEvent({
      delay: 1000,
      callback: () => this.updateScore(),
      callbackScope: this,
      loop: true,
    });
  }

  /*
This method is called when the player hits an obstacle. We stop the updateScoreEvent so the score doesn't increase anymore.

And obviously, we finish the scene.
*/
  hitObstacle(player, obstacle) {
    if (this.player.invincible) { return };
    //obstacle.destroy();
    this.player.damage();
    this.cameras.main.shake(250, 0.025);
    this.updateLives();

    if (this.lives === 2) {
      this.message.setText("I said AVOID the enemies!");
    }

    if (this.lives === 1) {
      this.message.setText("last chance!");
    }

    if (this.lives <= 0){
      if (!this.extraLife) {
        this.updateScoreEvent.destroy();
        this.finishScene();
      }
      this.message.setText("I'll let you have one more")
      this.extraLife = false;
    }
  }

  /*
This is the game loop. The function is called every frame.

Here is where we can check if a key was pressed or the situation of the player to act accordingly. We use the `update` method to check if the player pressed the space key.
*/
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.S)) {
      this.stars = !this.stars;
    }

    const justDownLeft =
      Phaser.Input.Keyboard.JustDown(this.LEFT) ||
      Phaser.Input.Keyboard.JustDown(this.A);
    const justUpLeft =
      Phaser.Input.Keyboard.JustUp(this.LEFT) ||
      Phaser.Input.Keyboard.JustUp(this.A);
    const justDownRight =
      Phaser.Input.Keyboard.JustDown(this.RIGHT) ||
      Phaser.Input.Keyboard.JustDown(this.D);
    const justUpRight =
      Phaser.Input.Keyboard.JustUp(this.RIGHT) ||
      Phaser.Input.Keyboard.JustUp(this.D);

    if (this.input.activePointer.isDown) {
      if (this.input.activePointer.x > this.center_width) {
        this.pointerRight = true;
        this.pointerLeft = false;
        this.velocityX = 500;
        this.player.setFlipX(false);
      }
      if (this.input.activePointer.x < this.center_width) {
        this.pointerRight = false;
        this.pointerLeft = true;
        this.velocityX = -500;
        this.player.setFlipX(true);
      }
    } else {
      this.pointerRight = false;
      this.pointerLeft = false;
      if (!this.movingLeft && !this.movingRight) { this.velocityX = 0; }
    }

    if (justDownRight) {
      this.moveRight();
    }
    if (justDownLeft) {
      this.moveLeft()
    }
    if (justUpRight) {
      this.movingRight = false;
      this.movingLeft ? this.moveLeft() : this.stopX();
    }
    if (justUpLeft) {
      this.movingLeft = false;
      this.movingRight ? this.moveRight() : this.stopX();
    }

    this.player.body.setVelocityX(this.velocityX);
  }

  moveRight() {
    this.movingRight = true;
    this.velocityX = 500;
    this.player.setFlipX(false);
  }

  moveLeft() {
    this.movingLeft = true;
    this.velocityX = -500;
    this.player.setFlipX(true);
  }

  stopX() {
    this.pointerRight = false;
    this.pointerLeft = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.velocityX = 0;
  }

  /*
What should we do when we finish the game scene?

- Play the dead sound
- Set the score in the registry to show it in the `gameover` scene.
- Start the `gameover` scene.

*/
  finishScene() {
    this.stopX();
    this.registry.set("score", this.score);
    this.scene.start("gameover");
  }

  /*
This method is called every 100ms and it is used to update the score and show it on the screen.
*/
  updateScore() {
    this.score ++;

    switch (this.score) {
      case 5:
        this.message.setText("WATCH OUT! ON THE LEFT!");
        break;
      case 10:
        this.message.setText("we're just getting started");
        break;
      case 20:
        this.message.setText("is this getting faster?");
        break;
      case 30:
        this.message.setText("YOU WIN!");
        break;
      case 32:
        this.message.setText("jk, it never ends...");
        break;
      case 34:
        this.message.setText("it just gets harder and harder");
        break;
      case 45:
        this.message.setText("how long can you last?");
        break;
      case 80:
        this.message.setText("are you cheating?");
        break;
    }

    if (this.score < 0) {
      this.timerText.setText(-this.score);
    } else {
      this.timerText.setText(null);
      this.scoreText.setText("Score: " + this.score);
    }
  }

  updateLives(lives = 1) {
    this.lives -= lives;
    this.livesText.setText("Lives: " + this.lives);
  }
}
