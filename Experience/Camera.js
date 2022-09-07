import Experience from "./Experience";
import * as THREE  from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrtographicCamera();
    this.setOrbitControls()
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      40,
      this.sizes.aspect,
      0.1,
      100
    );
    this.perspectiveCamera.position.z = 4
    this.perspectiveCamera.position.y = 2,
    this.perspectiveCamera.position.x = 3,

    this.scene.add(this.perspectiveCamera)
  }

  createOrtographicCamera(){
    
    this.ortographicCamera = new THREE.OrthographicCamera(
        (-this.sizes.aspect * this.sizes.frustum)/2,
        (this.sizes.aspect * this.sizes.frustum)/2,
        this.sizes.frustum/2,
        - this.sizes.frustum/2,
        -10,
        10
      );

      this.ortographicCamera.position.y = 1
      this.ortographicCamera.position.z = 1
      this.ortographicCamera.rotation.x = -Math.PI / 4

      this.scene.add(this.ortographicCamera)

      /* this.helper = new THREE.CameraHelper(this.ortographicCamera)
      this.scene.add(this.helper) */


     


      const size = 20;
      const divisions = 20;

      /* this.gridHelper = new THREE.GridHelper(size, divisions)
      this.scene.add(this.gridHelper) */

     /*  this.axesHelper = new THREE.AxesHelper(10);
      this.scene.add(this.axesHelper) */
  }

  setOrbitControls(){
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    this.controls.enableDamping = true
    //this.controls.enableZoom = true;
  }

  resize(){
      // updating perspective camera 
      this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        // updating ortographic camera
      this.ortographicCamera.left = 
      (-this.sizes.aspect * this.sizes.frustum)/2
      this.ortographicCamera.right =
      (this.sizes.aspect * this.sizes.frustum)/2,
      this.ortographicCamera.top  =
      this.sizes.frustum/2
      this.ortographicCamera.bottom  =
      - this.sizes.frustum/2
      this.ortographicCamera.updateProjectionMatrix()

      

  }

  update(){
      //console.log(this.perspectiveCamera.position);
      this.controls.update()

      /* this.helper.matrixWorldNeedsUpdate = true
      this.helper.update()
      this.helper.position.copy(this.ortographicCamera.position)
      this.helper.rotation.copy(this.ortographicCamera.rotation) */
  }


}
