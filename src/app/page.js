"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Ground from "./3dObjects/ground/ground";
import Plane from "./3dObjects/plane/plane";
import Box from "./3dObjects/box/box";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import Obstacle from "./3dObjects/obstacle/obstacle";
export default function Home() {
  useEffect(() => {
    // Basic Three.js setup
    const scene = new THREE.Scene();
    // new RGBELoader().load(
    //   "/texture/enviroment/bloem_field_sunrise_4k.hdr",
    //   (env) => {
    //     env.mapping = THREE.EquirectangularReflectionMapping;
    //     scene.environment = env;
    //   }
    // );
    // scene.environmentIntensity = 0.1;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xfffafa);

    document.body.appendChild(renderer.domElement);

    // lights
    var hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, 0.9);
    scene.add(hemisphereLight);
    const sun = new THREE.DirectionalLight(0xcdc1c5, 0.9);
    sun.position.set(8, 2, -7);
    // const directionalLight = new THREE.DirectionalLight(0xcdc1c5, 0.9);
    // directionalLight.position.set(0, 2, 0);
    // scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xcdc1c5, 0.9);
    scene.add(ambientLight);
    scene.add(sun);

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // fog
    const fog = new THREE.FogExp2(0xffffff, 0.03);
    scene.fog = fog;

    // ground
    const ground = new Ground();
    scene.add(ground);

    // plane model
    const plane = new Plane();
    scene.add(plane);

    // obstacles
    const obstacles = [];
    for (let i = 0; i < 10; i++) {
      const box = new Box();
      scene.add(box);
      obstacles.push(box);
    }

    // camera position
    camera.position.set(0, 2.75, 6);
    camera.lookAt(0, 0, 0);

    // key press events
    const keys = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };

    const keydownHandler = (event) => {
      switch (event.code) {
        case "KeyA":
          keys.a.pressed = true;
          break;
        case "KeyD":
          keys.d.pressed = true;
          break;
      }
    };
    const keyupHandler = (event) => {
      switch (event.code) {
        case "KeyA":
          keys.a.pressed = false;
          break;
        case "KeyD":
          keys.d.pressed = false;
          break;
      }
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    const animate = function () {
      obstacles.forEach((obstacle) => {
        obstacle.update();
      });
      if (keys.a.pressed) {
        plane.rotateLeft();
        ground.moveLeft();
        obstacles.forEach((obstacle) => {
          obstacle.moveLeft();
        });
      } else if (keys.d.pressed) {
        plane.rotateRight();
        ground.moveRight();
        obstacles.forEach((obstacle) => {
          obstacle.moveRight();
        });
      }

      plane.update();
      ground.update();

      obstacles.forEach((obstacle) => {
        const planeBoundingBox = plane.getBoundingBox();
        const obstacleBoundingBox = obstacle.getBoundingBox();
        if (planeBoundingBox.max.x != -Infinity) {
          if (planeBoundingBox.intersectsBox(obstacleBoundingBox)) {
          }
        }
      });

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  });
  return <></>;
}
