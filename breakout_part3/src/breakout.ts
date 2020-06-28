import 'phaser'
import Ball from './ball'

class Breakout extends Phaser.Scene
{
    bricks: Phaser.Physics.Arcade.StaticGroup;
    paddle: Phaser.Physics.Arcade.Image;
    ball: Ball;
    
    constructor(config: Phaser.Types.Core.GameConfig)
    {
        super(config);
    }

    preload()
    {
        this.load.atlas('assets', 'images/breakout.png', 'images/breakout.json');
    }

    create()
    {
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
            frameQuantity: 10,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });

        this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

        this.ball = new Ball(this, this.paddle);

        //  Our colliders
        this.physics.add.collider(this.ball.image, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball.image, this.paddle, this.ball.hitPaddle, null, this);

        //  Input events
        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

        }, this);
    }

    hitBrick(ball: Phaser.Physics.Arcade.Image, brick: Phaser.Physics.Arcade.Image)
    {
        brick.disableBody(true, true);

        if (this.bricks.countActive() === 0)
        {
            this.resetLevel();
        }
    }

    resetLevel()
    {
        this.ball.reset();

        this.bricks.children.each(function (brick: Phaser.Physics.Arcade.Image) {

            brick.enableBody(false, 0, 0, true, true);

        });
    }

    update()
    {
        this.ball.update();
    }

};

var config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [ Breakout ],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);
