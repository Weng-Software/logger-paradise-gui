class ContainerRoom extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        // frame_room
        const frame_room = scene.add.image(157, 0, "frame_room");
        frame_room.scaleX = 0.5;
        frame_room.scaleY = 0.5;
        this.add(frame_room);

        // add_computer
        const add_computer = scene.add.sprite(0, 112, "add_computer");
        add_computer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 512, 512), Phaser.Geom.Rectangle.Contains);
        add_computer.scaleX = 0.1;
        add_computer.scaleY = 0.1;
        this.add(add_computer);

        // delete_room
        const delete_room = scene.add.sprite(317, 102, "delete_room");
        delete_room.setInteractive(new Phaser.Geom.Rectangle(0, 0, 512, 512), Phaser.Geom.Rectangle.Contains);
        delete_room.scaleX = 0.1;
        delete_room.scaleY = 0.1;
        this.add(delete_room);

        // Add computer (only 1 computer per room)
        add_computer.on('pointerdown', () => {
            console.log("Add computer clicked!");
            scene.addComputerConfirm_Container.visible = true;
        });

        // Add click event to delete_room
        delete_room.on('pointerdown', () => {
            console.log("Delete room clicked!");
            scene.deleteRoomConfirm_Container.visible = true;
        });

        // Add this container to the scene
        scene.add.existing(this);
    }
}