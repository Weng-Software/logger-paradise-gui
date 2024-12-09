class preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        this.load.image('background', 'Assets/background.jpg');
        this.load.image('add room', 'Assets/frame_addroom.png');
        this.load.image('room', 'Assets/frame_room.png');
        this.load.image('left arrow', 'Assets/left_arrow.png');
        this.load.image('right arrow', 'Assets/right_arrow.png');
        this.load.image('add computer', 'Assets/add_computer.png');
        this.load.image('delete room', 'Assets/delete_room.png');
        this.load.image('computer', 'Assets/computer.png');
        this.load.image('choose computer log', 'Assets/ChooseComputerLog_box.png');
        this.load.image('choose info log', 'Assets/ChooseInfoLog_Box.png');
        this.load.image('choose warning log', 'Assets/ChooseWarningLog_Box.png');
        this.load.image('choose error log', 'Assets/ChooseErrorLog_Box.png');
        this.load.audio('bgMusic', 'Assets/bgMusic.mp3');
        this.load.audio('click', 'Assets/click.mp3');
    }

    create() {
        this.scene.start('mainscene')
    }
}