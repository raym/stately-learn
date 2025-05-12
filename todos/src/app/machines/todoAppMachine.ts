import { createMachine, fromPromise } from "xstate";

export const todosMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AFgCMAdgoA2ZwE43ADmcBWABoQAE9EAGZwimcY8PtwgIBfROChHAISTgl6UkYhNjAAJ0LUQoojABsVADNSgFsKNJFM8VocvJk5BSVzTV19SxNYMzVSSxsEWz8KHzdwgCYfR3mg0LtPKNnnRz9-ZJSQUnQ4SyaMsUHTXvG7ezd-aPn5+7cV4LDJ+a17GY8dpIOZ1EWTaUnyl2G1yQ1luLkez38r1WH1sjjh4T+u2SqRk6WBgk6mGykAhIws0ImtnmjiiK3Cni0SPeiDRURc-z2gNxzTE1FBuWkLEwAFFiqUSdChmSxhS7K8KP4fJ4fPEAsyENSKE8EUj9okgA */
  id: "Todo Machine",
  initial: "Loading Todos",
  types: {
    events: {} as { type: 'Load Todos'; todos: string[] } | { type: 'Fail Loading Todos'; errorMessage: string },
    // typegen: {} as import ('./todoAppMachine.typegen').Typegen0
    actors: null! as {
      loadTodos: {
        input: void,
        output: string[],
        error: unknown,
      }
    }
  },
  states: {
    "Loading Todos": {
      invoke: {
        src: 'loadTodos',

        onDone: {
          target: 'Todos Loaded',
        },

        onError: {
          target: "Loading Todos Errored",
        }
      }
    },
    "Todos Loaded": {},
    "Loading Todos Errored": {}
  }
}, {
  actors: {
    loadTodos: fromPromise(async () => {
      await new Promise(r => setTimeout(r, 1000))
      return ['Take bins out', 'Buy groceries']
    })
  }
})