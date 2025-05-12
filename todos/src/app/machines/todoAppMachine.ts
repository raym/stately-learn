import { assign, createMachine, fromPromise } from "xstate";

export const todosMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AFgBMjigA4t9gGyuA7AFYAGhAAT0QARgBmCgBORzDfPwBfRKChHAISTgl6UkYhNjAAJ0LUQoojABsVADNSgFsKNJFM8VocvJk5BSVzTV19SxNYMzVSSxsEW3jXCh8I+wj-INDJ13sKPx8tCLDHJOSg0nQ4SyaMsUHTXvG7ey23D28lkLsw6JmtLZ29g5Az0SybSk+Uuw2uSGstzCPgocQSy1eYS0Gy+u32qRk6QBgk6mGykFBIwsEImtjiLmeKzCbxiT3Rf0xzTE1CBuWkLEwAFFiqUCRChkSxiS7HE-BQkWE-J49giEH5orCwvY1ot9skgA */
  id: "Todo Machine",
  initial: "Loading Todos",
  types: {
    // events: {} as { type: 'Load Todos'; todos: string[] } | { type: 'Fail Loading Todos'; errorMessage: string },
    // typegen: {} as import ('./todoAppMachine.typegen').Typegen0
    actors: null! as {
      loadTodos: {
        input: void,
        output: string[],
        error: unknown,
      }
    }
  },
  context: {
    todos: [] as string[],
    errorMessage: undefined as string | undefined,
  },
  states: {
    "Loading Todos": {
      invoke: {
        src: 'loadTodos',

        onDone: {
          target: 'Todos Loaded',
          actions: 'assignTodosToContext',
        },

        onError: {
          target: "Loading Todos Errored",
          actions: 'assignErrorMessageToContext',
        }
      }
    },
    "Todos Loaded": {},
    "Loading Todos Errored": {}
  }
}, {
  actions: {
    assignTodosToContext: assign(({context, event}) => {
      return { todos: event.output }
    }),
    assignErrorMessageToContext: assign(({ context, event }) => {
      return { errorMessage: event.error.message }
    })
  },
  actors: {
    loadTodos: fromPromise(async () => {
      throw new Error('Oh no!')
      // await new Promise(r => setTimeout(r, 1000))
      // return ['Take bins out', 'Buy groceries']
    })
  }
})