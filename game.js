window.onload = function(){
    var config = {
        width: 1280,
        height: 720,
        backgroundColor: 0xff0000,
        scene: [preload, mainscene]
    }

    var game = new Phaser.Game(config);
}