export default class Ball extends Phaser.GameObjects.GameObject
{
    image: Phaser.Physics.Arcade.Image;
    paddle: Phaser.Physics.Arcade.Image;
    onPaddle: Boolean;
    
    constructor(scene: Phaser.Scene, paddle: Phaser.Physics.Arcade.Image)
    {
        super(scene, "ball");
        this.paddle = paddle;

        this.create();
    }

    create()
    {
        this.image = this.scene.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.onPaddle = true;

        this.scene.input.on('pointerup', function () {

            if (this.onPaddle)
            {
                this.image.setVelocity(-75, -300);
                this.onPaddle = false;
            }

        }, this);
    }

    reset()
    {
        this.image.setVelocity(0);
        this.image.setPosition(this.paddle.x, 500);
        this.onPaddle = true;
    }

    hitPaddle(ballImage: Phaser.Physics.Arcade.Image, paddleImage: Phaser.Physics.Arcade.Image)
    {
        var diff = 0;

        if (ballImage.x < paddleImage.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddleImage.x - ballImage.x;
            ballImage.setVelocityX(-10 * diff);
        }
        else if (ballImage.x > paddleImage.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ballImage.x -paddleImage.x;
            ballImage.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ballImage.setVelocityX(2 + Math.random() * 8);
        }
    }

    update()
    {
        if (this.onPaddle)
        {
            this.image.x = this.paddle.x;
        }
        if (this.image.y > 600)
        {
            this.reset();
        }
    }

};