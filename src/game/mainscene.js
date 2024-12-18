import RoomContainer from './roomContainer.js';

export default class mainscene extends Phaser.Scene {
    constructor() {
        super({key: "mainscene"});
    }

    create() {
        this.frameArray = [];

        this.bgMusic = this.sound.add('bgMusic');
        var bgMusicConfig = {
            mute: false,
            volume: 0.6,
            loop: true,
        }
        this.bgMusic.play(bgMusicConfig);

        this.click = this.sound.add('click');

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);
        this.background.setScale(0.77,0.69);

        this.add.text(20,20, 'Log Viewer Simulator', {
            font: '30px Arial',
            fill: 'white'
        });

        this.addRoom = this.add.image(640,360,'add room');
        this.addRoom.setOrigin(0.5,0.5);
        this.addRoom.setScale(0.5,0.5);
        this.frameArray.push(this.addRoom);
        this.addRoom.setInteractive();

        this.addRoom.on('pointerdown', (pointer) => {
            this.click.play();
            const room = new RoomContainer(this, updateFrames); // No need to pass decideLogBox since it is handled in the class
            this.frameArray.splice(this.frameArray.length - 1, 0, room.container);
            updateFrames(this, this.frameArray);
            console.log('Room has been created.');
        });                

        this.leftArrow = this.add.image(80,660,'left arrow');
        this.leftArrow.setOrigin(0.5,0.5);
        this.leftArrow.setScale(0.5,0.5);
        this.leftArrow.setInteractive();
        this.leftArrow.on('pointerdown', (pointer) => {
            this.click.play();
            var direction = 1;
            moveFrames(this.frameArray,direction);
        });

        this.rightArrow = this.add.image(1200,660,'right arrow');
        this.rightArrow.setOrigin(0.5,0.5);
        this.rightArrow.setScale(0.5,0.5);
        this.rightArrow.setInteractive();
        this.rightArrow.on('pointerdown', (pointer) => {
            this.click.play();
            var direction = -1;
            moveFrames(this.frameArray,direction);
        });
    }
}

function updateFrames(scene, array) {
    let currentX = 0;
    array.forEach((item) => {
        if (item === scene.addRoom) {
            item.x = currentX + 640;
            currentX += 400;
        }
        else {
            item.x = currentX;
            currentX += 400;
        }
    });
}

function moveFrames(array, direction) {
    const shiftAmount = 400;
    array.forEach((item) => {
        item.x += direction * shiftAmount;
    });
}