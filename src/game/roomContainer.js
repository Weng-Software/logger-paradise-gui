import InfoLogComputer from './InfoLogComputer.js';
import WarningLogComputer from './WarningLogComputer.js';
import ErrorLogComputer from './ErrorLogComputer.js';

export default class RoomContainer {
    constructor(scene, updateFrames) {
        this.scene = scene;
        this.updateFrames = updateFrames;
        this.container = scene.add.container(0, 0);

        // Add room image
        this.room = this.createRoom();
        this.container.add(this.room);

        // Add delete button
        this.deleteRoomButton = this.createDeleteRoomButton();
        this.container.add(this.deleteRoomButton);

        // Create the log selection box, but ensure it is tied to this container
        this.decideLogBox = this.createDecideLogBox();
        this.decideLogBox.setDepth(10);
        
        // Add computer button
        this.addComputerButton = this.createAddComputerButton();
        this.container.add(this.addComputerButton);
    }

    createRoom() {
        let room = this.scene.add.image(640, 360, 'room');
        room.setOrigin(0.5, 0.5);
        room.setScale(0.5, 0.5);
        return room;
    }

    createDeleteRoomButton() {
        let deleteRoom = this.scene.add.image(800, 460, 'delete room');
        deleteRoom.setOrigin(0.5, 0.5);
        deleteRoom.setScale(0.1, 0.1);
        deleteRoom.setInteractive();

        deleteRoom.on('pointerdown', () => {
            this.scene.click.play();
            const index = this.scene.frameArray.indexOf(this.container);
            if (index !== -1) {
                this.scene.frameArray.splice(index, 1);
                this.container.destroy();
                this.updateFrames(this.scene, this.scene.frameArray);
                console.log('Room has been deleted.');
            }
        });

        return deleteRoom;
    }

    createAddComputerButton() {
        let addComputer = this.scene.add.image(485, 470, 'add computer');
        addComputer.setOrigin(0.5, 0.5);
        addComputer.setScale(0.1, 0.1);
        addComputer.setInteractive();

        addComputer.on('pointerdown', () => {
            this.scene.click.play();
            this.decideLogBox.visible = true;
            addComputer.visible = false;
        });

        return addComputer;
    }

    createDecideLogBox() {
        let chooseComputerLogContainer = this.scene.add.container(0, 0);

        let chooseComputerLog = this.scene.add.image(640, 360, 'choose computer log');
        chooseComputerLog.setScale(0.75);
        chooseComputerLogContainer.add(chooseComputerLog);

        let chooseInfoLog = this.scene.add.image(640, 260, 'choose info log');
        chooseInfoLog.setScale(0.5);
        chooseInfoLog.setInteractive();
        chooseInfoLog.on('pointerdown', () => {
            this.scene.click.play();
            const infoComputer = new InfoLogComputer(this.scene);
            this.container.add(infoComputer); 
            chooseComputerLogContainer.visible = false;
        });
        chooseComputerLogContainer.add(chooseInfoLog);

        let chooseWarningLog = this.scene.add.image(640, 410, 'choose warning log');
        chooseWarningLog.setScale(0.5);
        chooseWarningLog.setInteractive();
        chooseWarningLog.on('pointerdown', () => {
            this.scene.click.play();
            const warningComputer = new WarningLogComputer(this.scene);
            this.container.add(warningComputer); 
            chooseComputerLogContainer.visible = false;
        });
        chooseComputerLogContainer.add(chooseWarningLog);

        let chooseErrorLog = this.scene.add.image(640, 560, 'choose error log');
        chooseErrorLog.setScale(0.5);
        chooseErrorLog.setInteractive();
        chooseErrorLog.on('pointerdown', () => {
            this.scene.click.play();
            const errorComputer = new ErrorLogComputer(this.scene);
            this.container.add(errorComputer); 
            chooseComputerLogContainer.visible = false;
        });
        chooseComputerLogContainer.add(chooseErrorLog);

        chooseComputerLogContainer.visible = false;

        return chooseComputerLogContainer;
    }
}
