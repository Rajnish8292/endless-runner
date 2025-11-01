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

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    // Lock orbit controls for gameplay camera behavior
    controls.enablePan = false;
    controls.enableRotate = false;

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
      const box = new Ball();
      scene.add(box);
      obstacles.push(box);
    }

    // rotate plane wings
    let planePropeller = null;

    // initial camera position: place camera slightly behind and above the plane
    // so the user can easily see what's in front of the plane.
    camera.position.set(0, 7, 10); // x, y, z (behind the plane on +z)
    // look a bit ahead of the plane (along -z) so upcoming obstacles are visible
    camera.lookAt(0, 2, -20);

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
    let activeCollision = new Set();

    const animate = function () {
      // rotate plane fans
      if (!planePropeller) {
        if (plane.children[0]) {
          plane.traverse((node) => {
            if (node.name.includes("Plane012_wood001_0")) {
              planePropeller = node;
            }
          });
        }
      } else {
        planePropeller.rotation.y += 0.5;
      }

      // update every obstacle
      obstacles.forEach((obstacle) => {
        obstacle.update(obstacles);
      });

      // Make camera follow the plane horizontally and stay slightly above/behind it
      // so the player has a consistent forward view.
      if (plane) {
        // Smooth follow (simple lerp) to avoid jitter
        const followX = plane.position.x;
        const followY = plane.position.y + 3; // a bit above the plane
        const followZ = plane.position.z + 10; // behind the plane on +z

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
        plane.updateMatrixWorld(true);
        const planeBoundingBox = plane.getBoundingBox();
        obstacle.updateMatrixWorld(true);
        const obstacleBoundingBox = obstacle.getBoundingBox();
        if (planeBoundingBox.max.x != -Infinity) {
          if (planeBoundingBox.intersectsBox(obstacleBoundingBox)) {
            if (!activeCollision.has(obstacle.name)) {
              console.log(activeCollision);
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
          Collision detected : <span ref={hitCountContRef}>0</span>
        </h1>
      </div>
    </>
  );
}
