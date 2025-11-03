"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Ground from "./3dObjects/ground/ground";
import Plane from "./3dObjects/plane/plane";

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
  ObstacleGroup10,
} from "./3dObjects/obstacleGroup/obstacleGroups";
import Booster from "./3dObjects/booster/booster";
import Area from "./3dObjects/area/area1";
import PlayAgain from "./components/ui/playAgain/PlayAgain";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [collisionCount, setCollisionCount] = useState(0);
  const [restartGame, setRestartGame] = useState(() => () => {});
  const gameSetting = useRef({
    isPaused: false,
    isEnd: false,
  });
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

    const ambientLight = new THREE.AmbientLight(0xcdc1c5, 0.9);
    scene.add(ambientLight);

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // fog
    const fog = new THREE.FogExp2(0xffffff, 0.003);
    scene.fog = fog;

    // ground
    const ground = new Ground();
    scene.add(ground);

    // plane model
    const plane = new Plane();
    scene.add(plane);

    // obstacle areas
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
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
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
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
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
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
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
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
    ];
    const group5 = [
      new ObstacleGroup7(),
      new ObstacleGroup7(),
      new ObstacleGroup8(),
      new ObstacleGroup7(),
      new ObstacleGroup7(),
      new ObstacleGroup8(),
      new ObstacleGroup8(),
      new ObstacleGroup8(),
      new ObstacleGroup8(),
      new ObstacleGroup7(),
      new ObstacleGroup7(),
      new ObstacleGroup7(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
      new Booster(),
    ];
    const areas = [
      new Area(group1),
      new Area(group2),
      new Area(group3),
      new Area(group4),
      new Area(group5),
    ];

    // const boundingSphere = [];
    // areas.forEach((area) => {
    //   area.groups.forEach((group) => {
    //     const sphere = new THREE.Mesh(
    //       new THREE.SphereGeometry(
    //         Math.max(group.width, group.depth, group.height) / 2,
    //         32,
    //         32
    //       ),
    //       new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    //     );
    //     area.add(sphere);
    //     sphere.position.set(
    //       group.position.x,
    //       group.position.y,
    //       group.position.z
    //     );
    //   });
    // });

    // const sphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(5, 32, 32),
    //   new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    // );

    // sphere.position.set(plane.position.x, plane.position.y, plane.position.z);
    // scene.add(sphere);

    areas.forEach((area, index) => {
      area.position.z = -(index + 1) * 100;
      scene.add(area);
    });

    // explosion
    let explosionPower = 1.07;
    let isExlpoding = false;
    const particleCount = 20;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 2 - 1;
      positions[i * 3 + 1] = Math.random() * 2 - 1;
      positions[i * 3 + 2] = Math.random() * 2 - 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const pMaterial = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 1,
      opacity: 0.1,
    });

    const particles = new THREE.Points(particleGeometry, pMaterial);
    particles.position.set(
      plane.position.x,
      plane.position.y,
      plane.position.z
    );
    scene.add(particles);
    particles.visible = false;

    function explode(type) {
      const positions = particleGeometry.getAttribute("position").array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = -0.2 + Math.random() * 0.4; // x
        positions[i * 3 + 1] = -0.2 + Math.random() * 0.4; // y
        positions[i * 3 + 2] = -0.2 + Math.random() * 0.4; // z
      }

      particleGeometry.getAttribute("position").needsUpdate = true;

      explosionPower = 1.25;
      particles.visible = true;
    }

    function doExplosionLogic() {
      if (!particles.visible) return;

      const positionAttr = particleGeometry.getAttribute("position");
      const positions = positionAttr.array;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] *= explosionPower;
        positions[i * 3 + 1] *= explosionPower;
        positions[i * 3 + 2] *= explosionPower;
      }

      positionAttr.needsUpdate = true;

      if (explosionPower > 1.005) {
        explosionPower -= 0.001;
      } else {
        particles.visible = false;
      }
    }

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

    // restart game function
    let restartGame = () => {
      // reset game enviroment
      ground.speed = 0.048;
      areas.forEach((area) => {
        area.speed = 1;
      });
      plane.propellerRotationSpeed = 0.5;
      sun.position.y = 500;

      gameSetting.current.isEnd = false;
      // reset z position of areas
      areas.forEach((area, index) => {
        area.position.z = -(index + 1) * 100;

        area.groups.forEach((group) => {
          group.isCollided = false;
        });
      });

      // reset isCollided prop of every group

      setCollisionCount(0);
      animate();
    };
    setRestartGame(() => restartGame);

    const animate = function () {
      if (gameSetting.current.isEnd || gameSetting.current.isPaused) return;

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
        areas.forEach((area) => {
          area.moveLeft();
        });
      } else if (keys.d.pressed) {
        // if key d presses move to right
        plane.rotateRight();
        ground.moveRight();
        areas.forEach((area) => {
          area.moveRight();
        });
      } else if (keys.w.pressed) {
        plane.rotateUp();
        plane.moveUp();
        plane.flapsUp();
      } else if (keys.s.pressed) {
        plane.rotateDown();
        plane.moveDown();
        plane.flapsDown();
      }

      if (!keys.w.pressed && !keys.s.pressed) {
        plane.rotateXNormal();
        plane.flapsNormal();
      }

      // reduce the velocity as sun goes down
      ground.speed -= 0.00002;
      plane.propellerRotationSpeed -= 0.00015;
      areas.forEach((area) => {
        area.speed -= 0.0005;
      });
      areas.forEach((area) => {
        area.update();
      });
      if (ground.speed != 0) fog.density += 0.000001;

      //update different component of game
      plane.rotatePropeller();
      sun.update();
      plane.update();
      ground.update();

      // check for collision using bounding sphere
      const planePos = new THREE.Vector3();
      plane.getWorldPosition(planePos);

      if (isExlpoding) doExplosionLogic();

      areas.forEach((area) => {
        area.groups.forEach((group) => {
          if (!group.isCollided) {
            const groupPos = new THREE.Vector3();
            group.getWorldPosition(groupPos);

            const planeRadius = 4;
            const groupRadius =
              Math.max(group.height, group.width, group.depth) / 2;

            const distance = planePos.distanceTo(groupPos);

            if (distance <= planeRadius + groupRadius) {
              group.isCollided = true;

              // trigger exploding animation
              isExlpoding = true;
              explode();

              // if collided object is booster then reset the velocity of ground, obstacles and areas and reset y position of sun
              if (group.name == "booster") {
                ground.speed = 0.048;
                areas.forEach((area) => {
                  area.speed = 1;
                });
                plane.propellerRotationSpeed = 0.5;
                sun.position.y = 500;
              } else {
                setCollisionCount((prev) => {
                  if (prev >= 3) gameSetting.current.isEnd = true;
                  return prev + 1;
                });
              }
            }
          }
        });
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
      <div
        style={{
          position: "fixed",
          top: "50px",
          right: "50px",
          fontSize: "2rem",
        }}
      >
        <p>Lives Left : {Math.max(0, 3 - collisionCount)}</p>
      </div>
      <AnimatePresence>
        {collisionCount >= 4 && <PlayAgain restartGame={restartGame} />}
      </AnimatePresence>
    </>
  );
}
