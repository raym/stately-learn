import { assign, createMachine, fromPromise } from "xstate";

const todos = new Set<string>(['Take bins out', 'Buy groceries'])

export const todosMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AJi0BmCs4CMADk8AWAOxOtbw8nJwAaEABPO08tVzctADZ7X197BJSnNwBWAF8c8KEcAhJOCXpSRiE2MAAnGtQaiiMAGxUAMwaAWwpCkRLxWnLKmTkFJXNNXX1LE1gzNVJLGwRbbwBONYosrSz7NzWPDezvZPCohCdfCn8Pey97XPyQXuKxHpHMMshWAGEasBUYEw5AA7tMkCBZvMLBDlm4Et4thtfOssgl4VotPZ7Gc7FcDgj7Jdsd4kk4DnkCjIiqJOFVPoNvgARMDNMDKIHKGTg4ymCZLRCOWJuJxpBJZEXpXzirK4lYBFzxNzeFXJJwnUmU57UvpvP4A1QVYFgEGYLkYCgAZUIqBBUg6NU6mDIRgArspWAAxLrO0hu5SYIi4CqQHmQvkLAUrNZuCjrLQeYIqzzKrKyyKC9IUZIJQKXXZrNJuXxal60yj6lRSUFmmRWm12o0Op0u92sS2ugBGnTMYah-NhmfsFCl0vsa0y-kScvsfmzIqy3gCiTShwSpZ1r04lcNjBr5tQVtw3CkB-Y6koCgE7wwNP6FB31ZNtYtluPp5k8lIvHGC30fYjGFQGWPxYxCLIp0XDwJRxDMEHHWNfF2LIvDWBJ0OcJwN1vXVt3+KsjX3Os3xPI0z1qepGhadouhvYQtwrfDd2NU0DyPUjGAPL8fyrdR-10GZAMWQcEG8NMtnHUUNnHbwtAOXw5SXBIthQhIQg8dEAhjbD6PLCgWTZZizw4S9v34QRNz0gz2Q-DBuMUXjJj0ASIX7SMRMuWIdnhW4QhSeE0TlBwThHbFJSXA5yXQnS7zeayjJkVgKIaJpWmUZs6Nizh4ts1B7N-Piphc3k5gHYDECQrIKFuZJAg8UkUSxIKfJHFdEi0Nx9g67wYtwyh4s5alkv+CBWCsWBlEBChcDaDkagACgeTEAEpWDLe8BpfLBhtDYrw1K9zyoQXNNl8eIvA8aVvLTILvFjfZghQtFSXFW4eqeda4tZdlBtvHbRqZYhYB7WBYEwYaAIOoDrEQLI1iuMSEhjRwnCSdIPDlS5qrQlVUixPwZLyJ5SHQOBLE+8hBKh4SjtsRcrm2XYHqORcwjg2xyViXNlUyEUUfhx4qRwhjqEGKQqip6EaZhlZ1kQ+q0l8NZZOLIkEma3YKCcFC1jktSOonQtepF+kvggSWyplnxXHhtTRVXM7sg1jwtnVRIsm1tFEjcY29LKcWPgAUTqBpIAtw6ZdWW4taxOSghZpc5WLKrfD18kkOxA37F9+9H0I58D3D6HllsEVNnjRN1TurxEaT7Jrlx4I0PkhN3qF3Tc6Yp9WOIht7R9VtlCL6Xll8F2sQ2Rc7ru9q2fOFHs1xws0kyTEPBzvUu-znvX3fMiZGHqNVxttCQnQjOzsxpctbEhM0M8DP1w+yyNu+hKMEPkSIMRZd0O1+rdgY3ZuOZSCQvDqnquSNMyssLP2FlZN+v1tohxGp-I6HhEiuHqo7JWU5laY2zOiZWyIDi2yXI8PIQA */
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
      },
      saveTodo: {
        input: void,
        output: void,
        error: unknown,
      },
      deleteTodo: {
        input: {
          todo: string,
        },
        output: void,
        error: unknown,
      },
    },
    events: {} as {
      type: 'Create new'
    } | {
      type: 'Form input changed',
      value: string,
    } | {
      type: 'Submit',
    } | {
      type: 'Delete todo',
      todo: string,
    } | {
      type: 'Dismiss error',
    }
  },
  context: {
    todos: [] as string[],
    errorMessage: undefined as string | undefined,
    createNewTodoFormInput: '' as string,
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

    "Todos Loaded": {
      on: {
        "Create new": "Creating new todo",
        "Delete todo": "Deleting todo"
      }
    },

    "Loading Todos Errored": {},

    "Creating new todo": {
      states: {
        "Showing form input": {
          on: {
            "Form input changed": {
              target: "Showing form input",
              actions: 'assignFormInputToContext',
            },

            Submit: "Saving todo"
          }
        },

        "Saving todo": {
          invoke: {
            src: 'saveTodo',
            input: ({ context }) => ({
              createNewTodoFormInput: context.createNewTodoFormInput,
            }),

            onError: {
              target: "Showing form input",
              reenter: true,
              actions: 'assignErrorMessageToContext',
            },

            onDone: "#Todo Machine.Loading Todos"
          },
        }
      },

      initial: "Showing form input"
    },

    "Deleting todo": {
      invoke: {
        src: 'deleteTodo',

        input: ({ event }) => ({todo: event.todo}),

        onDone: {
          target: "Loading Todos",
          reenter: true
        },

        onError: {
          target: "Delete todo errored",
          actions: 'assignErrorMessageToContext',
        }
      }
    },

    "Delete todo errored": {
      after: {
        "2500": "Todos Loaded"
      },

      on: {
        "Dismiss error": "Todos Loaded"
      }
    }
  }
}, {
  actions: {
    assignTodosToContext: assign(({context, event}) => {
      return { todos: event.output }
    }),
    assignErrorMessageToContext: assign(({ context, event }) => {
      return { errorMessage: event.error.message }
    }),
    assignFormInputToContext: assign(({ context, event }) => {
      return { createNewTodoFormInput: event.value }
    })
  },
  actors: {
    loadTodos: fromPromise(async () => {
      // throw new Error('Oh no, could not load todos!')
      await new Promise(r => setTimeout(r, 400))
      return Array.from(todos)
    }),
    saveTodo: fromPromise(async (context) => {
      // throw new Error('Oh no, could not save todo!')
      // set todos -- it will be reloaded in the next state
      return todos.add(context.input.createNewTodoFormInput)
    }),
    deleteTodo: fromPromise(async (context) => {
      throw new Error('Oh no, could not delete todo!')
      // return todos.delete(context.input.todo)
    })
  }
})