
// You can write more code here

/* START OF COMPILED CODE */

class Alt extends Phaser.Scene {

	constructor() {
		super("Alt");

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

		// room_container
		const room_container = this.add.container(483, 360);

		// frame_room
		const frame_room = this.add.image(157, 0, "frame_room");
		frame_room.scaleX = 0.5;
		frame_room.scaleY = 0.5;
		room_container.add(frame_room);

		// add_computer
		const add_computer = this.add.sprite(0, 112, "add_computer");
		add_computer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 512, 512), Phaser.Geom.Rectangle.Contains);
		add_computer.scaleX = 0.1;
		add_computer.scaleY = 0.1;
		room_container.add(add_computer);

		// delete_room
		const delete_room = this.add.sprite(317, 102, "delete_room");
		delete_room.setInteractive(new Phaser.Geom.Rectangle(0, 0, 512, 512), Phaser.Geom.Rectangle.Contains);
		delete_room.scaleX = 0.1;
		delete_room.scaleY = 0.1;
		room_container.add(delete_room);

		// computer
		const computer = this.add.sprite(156, -30, "computer");
		computer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 512, 512), Phaser.Geom.Rectangle.Contains);
		computer.scaleX = 0.25;
		computer.scaleY = 0.25;
		computer.tintTopLeft = 16514849;
		computer.tintTopRight = 16514849;
		computer.tintBottomLeft = 16514849;
		computer.tintBottomRight = 16514849;
		room_container.add(computer);

		this.add_computer = add_computer;
		this.delete_room = delete_room;
		this.computer = computer;
		this.room_container = room_container;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	add_computer;
	/** @type {Phaser.GameObjects.Sprite} */
	delete_room;
	/** @type {Phaser.GameObjects.Sprite} */
	computer;
	/** @type {Phaser.GameObjects.Container} */
	room_container;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
