export default class InfoLogComputer {
    constructor(scene) {
        this.scene = scene;

        let infoComputer = this.scene.add.image(640, 340, 'computer');
        infoComputer.setScale(0.2);
        infoComputer.setTint(0xffde21);

        infoComputer.setInteractive();
        infoComputer.on('pointerdown', () => {
            console.log('Info Computer clicked!');
        });

        console.log('Info Computer added!');
        return infoComputer;
    }
}