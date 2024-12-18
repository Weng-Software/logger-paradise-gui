import Phaser from 'phaser';
import preload from './preload.js';
import mainscene from './mainscene.js';

export function createGame(containerId) {
  const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: containerId,
    scene: [preload,mainscene]
  };

  return new Phaser.Game(config);
}