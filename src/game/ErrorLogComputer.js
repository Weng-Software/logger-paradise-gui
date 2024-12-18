export default class ErrorLogComputer {
    constructor(scene) {
        this.scene = scene;

        let errorComputer = this.scene.add.image(640, 340, 'computer');
        errorComputer.setScale(0.2);
        errorComputer.setTint(0xff2c2c);

        errorComputer.setInteractive();
        errorComputer.on('pointerdown', () => {
            console.log('Error Computer clicked!');
        });

        console.log('Error Computer added!');

        return errorComputer;
    }
}