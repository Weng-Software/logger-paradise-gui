// You can write more code here
class Computer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tint) {
        super(scene, x, y, 'computer');
	
        // Apply the provided tint (if any)
        if (tint !== undefined) {
            this.setTint(tint);  // Set the tint to the passed value
        }
		
        // Adjust size and interactive settings
        this.setScale(0.25);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);

        // Add click event
        this.on('pointerdown', () => {
            console.log("Computer clicked!");
        });
		
        // Add this sprite to the scene
        scene.add.existing(this);
    }
}

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

            scene.yes_Box_2.once('pointerdown', () => {
                scene.addComputerConfirm_Container.visible = false;
				add_computer.visible = false;
                this.addComputer(scene);
            });

            scene.no_Box_2.once('pointerdown', () => {
                scene.addComputerConfirm_Container.visible = false;
            });
        });

        // Click event for deleting the room
        delete_room.on('pointerdown', () => {
            console.log("Delete room clicked!");
            scene.deleteRoomConfirm_Container.visible = true;

            scene.yes_Box_1.once('pointerdown', () => {
				// Identify the container to delete
				const containerIndex = scene.allContainers.indexOf(this);
				if (containerIndex > -1) {
					// Remove the container from the scene and the array
					scene.allContainers.splice(containerIndex, 1);
					this.destroy();

					// Update the positions of remaining containers
					scene.realignContainersAfterDeletion();

					console.log(`Container ${containerIndex + 1} deleted.`);
				}
				scene.deleteRoomConfirm_Container.visible = false
            });

            scene.no_Box_1.once('pointerdown', () => {
				scene.deleteRoomConfirm_Container.visible = false;
            });
        });

        // Add this container to the scene
        scene.add.existing(this);
    }
	
    /**
     * Adds a computer to this container.
     * @param {Phaser.Scene} scene - The current scene.
     */
    addComputer(scene) {
		var computerTint = undefined;
		scene.chooseComputerLog_Container.visible = true;
		scene.readInfoLog_Box.on('pointerdown', () => {
			computerTint = 0xFBFF21;
			console.log("Computer wants to read info logs!");
			scene.chooseComputerLog_Container.visible = false;
			const computer = new Computer(scene, 156, -30, computerTint); // Adjust position as needed
			this.add(computer);
		});
		scene.readWarningLog_Box.on('pointerdown', () => {
			computerTint = 0xFF5733;
			console.log("Computer wants to read warning logs!");
			scene.chooseComputerLog_Container.visible = false;
			const computer = new Computer(scene, 156, -30, computerTint); // Adjust position as needed
			this.add(computer);
		});
		scene.readErrorLog_Box.on('pointerdown', () => {
			computerTint = 0xFF2C2C;
			console.log("Computer wants to read error logs!");
			scene.chooseComputerLog_Container.visible = false;
			const computer = new Computer(scene, 156, -30, computerTint); // Adjust position as needed
			this.add(computer);
		});
        console.log("Computer added to this room!");
    }
}
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(641, 358, "background");
		background.scaleX = 0.77;
		background.scaleY = 0.7;

		// text_1
		const text_1 = this.add.text(10, 10, "", {});
		text_1.text = "Log Viewer Simulator";
		text_1.setStyle({ "fontFamily": "Arial", "fontSize": "50px" });

		// frame_addroom
		const frame_addroom = this.add.sprite(640, 360, "frame_addroom");
		frame_addroom.setInteractive(new Phaser.Geom.Rectangle(0, 0, 800, 600), Phaser.Geom.Rectangle.Contains);
		frame_addroom.scaleX = 0.5;
		frame_addroom.scaleY = 0.5;

		// AddRoomConfirm_Container
		const addRoomConfirm_Container = this.add.container(640, 260);

		// confirm_box
		const confirm_box = this.add.image(0, 100, "confirm_box");
		confirm_box.scaleX = 0.7;
		confirm_box.scaleY = 0.7;
		addRoomConfirm_Container.add(confirm_box);

		// yes_Box
		const yes_Box = this.add.image(0, 0, "Yes_Box");
		yes_Box.scaleX = 0.75;
		yes_Box.scaleY = 0.75;
		addRoomConfirm_Container.add(yes_Box);

		// no_Box
		const no_Box = this.add.image(0, 243, "No_Box");
		no_Box.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 200), Phaser.Geom.Rectangle.Contains);
		no_Box.scaleX = 0.75;
		no_Box.scaleY = 0.75;
		addRoomConfirm_Container.add(no_Box);

		// right_arrow
		const right_arrow = this.add.sprite(1210, 650, "right_arrow");
		right_arrow.setInteractive(new Phaser.Geom.Rectangle(0, 0, 320, 320), Phaser.Geom.Rectangle.Contains);
		right_arrow.scaleX = 0.5;
		right_arrow.scaleY = 0.5;

		// left_arrow
		const left_arrow = this.add.sprite(70, 650, "left_arrow");
		left_arrow.setInteractive(new Phaser.Geom.Rectangle(0, 0, 320, 320), Phaser.Geom.Rectangle.Contains);
		left_arrow.scaleX = 0.5;
		left_arrow.scaleY = 0.5;

		// DeleteRoomConfirm_Container
		const deleteRoomConfirm_Container = this.add.container(640, 300);

		// deleteConfirm_box
		const deleteConfirm_box = this.add.image(0, 60, "deleteConfirm_box");
		deleteConfirm_box.scaleX = 0.7;
		deleteConfirm_box.scaleY = 0.7;
		deleteRoomConfirm_Container.add(deleteConfirm_box);

		// yes_Box_1
		const yes_Box_1 = this.add.image(0, 0, "Yes_Box");
		yes_Box_1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 200), Phaser.Geom.Rectangle.Contains);
		yes_Box_1.scaleX = 0.7;
		yes_Box_1.scaleY = 0.7;
		deleteRoomConfirm_Container.add(yes_Box_1);

		// no_Box_1
		const no_Box_1 = this.add.image(0, 200, "No_Box");
		no_Box_1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 200), Phaser.Geom.Rectangle.Contains);
		no_Box_1.scaleX = 0.7;
		no_Box_1.scaleY = 0.7;
		deleteRoomConfirm_Container.add(no_Box_1);

		// AddComputerConfirm_Container
		const addComputerConfirm_Container = this.add.container(640, 300);

		// addComputerConfirm_box
		const addComputerConfirm_box = this.add.image(0, 60, "AddComputerConfirm_box");
		addComputerConfirm_box.scaleX = 0.7;
		addComputerConfirm_box.scaleY = 0.7;
		addComputerConfirm_Container.add(addComputerConfirm_box);

		// yes_Box_2
		const yes_Box_2 = this.add.image(0, 0, "Yes_Box");
		yes_Box_2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 200), Phaser.Geom.Rectangle.Contains);
		yes_Box_2.scaleX = 0.7;
		yes_Box_2.scaleY = 0.7;
		addComputerConfirm_Container.add(yes_Box_2);

		// no_Box_2
		const no_Box_2 = this.add.image(0, 200, "No_Box");
		no_Box_2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 200), Phaser.Geom.Rectangle.Contains);
		no_Box_2.scaleX = 0.7;
		no_Box_2.scaleY = 0.7;
		addComputerConfirm_Container.add(no_Box_2);

		// ChooseComputerLog_Container
		const chooseComputerLog_Container = this.add.container(640, 300);

		// chooseComputerLog_box
		const chooseComputerLog_box = this.add.image(0, 60, "ChooseComputerLog_box");
		chooseComputerLog_box.scaleX = 0.7;
		chooseComputerLog_box.scaleY = 0.7;
		chooseComputerLog_Container.add(chooseComputerLog_box);

		// readInfoLog_Box
		const readInfoLog_Box = this.add.sprite(0, -50, "ChooseInfoLog_Box");
		readInfoLog_Box.setInteractive(new Phaser.Geom.Rectangle(0, 0, 500, 250), Phaser.Geom.Rectangle.Contains);
		readInfoLog_Box.scaleX = 0.4;
		readInfoLog_Box.scaleY = 0.4;
		chooseComputerLog_Container.add(readInfoLog_Box);

		// readWarningLog_Box
		const readWarningLog_Box = this.add.sprite(0, 70, "ChooseWarningLog_Box");
		readWarningLog_Box.setInteractive(new Phaser.Geom.Rectangle(0, 0, 500, 250), Phaser.Geom.Rectangle.Contains);
		readWarningLog_Box.scaleX = 0.4;
		readWarningLog_Box.scaleY = 0.4;
		chooseComputerLog_Container.add(readWarningLog_Box);

		// readErrorLog_Box
		const readErrorLog_Box = this.add.sprite(0, 190, "ChooseErrorLog_Box");
		readErrorLog_Box.setInteractive(new Phaser.Geom.Rectangle(0, 0, 500, 250), Phaser.Geom.Rectangle.Contains);
		readErrorLog_Box.scaleX = 0.4;
		readErrorLog_Box.scaleY = 0.4;
		chooseComputerLog_Container.add(readErrorLog_Box);

		this.frame_addroom = frame_addroom;
		this.yes_Box = yes_Box;
		this.no_Box = no_Box;
		this.addRoomConfirm_Container = addRoomConfirm_Container;
		this.right_arrow = right_arrow;
		this.left_arrow = left_arrow;
		this.yes_Box_1 = yes_Box_1;
		this.no_Box_1 = no_Box_1;
		this.deleteRoomConfirm_Container = deleteRoomConfirm_Container;
		this.yes_Box_2 = yes_Box_2;
		this.no_Box_2 = no_Box_2;
		this.addComputerConfirm_Container = addComputerConfirm_Container;
		this.readInfoLog_Box = readInfoLog_Box;
		this.readWarningLog_Box = readWarningLog_Box;
		this.readErrorLog_Box = readErrorLog_Box;
		this.chooseComputerLog_Container = chooseComputerLog_Container;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	frame_addroom;
	/** @type {Phaser.GameObjects.Image} */
	yes_Box;
	/** @type {Phaser.GameObjects.Image} */
	no_Box;
	/** @type {Phaser.GameObjects.Container} */
	addRoomConfirm_Container;
	/** @type {Phaser.GameObjects.Sprite} */
	right_arrow;
	/** @type {Phaser.GameObjects.Sprite} */
	left_arrow;
	/** @type {Phaser.GameObjects.Image} */
	yes_Box_1;
	/** @type {Phaser.GameObjects.Image} */
	no_Box_1;
	/** @type {Phaser.GameObjects.Container} */
	deleteRoomConfirm_Container;
	/** @type {Phaser.GameObjects.Image} */
	yes_Box_2;
	/** @type {Phaser.GameObjects.Image} */
	no_Box_2;
	/** @type {Phaser.GameObjects.Container} */
	addComputerConfirm_Container;
	/** @type {Phaser.GameObjects.Sprite} */
	readInfoLog_Box;
	/** @type {Phaser.GameObjects.Sprite} */
	readWarningLog_Box;
	/** @type {Phaser.GameObjects.Sprite} */
	readErrorLog_Box;
	/** @type {Phaser.GameObjects.Container} */
	chooseComputerLog_Container;

	/* START-USER-CODE */

	// Write more your code here
	create() {
		this.editorCreate();
		this.allContainers = [this.frame_addroom];

		// Array to store all containers including frame_addroom and room_containers
		this.addRoomConfirm_Container.visible = false;
		this.deleteRoomConfirm_Container.visible = false;
		this.addComputerConfirm_Container.visible = false;
		this.chooseComputerLog_Container.visible = false;

		// Handle click event for frame_addroom
		this.frame_addroom.on('pointerdown', () => {
			this.addRoomConfirm_Container.visible = true;
		});

		// Handle click event for no_Box
		this.no_Box.setInteractive();
		this.no_Box.on('pointerdown', () => {
			this.addRoomConfirm_Container.visible = false;
		});

		// Handle click event for yes_Box
		this.yes_Box.setInteractive();
		this.yes_Box.on('pointerdown', () => {
			this.addNewRoomContainer();
		});

		// Handle click event for left_arrow
		this.left_arrow.on('pointerdown', () => {
			this.shiftContainers(1); // Move all containers to the left
		});

		// Handle click event for right_arrow
		this.right_arrow.on('pointerdown', () => {
			this.shiftContainers(-1); // Move all containers to the right
		});
	}

	/**
     * Adds a new room container and updates positions.
     */
    addNewRoomContainer() {
        this.addRoomConfirm_Container.visible = false;

        // Create a new ContainerRoom
        const roomContainer = new ContainerRoom(this, 0, 360);

        // Add to the containers array and update positions
        this.children.moveBelow(roomContainer, this.addRoomConfirm_Container);
        this.children.moveBelow(roomContainer, this.deleteRoomConfirm_Container);
        this.children.moveBelow(roomContainer, this.addComputerConfirm_Container);
        this.children.moveBelow(roomContainer, this.chooseComputerLog_Container);
        this.allContainers.splice(this.allContainers.length - 1, 0, roomContainer); // Insert before frame_addroom

        this.updateContainerPositions();
    }
	
	/**
	 * Adds a computer to the specified room container.
	 */
	addComputerToRoom(roomContainer) {
		const computer = new Computer(this, 0, 0); // Adjust position as needed
		roomContainer.add(computer);
		console.log("Computer added to room!");
	}

	/**
	 * Update the positions of all containers to align side by side.
	 */
	updateContainerPositions() {
		let currentX = 483; // Starting position for the first container
		let room_counter = 1;
		this.allContainers.forEach(container => {
			if (container === this.frame_addroom) {
				container.x = currentX + 157;
				console.log('Frame Addroom updated');
				currentX += 400; // Special increment
			}
			else {
				container.x = currentX;
				console.log(`Room container ${room_counter} updated`);
				currentX += 400; // Regular increment
				room_counter += 1;
			}
		});
	}
	
	/**
	 * Shifts all containers in `this.allContainers` by a specified direction.
	 * @param {number} direction - The direction to shift (1 for left, -1 for right).
	 */
	shiftContainers(direction) {
		const shiftAmount = 400; // Distance to move each container
		this.allContainers.forEach(container => {
			container.x += direction * shiftAmount;
		});
	}
	
	/**
	 * Realigns all containers to close the gap left by a deleted container.
	 */
	realignContainersAfterDeletion() {
		let currentX = 483; // Starting position for the first container
		this.allContainers.forEach(container => {
			if (container === this.frame_addroom) {
				container.x = currentX + 157; // Keep frame_addroom slightly offset
				currentX += 400;
			} else {
				container.x = currentX;
				currentX += 400; // Regular increment
			}
		});
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
