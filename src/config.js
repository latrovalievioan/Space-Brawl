export default {
  view: {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    worldWidth: 1000,
    worldHeight: 500,
    resizeTo: window,
    centerOnResize: true,
  },
  backgroundImage: {
    scale: 1,
  },
  game: {
    width: 1000,
    height: 500,
    drag: false,
    pinch: true,
    decelerate: true,
    wheel: false,
  },
  scenes: {
    Splash: {
      hideDelay: 0,
    },
    Loading: {
      hideDelay: 0,
      backgroundBlur: 20,
      logoScale: 3.5,
      loadingBar: {
        x: 0,
        y: 0,
        width: 435,
        height: 45,
        radius: 50,
      },
      loadMeter: {
        x: -210,
        y: 0,
        width: 420,
        height: 32,
        radius: 50,
      },
    },
    Tutorial: {
      backgroundBlur: 20,
      keyImageScale: 0.7,
    },
  },
  assets: {
    root: "/",
  },
  planets: {
    blueBig: {
      image: "planet2",
      scale: 1,
      x: -729,
      y: -385,
      damage: 10,
      rocket: {
        body: {
          image: "rocket",
          scale: 1,
          x: -660,
          y: -65,
          angle: 100,
        },
        paths: [["M0.5 1L1093 165.5", "side"]],
      },
      rover: {
        body: {
          image: "rover",
          scale: 1,
          x: 43,
          y: 283,
          angle: 180,
        },
        shadow: {
          image: "shadow",
          scale: 1,
          x: 40,
          y: 220,
          angle: 180,
        },
        healthBar: {
          image: "health",
          scale: 1,
          x: 52,
          y: 358,
          angle: 180,
        },
        healthMeter: {
          image: "healthMeter",
          scale: 1,
          x: 52,
          y: 358,
          angle: 180,
          damage: 10,
        },
        health: {
          fullHealth: 100,
        },
      },
      shield: {
        activePart: {
          image: "shieldActive",
        },
        inactivePart: {
          image: "shieldInactive",
        },
        upperPart: {
          x: 83,
          y: 404,
          scale: 0.83,
          angle: 135,
        },
        lowerPart: {
          x: 183,
          y: 306,
          scale: 0.83,
          angle: 135,
        },
        hitBox: {
          upper: {
            rect1: {
              width: 20,
              height: 110,
              x: 127,
              y: 425,
              angle: 70,
            },
            rect2: {
              width: 20,
              height: 110,
              x: 33,
              y: 425,
              angle: 110,
            },
          },
          lower: {
            rect1: {
              width: 20,
              height: 110,
              x: 200,
              y: 260,
              angle: -25,
            },
            rect2: {
              width: 20,
              height: 110,
              x: 200,
              y: 350,
              angle: 25,
            },
          },
        },
      },
    },
    redBig: {
      image: "planet1",
      scale: 1,
      x: 508,
      y: 521,
      damage: 10,
      rocket: {
        body: {
          image: "rocket",
          scale: 1,
          x: 410,
          y: 80,
          angle: -70,
        },
        paths: [["M1093,165.5 L0.5,1", "side"]],
      },
      rover: {
        body: {
          image: "rover",
          scale: 1,
          x: -62,
          y: -398,
        },
        shadow: {
          image: "shadow",
          scale: 1,
          x: -60,
          y: -340,
          angle: 0,
        },
        healthBar: {
          image: "health",
          scale: 1,
          x: -72,
          y: -474,
          angle: 0,
        },
        healthMeter: {
          image: "healthMeter",
          scale: 1,
          x: -73,
          y: -474,
          angle: 0,
        },
        health: {
          fullHealth: 100,
        },
      },
      shield: {
        activePart: {
          image: "shieldActive",
        },
        inactivePart: {
          image: "shieldInactive",
        },
        upperPart: {
          x: -79,
          y: -519,
          scale: 0.83,
          angle: 315,
        },
        lowerPart: {
          x: -180,
          y: -420,
          scale: 0.83,
          angle: 315,
        },
        hitBox: {
          upper: {
            rect1: {
              width: 20,
              height: 110,
              x: -127,
              y: -535,
              angle: 70,
            },
            rect2: {
              width: 20,
              height: 110,
              x: -33,
              y: -535,
              angle: 110,
            },
          },
          lower: {
            rect1: {
              width: 20,
              height: 110,
              x: -200,
              y: -370,
              angle: -25,
            },
            rect2: {
              width: 20,
              height: 110,
              x: -200,
              y: -470,
              angle: 25,
            },
          },
        },
      },
    },
    smallBlue: {
      image: "planet3",
      scale: 1,
      x: -880,
      y: 467,
    },
    smallRed: {
      image: "planet4",
      scale: 1,
      x: 947,
      y: -570,
    },
  },
};
