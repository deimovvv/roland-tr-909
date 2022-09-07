import EventEmitter from "events";
import Experience from "./Experience.js";
import GSAP from 'gsap'
import convert from './utils/covertDivsToSpans'



export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.world = this.experience.world
    this.device = this.sizes.device

    

    this.sizes.on("switchdevice", (device) => {
          this.device = device
    })

    this.world.on('worldready', () => {
        this.setPlane()
        this.playIntro()
    })
  }

  setPlane(){
    convert(document.querySelector(".intro-text"))
    convert(document.querySelector(".hero-main-title"))
    convert(document.querySelector(".hero-main-description"))
    convert(document.querySelector(".hero-second-subheading"))
    convert(document.querySelector(".second-sub"))


    this.plane = this.experience.world.tr.planeIntro
    this.tr = this.experience.world.tr.actualTr

    }

    firstIntro(){
      return new Promise((resolve) => {
        this.timeline = new GSAP.timeline()
       

      if(this.device === "desktop" || this.device === "mobile"){
        this.timeline.to(this.plane.scale, {
          y: 2,
          x: 2,
          z: 2,
          ease: "back.out(.5)",
          duration: 2,
          onComplete: resolve

        } )
        this.timeline
        .to(".intro-text .animatedis", {
          yPercent: -100,
          stagger: 0.04,
          ease: "back.out(2.7)",
          } )
/* 
          .to(".arrow-svg-wrapper", {
            opacity: 1,
            },"same" ) */
            .to(".btn", {
              opacity: 1,
              },"same" )

            .to(".toggle-bar", {
              opacity: 0,
              onComplete: resolve
              }, "same")
            }

      } )
    } 

    secondIntro(){
      return new Promise((resolve) => { 
        this.secondTimeline = new GSAP.timeline()
        this.secondTimeline
        .to(".intro-text .animatedis", {
          yPercent: 100,
          stagger: 0.04,
          ease: "back.in(1.7)",
        
        } , "fadeout")
       /*  .to(".arrow-svg-wrapper", {
          opacity: 0,
          }, "fadeout" ) */
          .to(".btn", {
            opacity: 0,
            }, "fadeout" )
            .to(".toggle-bar", {
              opacity: 1,
              
              }, "same")
            
        .to(this.plane.scale, {
          y: 0,
          x: 0,
          z: 0,
          //ease: "back.out(1.7)",
          duration: 0.
        } )

    

       

        .to(".hero-main-title .animatedis", {
          yPercent: -100,
          stagger: 0.07,
          ease: "back.out(1.7)",
          }, "same" )  
          .to(".hero-main-description .animatedis", {
            yPercent: -100,
            stagger: 0.07,
            ease: "back.out(1.7)",
            }, "same" ) 
            .to(".hero-second-subheading .animatedis", {
              yPercent: -100,
              stagger: 0.07,
              ease: "back.out(1.7)",
              }, "same" ) 
              .to(".second-sub .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(1.7)",
                }, "same" ) 

               
      
      })
     
    } 

   
    /* onScroll(e){
      if(e.deltaY < 0){
        
        this.removeEventListeners()
        this.playSecondIntro()
        
      }
    } */

    onClick(e){
      //(e);
      this.removeEventListeners()
      this.playSecondIntro()
    }

   /*  onTouch(e){
      this.initalY = e.touches[0].clientY
    } */

    /* onTouchMove() {
      let currentY = e.touches[0].clientY
      let difference = this.initalY - currentY
      if(difference > 0){
        console.log('swipper up');
        this.removeEventListeners()
        this.playSecondIntro()

      }
      this.initalY = null

    } */

    removeEventListeners(){
      window.removeEventListener("wheel", this.scrollOnceEvent )
      window.removeEventListener("click", this.clickEvent ) 

     /*  window.removeEventListener("touchstart", this.onTouch) 
      window.removeEventListener("touchmove", this.onTouchMove )  */
    }

  async playIntro(){
    await this.firstIntro()   

    //this.scrollOnceEvent = this.onScroll.bind(this)
    this.clickEvent = this.onClick.bind(this)

/*     this.touchStart = this.onTouch.bind(this)
    this.touchMove = this.onTouchMove.bind(this) */

    window.addEventListener("wheel", this.scrollOnceEvent ) 
    window.addEventListener("click", this.clickEvent ) 
  /*   window.addEventListener("touchstart", this.onTouch) 
    window.addEventListener("touchmove", this.onTouchMove )  */

  }

 

  async playSecondIntro(){
    await this.secondIntro()
    this.emit("enablecontrols")
  }

  
  

  resize(){
    /* this.firstIntro() */
    
  }

}
