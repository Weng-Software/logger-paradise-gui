export default class WarningLogComputer {
    constructor(scene) {
        this.scene = scene;

        let warningComputer = this.scene.add.image(640, 340, 'computer');
        warningComputer.setScale(0.2);
        warningComputer.setTint(0xff5c00);

        warningComputer.setInteractive();
        warningComputer.on('pointerdown', () => {
            console.log('Warning Computer clicked!');
        });

        console.log('Warning Computer added!');

        return warningComputer;
    }
}