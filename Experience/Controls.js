import * as THREE from "three";
import Experience from "./Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.tr = this.experience.world.tr.actualTr;
    this.tr.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });

    this.circle1 = this.experience.world.floor.circle1

    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector('.page').style.overflow = 'visible'

    this.setSmoothScroll()
    this.setScrollTrigger();
  }

  setupASScroll() {
    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true
    });
  
  
    GSAP.ticker.add(asscroll.update);
  
    ScrollTrigger.defaults({
      scroller: asscroll.containerElement });
  
  
    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      fixedMarkers: true });
  
  
    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);
  
    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
  
    });
    return asscroll;
  }

  setSmoothScroll(){
    this.asscroll = this.setupASScroll()
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // desktop
      "(min-width: 969px)": () => {
        //console.log("fired desktop");

        // first section .........................
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.firstMoveTimeline.to(this.tr.position, {
          x: () => {
            return this.sizes.width * 0.0019;
          },
        });

        /* second section ---------------------------- */

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            //markers: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

          .to(
            this.tr.position,
            {
              x: () => {
                return -this.sizes.width * 0.00165;
              },
              z: () => {
                return this.sizes.heigth * 0.0022;
              },
              delay: 0.3,
            },
            "same"
          )

          .to(
            this.tr.scale,
            {
              x: 0.09,
              y: 0.09,
              z: 0.09,
              delay: 0.3,
            },
            "same"
          )

          .to(
            this.rectLight,
            {
              width: 0.5 * 29,
              heigth: 0.7 * 9,
            },
            "same"
          );
      },
      // mobile
      "(max-width: 968px)": () => {
        //console.log("mobile");

        //reset
        this.tr.scale.set(0.05,0.05,0.05)

        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.tr.scale, {
          x: 0.07,
          y: 0.07,
          z: 0.07
        })

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            //markers: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      },

      // all
      all:  () => {
        //
      },
    });
  }

  resize() {}

  update() {}
}
