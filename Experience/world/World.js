import * as THREE  from "three"
import Experience from "../Experience";
import Tr09  from './Tr09'
import Environment from './Environment'
import Controls from '../Controls'
import Floor from './Floor'
import EventEmitter from "events";



export default class World extends EventEmitter{
  constructor() {
    super()
    this.experience = new Experience();
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera   
    this.resources = this.experience.resources
    this.theme = this.experience.theme


    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.floor = new Floor()
      this.tr = new Tr09()
      this.controls = new Controls()
      this.emit("worldready")

    })
    
    this.theme.on('switch', (theme) => {
      theme = this.theme.theme
      this.switchTheme(theme)
    })
 
    
  
  }


  switchTheme(theme) {
    if(this.environment) {
      this.environment.switchTheme(theme)
    }
    
  }

  

  resize(){
  }


  update(){

      if(this.tr){
        this.tr.update()
        
      }

      if(this.controls){
        this.controls.update()
      }
    
  }


}
