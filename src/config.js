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
      title: {
        y: -300,
        scale: 0.6,
      },
      button: {
        y: 300,
      },
      arrowInstructions: {
        y: 130,
        x: 0,
      },
      arrows: {
        up: {
          x: -140,
          y: -30,
          scale: 0.2,
        },
        down: {
          x: 140,
          y: -30,
          scale: 0.2,
        },
      },
    },
    Win: {
      backgroundBlur: 20,
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
      damage: 1,
      rocket: {
        body: {
          image: "rocket",
          scale: 1,
          x: -660,
          y: -65,
          angle: 100,
        },
        flame: {
          scale: 0.23,
          x: 4,
          y: 65,
          angle: -95,
        },
        paths: [
          ["M0.5 1L1093 165.5", "side", 1.4],
          [
            "M15.0002,205 C-84.4998,623 372.607,797.003 538,205 C664,-246 1109.33,162.5 1110.5,362.5",
            "top",
            2.1,
          ],
          [
            "M0.5 329.5C265.5 343.167 843.1 319.9 1033.5 117.5C1271.5 -135.5 1382.5 45.5 704.5 440C162.1 755.6 737.5 605.5 1093 491",
            "side",
            2.8,
          ],
          [
            "M0.5 233.5C140.167 451.667 503.9 860.6 841.5 751C1263.5 614 30.5 206 600.5 34.5C1056.5 -102.7 1118.83 215.333 1093 391.5",
            "top",
            2.4,
          ],
          [
            "M1 190.5C239 84 711.1 -94 933.5 112C1211.5 369.5 944.5 -386 810.5 290.5C915.7 396.5 1060.33 387.5 1099.5 352.5",
            "side",
            2,
          ],
          [
            "M1 94.5L448 163.5L827 220C799.5 87.5 820.1 -58.2001 1030.5 24.9999C1144 145.5 1104.67 246.5 1094 253.5",
            "top",
            1.5,
          ],
          [
            "M0.5 0.5C289.667 109.667 861.1 309.5 833.5 235.5C805.9 161.5 695.667 134.667 644 130.5C579 152.5 485.5 222 631.5 324C777.5 426 1002 258.5 1096 162",
            "side",
            2,
          ],
          [
            "M1 220.5C302.167 68.1667 983.3 -156.2 1298.5 165C1613.7 486.2 1224.83 647.5 991 688C808.833 598.5 528.1 379.7 862.5 220.5C1280.5 21.5 1009.5 629.5 1095 378",
            "top",
            2.8,
          ],
        ],
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
          damage: 100,
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
      damage: 1,
      rocket: {
        body: {
          image: "rocket",
          scale: 1,
          x: 410,
          y: 80,
          angle: -70,
        },
        flame: {
          scale: 0.23,
          x: 4,
          y: 65,
          angle: -95,
        },
        paths: [
          ["M1093,165.5 L0.5,1", "side", 1.4],
          [
            "M1110.5 362.5C1109.33 162.5 664 -246 538 205C372.607 797.003 -84.4998 623 15.0002 205",
            "top",
            2.1,
          ],
          [
            "M1090.5 197C894.665 335 420.8 567 91.9996 391C-319 171 1035.5 346 317.5 49C175.898 -9.57361 54.8213 -0.236348 0.5 3.49998",
            "side",
            2.6,
          ],
          [
            "M1108.5 149H494.5C431.167 164.333 266.8 128.6 276 63C285.2 -2.6 401 4.33333 436.5 9C508.667 63.8333 488.7 119.9 235.5 209.5C-17.7 299.1 -16.3333 107.833 16 1",
            "top",
            2.2,
          ],
          [
            "M1073 465.5C1029.83 306.167 922.7 -9.79999 839.5 1.00001C756.3 11.8 547.5 495.833 453.5 736.5C458.5 540.833 434.2 180.3 297 303.5C159.8 426.7 42.5 321.833 1 254",
            "side",
            3,
          ],
          [
            "M1474 564C1400.83 324.667 1083.5 -117.2 399.5 30C-284.5 177.2 63.8334 530.333 323.5 688.5C523.667 716.667 883.3 708.5 720.5 450.5C517 128 614 1282 380 403.5",
            "top",
            3.6,
          ],
          [
            "M1094.5 555.5C875.167 322.5 372 -109.4 114 27C-208.5 197.5 794.5 144.5 360 382.5C85.6 392.5 6 394 0.5 393.5",
            "side",
            2,
          ],
          [
            "M1106.5 154L323.5 239.5C207.167 232.667 -19.9 175.3 2.5 0.5",
            "top",
            1.4,
          ],
        ],
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
