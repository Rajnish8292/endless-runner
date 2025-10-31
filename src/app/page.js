"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Ground from "./3dObjects/ground/ground";
import Plane from "./3dObjects/plane/plane";
import Box from "./3dObjects/box/box";
import Ball from "./3dObjects/ball/Ball";

export default function Home() {
  const hitCountRef = useRef(0);
  const hitCountContRef = useRef(null);
  useEffect(() => {
    // Basic Three.js setup
    const scene = new THREE.Scene();

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
    scene.add(sun);

    const ambientLight = new THREE.AmbientLight(0xcdc1c5, 0.9);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 3, 5);
    // spotLight.map = new THREE.TextureLoader().load(url);

    // spotLight.castShadow = true;

    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;

    // spotLight.shadow.camera.near = 500;
    // spotLight.shadow.camera.far = 4000;
    // spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);

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
      // const box = new Box();
      const box = new Ball();
      box.name = `obstacle-${i + 1}`;
      scene.add(box);
      obstacles.push(box);
    }

    // rotate plane wings
    let planeWing = null;

    // camera position
    camera.position.set(0, 4, 6);
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

    // keep track of previously collided obstacle
    let prevcollidedObstacle = null;

    const animate = function () {
      // rotate plane fans
      // if (!planeWing) {
      //   if (plane.children[0]) {
      //     plane.traverse((node) => {
      //       if (node.isObject3D && node.name == "Plane003") {
      //         planeWing = node;
      //       }
      //     });
      //   }
      // } else {
      //   planeWing.rotation.z += 0.05;
      // }

      // update every obstacle
      obstacles.forEach((obstacle) => {
        obstacle.update();
      });

      // if key a pressed move to left
      if (keys.a.pressed) {
        plane.rotateLeft();
        ground.moveLeft();
        obstacles.forEach((obstacle) => {
          obstacle.moveLeft();
        });
      } else if (keys.d.pressed) {
        // if key d presses move to right
        plane.rotateRight();
        ground.moveRight();
        obstacles.forEach((obstacle) => {
          obstacle.moveRight();
        });
      }

      // udpate plane and ground with every frame
      plane.update();
      ground.update();

      // check for collision between plane and obstacles
      obstacles.forEach((obstacle) => {
        const planeBoundingBox = plane.getBoundingBox();
        const obstacleBoundingBox = obstacle.getBoundingBox();
        if (planeBoundingBox.max.x != -Infinity) {
          if (planeBoundingBox.intersectsBox(obstacleBoundingBox)) {
            // setHitCount(hitCount + 1);
            if (
              !prevcollidedObstacle ||
              prevcollidedObstacle.name != obstacle.name
            ) {
              console.log(prevcollidedObstacle?.name, obstacle.name);
              hitCountRef.current++;
              hitCountContRef.current.innerHTML = hitCountRef.current;
              prevcollidedObstacle = obstacle;
            }
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
  return (
    <>
      <div style={{ position: "fixed", top: "50px", right: "50px" }}>
        <h1 ref={hitCountContRef}>0</h1>
      </div>
    </>
  );
}
