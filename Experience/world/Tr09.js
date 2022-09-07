import * as THREE from "three";
import Experience from "../Experience";

import GSAP from "gsap";

export default class Tr09 {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.tr = this.resources.items.tr;
    this.actualTr = this.tr.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualTr.children.forEach((child) => {
      child.children.castShadow = true;
      child.children.receiveShadow = true;

      /* if(child instanceof THREE.Group){
          child.children.forEach(groupChild => {
            groupChild.castShadow = true
           groupChild.receiveShadow = true
           console.log('group',groupChild);
          })
      } */
    });

    this.scene.add(this.actualTr);
    this.actualTr.scale.set(0.07, 0.07, 0.07);
    this.actualTr.position.set(0, 0, 0);

    // this.actualTr.scale.set(0,0,0)

    this.plane1 = new THREE.PlaneBufferGeometry(5, 5);
    this.plane1material = new THREE.MeshStandardMaterial({ color: 0x52504f });
    this.planeIntro = new THREE.Mesh(this.plane1, this.plane1material);
    this.planeIntro.position.z = 1.2;
    this.scene.add(this.planeIntro);


  }

  setAnimation() {}

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.3;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualTr.rotation.y = this.lerp.current * 0.4;
  }
}
