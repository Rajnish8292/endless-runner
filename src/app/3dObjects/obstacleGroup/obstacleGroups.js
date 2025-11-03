import * as THREE from "three";
import Obstacle from "../obstacle/obstacle";

const createMesh = (geometry, material) => {
  return new THREE.Mesh(geometry, material);
};

const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

class ObstacleGroup1 extends Obstacle {
  constructor() {
    super();

    const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
    const boxMesh = new THREE.Mesh(boxGeometry, material);

    const sphereGeometry = new THREE.SphereGeometry(10);
    const sphereMesh = new THREE.Mesh(sphereGeometry, material);

    const centerOffset = new THREE.Vector3(10.2, 7.8, 0);

    boxMesh.position.set(0, 8, 0).sub(centerOffset);
    sphereMesh.position.set(20.4, 7.6, 0).sub(centerOffset);

    this.add(boxMesh);
    this.add(sphereMesh);

    this.width = 40.4;
    this.height = 20.4;
    this.depth = 20.0;

    this.name = "obstacle_group1";

    this.position.set(0, 8, 0);
  }
}

class ObstacleGroup2 extends Obstacle {
  constructor() {
    super();

    const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    const cube1 = createMesh(cubeGeometry, material);
    const cube2 = createMesh(cubeGeometry, material);

    const centerOffset = new THREE.Vector3(5, 0, -2.5 * 2);

    cube1.position.set(0, 0, 0).sub(centerOffset);
    cube2.position.set(10, 0, -5).sub(centerOffset);

    this.add(cube1);
    this.add(cube2);

    this.width = 20.0;
    this.height = 10.0;
    this.depth = 15.0;

    this.name = "obstacle_group2";

    this.position.set(0, 5, 0);
  }
}

class ObstacleGroup3 extends Obstacle {
  constructor() {
    super();

    const cylinderGeometry1 = new THREE.CylinderGeometry(5, 5, 20, 10);
    const cylinderGeometry2 = new THREE.CylinderGeometry(5, 5, 12, 10);

    const cylinder1 = createMesh(cylinderGeometry1, material);
    const cylinder2 = createMesh(cylinderGeometry2, material);
    const cylinder3 = createMesh(cylinderGeometry1, material);
    const cylinder4 = createMesh(cylinderGeometry1, material);

    const centerOffset = new THREE.Vector3(8, 0, -4.6);

    cylinder1.position.set(0, 0, 0).sub(centerOffset);
    cylinder2.position.set(9.2, -5, 0).sub(centerOffset);
    cylinder3.position.set(16, 0, 0).sub(centerOffset);
    cylinder4.position.set(9.2, 0, -9.2).sub(centerOffset);

    this.add(cylinder1, cylinder2, cylinder3, cylinder4);

    this.width = 26.0;
    this.height = 20.0;
    this.depth = 19.2;

    this.name = "obstacle_group3";

    this.position.set(0, 8, 0);
  }
}

class ObstacleGroup4 extends Obstacle {
  constructor() {
    super();

    const bigConeGeometry = new THREE.ConeGeometry(5, 20, 10);
    const smallConeGeometry = new THREE.ConeGeometry(5, 10, 10);

    const cone1 = createMesh(bigConeGeometry, material);
    const cone2 = createMesh(smallConeGeometry, material);
    const cone3 = createMesh(smallConeGeometry, material);
    const cone4 = createMesh(bigConeGeometry, material);
    const cone5 = createMesh(smallConeGeometry, material);
    const cone6 = createMesh(smallConeGeometry, material);
    const cone7 = createMesh(smallConeGeometry, material);
    const cone8 = createMesh(smallConeGeometry, material);

    const centerOffset = new THREE.Vector3(7.5, 7.5, -2.5);

    cone1.position.set(0, 10, 0).sub(centerOffset);
    cone2.position.set(5, 5, 0).sub(centerOffset);
    cone3.position.set(10, 5, 0).sub(centerOffset);
    cone4.position.set(15, 10, 0).sub(centerOffset);
    cone5.position.set(0, 5, -5).sub(centerOffset);
    cone6.position.set(5, 5, -5).sub(centerOffset);
    cone7.position.set(10, 5, -5).sub(centerOffset);
    cone8.position.set(15, 5, -5).sub(centerOffset);

    this.add(cone1, cone2, cone3, cone4, cone5, cone6, cone7, cone8);

    this.width = 25.0;
    this.height = 20.0;
    this.depth = 15.0;

    this.name = "obstacle_group4";

    this.position.set(0, 5.4, 0);
  }
}

