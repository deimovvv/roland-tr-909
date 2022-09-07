
import {EventEmitter }from 'events'

export default class Time extends EventEmitter{
    constructor(){
        super()
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0; // tiempo que paso desde que empezo la experiencia
        this.deltaTime = 16;  // tiempo entre cada frame

        this.update();
    }

    update(){   

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime; 
        this.elapsed = this.current - this.start;

        

        this.emit("update")
        window.requestAnimationFrame(() => { this.update() })

    }
}