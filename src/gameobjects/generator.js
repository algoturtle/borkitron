export default class Generator {
  constructor(scene) {
    this.scene = scene;
    this.scene.time.delayedCall(2000, () => this.init(), null, this);
    this.pinos = 0;
    //this.generateStar();
  }

  init() {
    this.generateObstacle();
  }

  generateStar() {
    new Star(this.scene);
    this.scene.time.delayedCall(
      Phaser.Math.Between(10, 30),
      () => this.generateStar(),
      null,
      this
    );
  }

  generateObstacle() {
    const direction =
      this.scene.score < 0 || Math.floor(this.scene.score / 5) % 2 == 0
        ? -1
        : 1;
    const obstacleX = direction <  0 ? -direction * this.scene.width * 1.5 : -direction * this.scene.width * 0.75
    const y = Phaser.Math.Between(32, this.scene.height - 32);
    this.scene.pointers.add(
      new Pointer(
        this.scene,
        direction > 0 ? 0 : this.scene.width,
        y
      )
    );
    this.scene.obstacles.add(
      new Obstacle(
        this.scene,
        obstacleX,
        y
      )
    );
    this.scene.time.delayedCall(
      this.scene.easy ? 800 : 500,
      () => {
        //this.scene.pointers.add(new Pointer(this.scene, this.scene.width, y));
        this.generateObstacle();
      },
      null,
      this
    );

  }
}


/*
This is a game object that represents a star. It's a simple square with a random position. We use a tween to move it from right to left, and then destroy it when it's out of the screen.
*/
class Star extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    const finalX = x || Phaser.Math.Between(0, scene.height);
    const finalY = y || Phaser.Math.Between(0, scene.height);
    super(scene, finalX, finalY, 2, 2, 0xffffff);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 800, to: 0 },
      duration: 2000 / this.scale,
      onComplete: () => {
        this.destroy();
      },
    });
  }
}

/*
This is a game object that represents an obstacle. It works exactly like the star, but it's a red rectangle that is part of the obstacles group that we created in the `game` scene. It can kill the player if it touches it.
*/
class Obstacle extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 24, 24, 0xff0000);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);

    this.init();
  }

  init() {
    const left = -400
    const right = 1200
    const start = this.x < 0 ? left : right
    const end = this.x < 0 ? right : left

    this.scene.tweens.add({
      targets: this,
      x: { from: start, to: end },
      duration: 2666,
      onComplete: () => {
        this.destroy();
      },
    });
  }
}

class Pointer extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 24, 24, 0xffffff);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.scene.time.delayedCall(600, () => this.destroy(), null, this);
  }
}
