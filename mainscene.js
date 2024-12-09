class mainscene extends Phaser.Scene {
    constructor() {
        super("mainscene");
    }

    create() {
        this.frameArray = [];

        this.bgMusic = this.sound.add('bgMusic');
        var bgMusicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
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

        const decideLogBox = decideLog(this);
        decideLogBox.setDepth(10);

        this.addRoom.on('pointerdown', (pointer) => {
            this.click.play();
            const room = new createRoomContainer(this, decideLogBox);
            this.frameArray.splice(this.frameArray.length - 1,0,room);
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

function createRoomContainer(scene, decideLogBox) {
    let roomContainer = scene.add.container(0,0);
    roomContainer.add(createRoom(scene));
    roomContainer.add(deleteRoom(scene, roomContainer));
    roomContainer.add(addComputer(scene, roomContainer, decideLog(scene, roomContainer))); // Pass roomContainer
    return roomContainer;
}

function createRoom(scene) {
    let room = scene.add.image(640,360,'room');
    room.setOrigin(0.5,0.5);
    room.setScale(0.5,0.5);
    return room;
}

function deleteRoom(scene, roomContainer) {
    let deleteRoom = scene.add.image(800,460,'delete room');
    deleteRoom.setOrigin(0.5,0.5);
    deleteRoom.setScale(0.1,0.1);
    deleteRoom.setInteractive();
    deleteRoom.on('pointerdown', (pointer) => {
        scene.click.play();
        // Find the index of the container in the frame array
        const index = scene.frameArray.indexOf(roomContainer);
        if (index !== -1) {
            // Remove it from the frame array
            scene.frameArray.splice(index, 1);
            // Destroy the container (and all of its children)
            roomContainer.destroy();
            // Update the positions of the frames
            updateFrames(scene, scene.frameArray);
            console.log('Room has been deleted.');
        }
    })
    return deleteRoom;
}

function addComputer(scene, roomContainer, decideLogBox) {
    let addComputer = scene.add.image(485,470,'add computer');
    addComputer.setOrigin(0.5,0.5);
    addComputer.setScale(0.1,0.1);
    addComputer.setInteractive();

    addComputer.on('pointerdown', (pointer) => {
        scene.click.play();
        decideLogBox.visible = true;
        addComputer.visible = false;
    });

    return addComputer;
}

function decideLog(scene, roomContainer) {
    let chooseComputerLogContainer = scene.add.container(0,0);

    let chooseComputerLog = scene.add.image(640,360,'choose computer log');
    chooseComputerLog.setScale(0.75);
    chooseComputerLogContainer.add(chooseComputerLog);

    let chooseInfoLog = scene.add.image(640,260,'choose info log');
    chooseInfoLog.setScale(0.5);
    chooseInfoLog.setInteractive();
    chooseInfoLog.on('pointerdown', (pointer) => {
        scene.click.play();
        roomContainer.add(infoLogComputer(scene)); // No more error, since roomContainer is now accessible
        chooseComputerLogContainer.visible = false;
    });
    chooseComputerLogContainer.add(chooseInfoLog);

    let chooseWarningLog = scene.add.image(640,410,'choose warning log');
    chooseWarningLog.setScale(0.5);
    chooseWarningLog.setInteractive();
    chooseWarningLog.on('pointerdown', (pointer) => {
        scene.click.play();
        roomContainer.add(warningLogComputer(scene)); // No more error, since roomContainer is now accessible
        chooseComputerLogContainer.visible = false;
    });
    chooseComputerLogContainer.add(chooseWarningLog);

    let chooseErrorLog = scene.add.image(640,560,'choose error log');
    chooseErrorLog.setScale(0.5);
    chooseErrorLog.setInteractive();
    chooseErrorLog.on('pointerdown', (pointer) => {
        scene.click.play();
        roomContainer.add(errorLogComputer(scene)); // No more error, since roomContainer is now accessible
        chooseComputerLogContainer.visible = false;
    });
    chooseComputerLogContainer.add(chooseErrorLog);

    chooseComputerLogContainer.visible = false;

    return chooseComputerLogContainer;
}

function infoLogComputer(scene) {
    let infoComputer = scene.add.image(640,340,'computer');
    infoComputer.setScale(0.2);
    infoComputer.setTint(0xffde21);

    return infoComputer;
}

function warningLogComputer(scene) {
    let warningComputer = scene.add.image(640,340,'computer');
    warningComputer.setScale(0.2);
    warningComputer.setTint(0xff5c00);

    return warningComputer;
}

function errorLogComputer(scene) {
    let errorComputer = scene.add.image(640,340,'computer');
    errorComputer.setScale(0.2);
    errorComputer.setTint(0xff2c2c);

    return errorComputer;
}