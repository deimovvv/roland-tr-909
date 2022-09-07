import * as THREE from 'three'
import Sizes from "./utils/Sizes.js"
import Time from "./utils/Time.js"
import Camera from './Camera.js'
import Theme from './Theme.js'
import Renderer from './Renderer.js'
import World from './world/World'
import Resources  from './utils/Resources'
import assets from './utils/assets.js'
import Preloader from './Preloader'
import Controls from './Controls'
//import Controls from './Controls.js'




export default class Experience{
    static instance 
    constructor(canvas){

        if(Experience.instance){
            return Experience.instance
        }

        Experience.instance = this

        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.sizes = new Sizes()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(assets)
        this.theme = new Theme()
        this.world = new World()
        this.preloader = new Preloader()

        this.preloader.on("enablecontrols", () => {
            this.controls = new Controls()
        } )
        

      
        this.sizes.on("resize", () => {
            this.resize()
        })

        this.time.on('update', () => {
            this.update()
        })


    }

    resize(){
        this.camera.resize()
        this.world.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}