class ObstacleGroup5 extends Obstacle {
  constructor() {
    super();
    const radius = 5;
    const sphereGeometry = new THREE.SphereGeometry(radius);

    const sphere1 = createMesh(sphereGeometry, material);
    const sphere2 = createMesh(sphereGeometry, material);
    const sphere3 = createMesh(sphereGeometry, material);
    const sphere4 = createMesh(sphereGeometry, material);

    sphere1.position.set(-radius, 0, -radius);
    sphere2.position.set(radius, 0, -radius);
    sphere3.position.set(-radius, 0, radius);
    sphere4.position.set(radius, 0, radius);

    this.add(sphere1, sphere2, sphere3, sphere4);
    this.position.set(0, radius, 0);

    this.width = 20;
    this.depth = 20;
    this.height = 10;

    this.name = "obstacle_group5";
  }
}

class ObstacleGroup6 extends Obstacle {
  constructor() {
    super();
    const radius = 6;
    const sphereGeometry = new THREE.SphereGeometry(radius);

    const sphere1 = createMesh(sphereGeometry, material);
    const sphere2 = createMesh(sphereGeometry, material);
    const sphere3 = createMesh(sphereGeometry, material);

    const centerOffset = new THREE.Vector3(radius, radius, 0);

    sphere1.position.set(0, radius, 0).sub(centerOffset);
    sphere2.position.set(2 * radius, radius, 0).sub(centerOffset);
    sphere3.position.set(radius, 2 * radius, 0).sub(centerOffset);

    this.add(sphere1, sphere2, sphere3);

    this.width = 4 * radius;
    this.height = 4 * radius;
    this.depth = 2 * radius;

    this.name = "obstacle_group6";

    this.position.set(0, 6, 0);
  }
}

class ObstacleGroup7 extends Obstacle {
  constructor() {
    super();
    const boxGeometry = new THREE.BoxGeometry(8, 16, 8);

    const box1 = createMesh(boxGeometry, material);
    const box2 = createMesh(boxGeometry, material);

    const centerOffset = new THREE.Vector3(4, 8, 0);

    box1.position.set(0, 8, 0).sub(centerOffset);
    box2.position.set(8, 8, 0).sub(centerOffset);

    this.add(box1, box2);

    this.width = 12;
    this.height = 16;
    this.depth = 8;

    this.name = "obstacle_group7";

    this.position.set(0, 8, 0);
  }
}

class ObstacleGroup8 extends Obstacle {
  constructor() {
    super();
    const cylinderGeometry = new THREE.CylinderGeometry(3, 3, 10, 12);

    const cyl1 = createMesh(cylinderGeometry, material);
    const cyl2 = createMesh(cylinderGeometry, material);
    const cyl3 = createMesh(cylinderGeometry, material);
    const cyl4 = createMesh(cylinderGeometry, material);

    const a = 6;
    const centerOffset = new THREE.Vector3(a, 5, a);

    cyl1.position.set(0, 5, 0).sub(centerOffset);
    cyl2.position.set(2 * a, 5, 0).sub(centerOffset);
    cyl3.position.set(0, 5, 2 * a).sub(centerOffset);
    cyl4.position.set(2 * a, 5, 2 * a).sub(centerOffset);

    this.add(cyl1, cyl2, cyl3, cyl4);

    this.width = 2 * a;
    this.height = 10;
    this.depth = 2 * a;

    this.name = "obstacle_group8";

    this.position.set(0, 5, 0);
  }
}

class ObstacleGroup9 extends Obstacle {
  constructor() {
    super();

    const tetraGeometry = new THREE.TetrahedronGeometry(6);

    const tetra = createMesh(tetraGeometry, material);

    tetra.position.set(0, 6, 0);

    this.add(tetra);

    this.width = 12;
    this.height = 12;
    this.depth = 12;

    this.name = "obstacle_group9";

    this.position.set(0, 6, 0);
  }
}

class ObstacleGroup10 extends Obstacle {
  constructor() {
    super();
    const coneGeometry = new THREE.ConeGeometry(4, 12, 8);

    const cone1 = createMesh(coneGeometry, material);
    const cone2 = createMesh(coneGeometry, material);
    const cone3 = createMesh(coneGeometry, material);

    const centerOffset = new THREE.Vector3(8, 6, 0);

    cone1.position.set(0, 6, 0).sub(centerOffset);
    cone2.position.set(8, 6, 0).sub(centerOffset);
    cone3.position.set(16, 6, 0).sub(centerOffset);

    this.add(cone1, cone2, cone3);

    this.width = 16;
    this.height = 12;
    this.depth = 8;

    this.name = "obstacle_group10";

    this.position.set(0, 6, 0);
  }
}

export {
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
};
