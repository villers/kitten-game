'use client';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
// @ts-ignore
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  CSS2DRenderer,
  CSS2DObject, // @ts-ignore
} from 'three/examples/jsm/renderers/CSS2DRenderer';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GameLogic } from '@/app/three/game-logic';
import PlayerName from '@/app/three/player-name';
import HealthBar from '@/app/three/health-bar';

interface GameProps {
  data: any;
}

const Game: React.FC<GameProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [attacker, setAttacker] = useState(data.attacker);
  const [defender, setDefender] = useState(data.defender);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new GLTFLoader();

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    loader.load('sprites/chat.glb', function (gltf: GLTF) {
      const cat1 = gltf.scene;
      cat1.name = 'cat1';
      cat1.position.set(-3, 0, 0);
      scene.add(cat1);

      const cat2 = gltf.scene.clone();
      cat2.name = 'cat2';
      cat2.position.set(3, 0, 0);
      scene.add(cat2);

      const planeGeometry = new THREE.PlaneGeometry(10, 10);
      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);

      //camera.position.z = 10;
      camera.position.set(0, 10, 10);
      camera.lookAt(0, 0, 0);

      const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
        TWEEN.update();
        controls.update();
      };

      animate();
      const gameLogicInstance = new GameLogic(
        scene,
        data,
        setAttacker,
        setDefender,
      );
    });
  }, [data.attacker, data.defender]);

  return (
    <div>
      <div style={{ position: 'absolute', top: 10, left: 10, width: '49%' }}>
        <PlayerName name={attacker.name} position="left" />
        <HealthBar hp={attacker.hp} maxHp={attacker.maxHp} position="left" />
      </div>
      <div style={{ position: 'absolute', top: 10, right: 10, width: '49%' }}>
        <PlayerName name={defender.name} position="right" />
        <HealthBar hp={defender.hp} maxHp={defender.maxHp} position="right" />
      </div>
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Game;
