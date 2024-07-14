import Player from "../gameobjects/player";
import Generator from "../gameobjects/generator";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.player = null;
    this.score = -2;
    this.scoreText = null;
    this.movingLeft = false;
    this.movingRight = false;
    this.pointerDown = false;
    this.extraLife = false;
    this.easy = false;
    this.VelocityX = 0;
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
    this.load.spritesheet("zerker", "./assets/images/zerker.png", {
      frameWidth: 72,
      frameHeight: 72,
    });
    this.score = -2;
    this.extraLife = false;
    this.easy = false;
  }

  /*
Here we do several things.

- We use the `create` method to initialize the game.
- We set some variables to store width and height that we may need later.,
- We set the background color, and create the player, the obstacles, and the coins.
- We also create the keyboard input to listen to the space key.
- Also, we add a collider between the player and the obstacles and an overlap
between the player and the coins. The key part there is to set a function that will be called when the player overlaps with a coin or hits an obstacle.
*/
  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x000000);
    this.obstacles = this.add.group();
    this.pointers = this.add.group();
    this.generator = new Generator(this);
    this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.player = new Player(this, this.center_width, this.center_height);
    this.scoreText = this.add.bitmapText(
      (this.width / 2) - 10,
      this.height / 16,
      "arcade",
      this.score,
      20
    );

    this.physics.add.overlap(
      this.player,
      this.obstacles,
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
    obstacle.destroy();
    if (!this.extraLife) {
      this.updateScoreEvent.destroy();
      this.finishScene();
    }
    this.extraLife = false;
  }

  /*
This is the game loop. The function is called every frame.

Here is where we can check if a key was pressed or the situation of the player to act accordingly. We use the `update` method to check if the player pressed the space key.
*/
  update() {
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
      }
      if (this.input.activePointer.x < this.center_width) {
        this.pointerRight = false;
        this.pointerLeft = true;
        this.velocityX = -500;
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
  }

  moveLeft() {
    this.movingLeft = true;
    this.velocityX = -500;
  }

  stopX() {
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
  updateScore(points = 1) {
    this.score += points;
    this.scoreText.setText(this.score);
  }
}
