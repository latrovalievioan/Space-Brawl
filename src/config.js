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
      scale: 0.8,
      x: -580,
      y: -300,
      rover: {
        body: {
          image: "rover",
          scale: 1,
          x: 40,
          y: 280,
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
        },
      },
    },
    redBig: {
      image: "planet1",
      scale: 0.8,
      x: 410,
      y: 425,
      rover: {
        body: {
          image: "rover",
          scale: 1,
          x: -60,
          y: -400,
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
        },
      },
    },
    smallBlue: {
      image: "planet3",
      scale: 0.8,
      x: -700,
      y: 380,
    },
    smallRed: {
      image: "planet4",
      scale: 0.8,
      x: 760,
      y: -446,
    },
  },
};
