import * as THREE from "three";

class Obstacle extends THREE.Group {
  constructor(speed = 1) {
    super();
    this.speed = speed;
    this.isCollided = false;
  }
}
export default Obstacle;
