import Experience from "./Experience";
import * as THREE  from "three"

export default class Renderer{
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera 

    this.setRenderer()
  
  }

  setRenderer(){
      this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true
      });

      this.renderer.physicallyCorrectLights = true;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.CineonToneMapping;
      this.renderer.toneMappingExposure = 1.2;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setSize(this.sizes.width, this.sizes.heigth);
      this.renderer.setPixelRatio(this.sizes.pixelRatio)
}

  resize(){
    this.renderer.setSize(this.sizes.width, this.sizes.heigth);
    this.renderer.setPixelRatio(this.sizes.pixelRatio)  
  }


  update(){
    this.renderer.setViewport(0,0,this.sizes.width, this.sizes.heigth)
    this.renderer.render(this.scene,this.camera.ortographicCamera)
    //second screen
/*     this.renderer.setScissorTest(true)

    this.renderer.setViewport(
      this.sizes.width-this.sizes.width/3,
      this.sizes.heigth-this.sizes.heigth/3,
      this.sizes.width / 3,
       this.sizes.heigth / 3)

      this.renderer.setScissor(
        this.sizes.width-this.sizes.width/3,
        this.sizes.heigth-this.sizes.heigth/3,
        this.sizes.width / 3,
         this.sizes.heigth / 3) 
     
         this.renderer.render(this.scene, this.camera.perspectiveCamera)
    this.renderer.setScissorTest(false) */


  }


}
