"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Ground from "./3dObjects/ground/ground";
import Plane from "./3dObjects/plane/plane";
import Box from "./3dObjects/box/box";
import Ball from "./3dObjects/ball/Ball";
import Sun from "./3dObjects/sun/sun";
import {
  ObstacleGroup1,
  ObstacleGroup2,
  ObstacleGroup3,
  ObstacleGroup4,
  ObstacleGroup5,
  ObstacleGroup6,
  ObstacleGroup7,
  ObstacleGroup8,
  ObstacleGroup9,
  ObstacleGroup10,
} from "./3dObjects/obstacleGroup/obstacleGroups";
import Area from "./3dObjects/area/area1";

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
    renderer.setClearColor(0xffffff);

    document.body.appendChild(renderer.domElement);

    //sun
    const sun = new Sun();
    scene.add(sun);
    // lights
    // var hemisphereLight = new THREE.HemisphereLight(0xffff88, 0x000000, 0.9);
    // scene.add(hemisphereLight);
    // const sun = new THREE.DirectionalLight(0xcdc1c5, 0.9);
    // sun.position.set(8, 2, -7);
    // scene.add(sun);
    // const highlight = new THREE.DirectionalLight(0xffffff, 0.5);
    // highlight.position.set(10, 10, 10);
    // scene.add(highlight);

    const ambientLight = new THREE.AmbientLight(0xcdc1c5, 0.9);
    scene.add(ambientLight);

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    // Lock orbit controls for gameplay camera behavior
    // controls.enablePan = false;
    // controls.enableRotate = false;

    // fog
    const fog = new THREE.FogExp2(0xffffff, 0.003);
    // const fog = new THREE.Fog(0xffffff, 90, 100);
    scene.fog = fog;

    // ground
    const ground = new Ground();
    scene.add(ground);

    // plane model
    const plane = new Plane();
    scene.add(plane);

    // obstacles
    const obstacles = [];
    // for (let i = 0; i < 10; i++) {
    //   const box = new Ball();
    //   scene.add(box);
    //   obstacles.push(box);
    // }

    // const g = new ObstacleGroup9();
    // scene.add(g);
    // g.position.z = -50;
    // let speed
    const group1 = [
      new ObstacleGroup1(),
      new ObstacleGroup2(),
      new ObstacleGroup3(),
      new ObstacleGroup1(),
      new ObstacleGroup2(),
      new ObstacleGroup3(),
      new ObstacleGroup3(),
      new ObstacleGroup3(),
      new ObstacleGroup3(),
      new ObstacleGroup2(),
      new ObstacleGroup2(),
      new ObstacleGroup2(),
    ];
    const group2 = [
      new ObstacleGroup4(),
      new ObstacleGroup4(),
      new ObstacleGroup3(),
      new ObstacleGroup4(),
      new ObstacleGroup4(),
      new ObstacleGroup3(),
      new ObstacleGroup3(),
      new ObstacleGroup3(),
      new ObstacleGroup3(),
      new ObstacleGroup4(),
      new ObstacleGroup4(),
      new ObstacleGroup4(),
    ];
    const group3 = [
      new ObstacleGroup5(),
      new ObstacleGroup5(),
      new ObstacleGroup4(),
      new ObstacleGroup5(),
      new ObstacleGroup5(),
      new ObstacleGroup4(),
      new ObstacleGroup4(),
      new ObstacleGroup4(),
      new ObstacleGroup4(),
      new ObstacleGroup5(),
      new ObstacleGroup5(),
      new ObstacleGroup5(),
    ];

    const group4 = [
      new ObstacleGroup6(),
      new ObstacleGroup6(),
      new ObstacleGroup10(),
      new ObstacleGroup6(),
      new ObstacleGroup6(),
      new ObstacleGroup10(),
      new ObstacleGroup10(),
      new ObstacleGroup10(),
      new ObstacleGroup10(),
      new ObstacleGroup6(),
      new ObstacleGroup6(),
      new ObstacleGroup6(),
    ];
    // const area1 = new Area(group1);
    // scene.add(area1);
    // area1.position.z = -400;
    // const area2 = new Area(group2);
    // scene.add(area2);
    // area2.position.z = -300;
    // const area3 = new Area(group3);
    // scene.add(area3);
    // area3.position.z = -200;
    // const area4 = new Area(group4);
    // scene.add(area4);
    // area3.position.z = -100;
    const areas = [
      new Area(group1),
      new Area(group2),
      new Area(group3),
      new Area(group4),
    ];

    areas.forEach((area, index) => {
      area.position.z = -(index + 1) * 100;
      scene.add(area);
    });

    // rotate plane wings
    let planePropeller = null;

    camera.position.set(0, 7, 10);
    camera.lookAt(0, 2, -20);

    // key press events
    const keys = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
      s: {
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
        case "KeyW":
          keys.w.pressed = true;
          break;
        case "KeyS":
          keys.s.pressed = true;
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
        case "KeyW":
          keys.w.pressed = false;
          break;
        case "KeyS":
          keys.s.pressed = false;
      }
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    // keep track of previously collided obstacle
    let activeCollision = new Set();

    const animate = function () {
      // rotate plane fans
      plane.rotatePropeller();
      // update every obstacle
      obstacles.forEach((obstacle) => {
        obstacle.update(obstacles);
      });

      // Make camera follow the plane horizontally and stay slightly above/behind it
      if (plane) {
        const followX = plane.position.x;
        const followY = plane.position.y + 3;
        const followZ = plane.position.z + 10;

        camera.position.x += (followX - camera.position.x) * 0.1;
        camera.position.y += (followY - camera.position.y) * 0.1;
        camera.position.z += (followZ - camera.position.z) * 0.1;

        // Look ahead of the plane so obstacles coming from -z are visible
        const lookAtZ = plane.position.z - 30;
        camera.lookAt(plane.position.x, plane.position.y, lookAtZ);
      }

      // if key a pressed move to left
      if (keys.a.pressed) {
        plane.rotateLeft();
        ground.moveLeft();
        obstacles.forEach((obstacle) => {
          obstacle.moveLeft();
        });
        areas.forEach((area) => {
          area.moveLeft();
        });
      } else if (keys.d.pressed) {
        // if key d presses move to right
        plane.rotateRight();
        ground.moveRight();
        obstacles.forEach((obstacle) => {
          obstacle.moveRight();
        });
        areas.forEach((area) => {
          area.moveRight();
        });
      } else if (keys.w.pressed) {
        plane.rotateUp();
        plane.moveUp();
      } else if (keys.s.pressed) {
        plane.rotateDown();
        plane.moveDown();
      }

      if (!keys.w.pressed) {
        plane.rotateXNormal();
      } else if (!keys.s.pressed) {
        plane.rotateXNormal();
      }

      // udpate plane and ground with every frame
      ground.speed -= 0.00002;
      plane.propellerRotationSpeed -= 0.00015;
      areas.forEach((area) => {
        area.speed -= 0.0005;
      });
      areas.forEach((area) => {
        area.update();
      });
      if (ground.speed != 0) fog.density += 0.000001;

      sun.update();
      plane.update();
      ground.update();

      // check for collision between plane and obstacles

      obstacles.forEach((obstacle) => {
        plane.updateMatrixWorld(true);
        const planeBoundingBox = plane.getBoundingBox();
        obstacle.updateMatrixWorld(true);
        const obstacleBoundingBox = obstacle.getBoundingBox();
        if (planeBoundingBox.max.x != -Infinity) {
          if (planeBoundingBox.intersectsBox(obstacleBoundingBox)) {
            if (!activeCollision.has(obstacle.name)) {
              hitCountRef.current++;
              hitCountContRef.current.innerHTML = hitCountRef.current;
              activeCollision.add(obstacle.name);
            }
          }
        } else {
          // Remove obstacles that are no longer colliding
          if (activeCollision.has(obstacle.name)) {
            activeCollision.delete(obstacle.name);
          }
        }

        // console.log(activeCollision);
      });

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <>
      <div style={{ position: "fixed", top: "50px", right: "50px" }}>
        <h1>
          <span ref={hitCountContRef}></span>
        </h1>
      </div>
    </>
  );
}
