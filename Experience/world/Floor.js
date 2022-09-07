import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneBufferGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x52504f ,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -3;
    this.plane.receiveShadow = true;
  }

  setCircles() {
    this.geometry = new THREE.CircleGeometry(5, 64);
    this.material1 = new THREE.MeshBasicMaterial({
       color: 0x52504f,
      side: THREE.DoubleSide });
    this.material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.circle1 = new THREE.Mesh(this.geometry, this.material1);
    this.circle2 = new THREE.Mesh(this.geometry, this.material2);
    this.circle1.position.y = -2
    //this.circle1.scale.set(0,0,0)
    this.circle1.rotation.x = this.circle2.rotation.x = Math.PI / 2;
    this.circle1.receiveShadow = this.circle2.receiveShadow = true
    //this.scene.add(this.circle1);
    //this.scene.add(this.circle2);

  }

  resize() {}

  update() {}
}
