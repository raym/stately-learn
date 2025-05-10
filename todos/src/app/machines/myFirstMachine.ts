import { createMachine } from "xstate";

export const myMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXACXIDcwAnSAYgFkB5AVQGUBRDgDU+AJQDaABgC6iUAAdysXJVzl8skAA9EAJgkSSAFgCcOgIwAOAOwBWADQgAnojMBmCyQlmbANh02AXwCHNCw8QlJseiZWTl4BLgAVSRkkEAUlFTUNbQRzHxJXH1cdCzN-B2cEMwKbMzMrS1sg4JAKCDgNUJwCYg0M5VV1NNyAWh9KxFGrA2MLC1LywNbu8OIyKloGZgh+xUHskcRDHUmEMpJlkIweiJIo7cg9zKGcxHcCnwkbQx9reyciAuyyCQA */
  initial: "notHovered",
  states: {
    notHovered: {
      on: {
        MOUSEOVER: {
          target: 'hovered',
        }
      }
    },
    hovered: {
      on: {
        MOUSEOUT: {
          target: "notHovered",
        }
      }
    },
  }
})