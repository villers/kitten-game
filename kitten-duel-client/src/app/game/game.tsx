'use client';
import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from './game.scene';

export const Game = ({ combatData }: any) => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: GameScene,
    };

    const game = new Phaser.Game(config);
    game.scene.start('GameScene', { combatData });

    return () => {
      game.destroy(true);
    };
  }, [combatData]);

  return <div id="game-container" />;
};
