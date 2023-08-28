'use client';
import Image from 'next/image';
import styles from './page.module.css';
import React from 'react';
import { Game } from '@/app/game/game';

const combatData = {
  attacker: {
    id: '1',
    name: 'Moka',
    hp: 10,
    maxHp: 10,
    strength: 1,
    dexterity: 1,
    vitality: 1,
    luck: 1,
    agility: 1,
    level: 1,
    xp: 0,
  },
  defender: {
    id: '2',
    name: 'Obrigada',
    hp: 10,
    maxHp: 10,
    strength: 1,
    dexterity: 1,
    vitality: 1,
    luck: 1,
    agility: 1,
    level: 1,
    xp: 0,
  },
  winner: {
    id: '2',
    name: 'Obrigada',
    hp: 9.3,
    maxHp: 10,
    strength: 1.9000000000000001,
    dexterity: 1,
    vitality: 1,
    luck: 1,
    agility: 1,
    level: 1,
    xp: 0,
  },
  looser: {
    id: '1',
    name: 'Moka',
    hp: 0,
    maxHp: 10,
    strength: 3.5700000000000003,
    dexterity: 1,
    vitality: 1,
    luck: 1,
    agility: 1,
    level: 1,
    xp: 0,
  },
  expGained: 100,
  steps: [
    {
      action: 'protectivePurr',
      attacker: {
        id: '2',
        name: 'Obrigada',
        hp: 10,
        maxHp: 10,
        strength: 1.3,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '1',
        name: 'Moka',
        hp: 10,
        maxHp: 10,
        strength: 1,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 0,
      healAmount: 0,
      description:
        'Ronronnement protecteur! La défense est renforcée pendant 3 tours.',
    },
    {
      action: 'attaque',
      attacker: {
        id: '1',
        name: 'Moka',
        hp: 10,
        maxHp: 10,
        strength: 1,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 1.3,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 0.7,
      healAmount: 0,
      description: 'Attaque réussie!',
    },
    {
      action: 'furySwipe',
      attacker: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 1.3,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '1',
        name: 'Moka',
        hp: 7.27,
        maxHp: 10,
        strength: 1,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 2.73,
      healAmount: 0,
      description: 'Attaque rapide! Dégâts infligés avec succès.',
    },
    {
      action: 'protectivePurr',
      attacker: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 1.6,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '1',
        name: 'Moka',
        hp: 7.27,
        maxHp: 10,
        strength: 1,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 0,
      healAmount: 0,
      description:
        'Ronronnement protecteur! La défense est renforcée pendant 3 tours.',
    },
    {
      action: 'sharpClaws',
      attacker: {
        id: '1',
        name: 'Moka',
        hp: 7.27,
        maxHp: 10,
        strength: 2,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 1.6,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 0,
      healAmount: 0,
      description: 'Griffes acérées! Augmentation des dégâts pendant 3 tours.',
    },
    {
      action: 'furySwipe',
      attacker: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 1.6,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '1',
        name: 'Moka',
        hp: 3.9099999999999993,
        maxHp: 10,
        strength: 2,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 3.3600000000000003,
      healAmount: 0,
      description: 'Attaque rapide! Dégâts infligés avec succès.',
    },
    {
      action: 'protectivePurr',
      attacker: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 2.2,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '1',
        name: 'Moka',
        hp: 3.9099999999999993,
        maxHp: 10,
        strength: 2,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 0,
      healAmount: 0,
      description:
        'Ronronnement protecteur! La défense est renforcée pendant 3 tours.',
    },
    {
      action: 'sharpClaws',
      attacker: {
        id: '1',
        name: 'Moka',
        hp: 3.9099999999999993,
        maxHp: 10,
        strength: 4,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 2.2,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 0,
      healAmount: 0,
      description: 'Griffes acérées! Augmentation des dégâts pendant 3 tours.',
    },
    {
      action: 'furySwipe',
      attacker: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 1.9000000000000001,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '1',
        name: 'Moka',
        hp: 0,
        maxHp: 10,
        strength: 4,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 3.9899999999999998,
      healAmount: 0,
      description: 'Attaque rapide! Dégâts infligés avec succès.',
    },
    {
      action: 'protectivePurr',
      attacker: {
        id: '1',
        name: 'Moka',
        hp: 0,
        maxHp: 10,
        strength: 4.57,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      defender: {
        id: '2',
        name: 'Obrigada',
        hp: 9.3,
        maxHp: 10,
        strength: 1.9000000000000001,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        agility: 1,
        level: 1,
        xp: 0,
      },
      damageDealt: 0,
      healAmount: 0,
      description:
        'Ronronnement protecteur! La défense est renforcée pendant 3 tours.',
    },
  ],
};

export default function Home() {
  return (
    <>
      <Game combatData={combatData} />
    </>
  );
}
