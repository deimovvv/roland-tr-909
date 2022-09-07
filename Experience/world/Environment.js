import * as THREE  from "three"
import Experience from "../Experience";
import GSAP from 'gsap'
import GUI from 'lil-gui'

export default class Tr09{
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    //this.gui = new GUI({ container: document.querySelector(".hero-main")} )
    this.obj = {
      colorObj: {r: 0, g: 0, b: 0},
      intensity: 3, 
    }
    
    this.setAreaLight()
    this.setSunLight()
    // this.setGUI()
   

  
  }

  setGUI(){
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj)
      this.ambient.color.copy(this.obj.colorObj)
    })
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity
      this.sunLight.ambient = this.obj.intensity

    })
  }

  setAreaLight(){
    this.area = new THREE.RectAreaLight('#fff', 0.8)
    this.scene.add(this.area)
    this.area.position.set(0,0,4)
    this.area.rotation.set(0,0,-2)
  }

  setSunLight(){
    this.sunLight = new THREE.DirectionalLight('#fff', 5)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 10;
    this.sunLight.shadow.mapSize.set = (1024,1024)
    this.sunLight.shadow.normalBias = 0.05
    //this.helper = new THREE.CameraHelper( this.sunLight.shadow.camera)
    //this.scene.add(this.helper)
    this.sunLight.position.set(1.5,7,3)
    this.scene.add(this.sunLight)


    const ambient = new THREE.AmbientLight('#fff', 0.6)
    this.scene.add(ambient)






  }

   switchTheme(theme){
    if(theme === "dark"){
      GSAP.to(this.sunLight.color, {
          r: 0 /  255,
          g: 0 /  255,
          b: 0 / 255
      })
      GSAP.to(this.ambient.color, {
        r: 0 /  255,
        g: 0 /  255,
        b: 0 / 255
    })
    GSAP.to(this.sunLight, {
      intensity: 0.2
  })
  GSAP.to(this.ambient, {
    intensity: 0.2
})
    } else{

      GSAP.to(this.sunLight, {
        intensity: 2
    })
    GSAP.to(this.ambient, {
      intensity: 2
  })

      GSAP.to(this.sunLight.color, {
        r: 255  / 255,
        g: 255 / 255,
        b: 255 / 255
    })

    GSAP.to(this.ambient.color, {
      r: 255 / 255,
      g: 255 / 255,
      b: 255 / 255
  })
    }
  }
 
  resize(){
  }


  update(){
  }


}
