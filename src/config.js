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
      hideDelay: 1000,
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
  },
  assets: {
    root: "/",
  },
};
