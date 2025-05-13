import { assign, createMachine, fromPromise } from "xstate";

const todos = new Set<string>()//['Take bins out', 'Buy groceries'])

export const todosMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AJgAsARgoBWZ-YDMbr84BsAOwAHMH2YQA0IACedvbOXu4AnMGO9klJzs7Bbm4AvnlRQjgEJJwS9KSMQmxgAE51qHUURgA2KgBmTQC2FMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CLaOGe5abvEpGc5uaYFRsQhegRSBXmHBnvmFIP2lYn1jmBWQrADCdWAqYJhyAB3WZIEDzRYWMGrAKOZJJQIbNz+AJaLT2ewnOwXFL+NLnDGOfzeFIFIoyEqiTg1d7DT4AETArTAygByhkoOMpimK0Q9jRFAS9n8-g8XiCgVFbixay8WkSzi0zkcKvsVzSRLJjwpAxePz+qiqgLAQMw7IwFAAyoRUECpF06t1MGQjABXZSsABiPWdpDdykwRFwVUgnPB3KWvLWmQoGy0oS8KuyytyMuFFzV-i0jnOOySwucgS1TyplH1KikwLNMitNrtRodTpd7tYltdACNumYwxCedC+cSKBLJek-FctP4044MwlDnKJ8Lgkl-MWdc9OOXDYwq+bUFbcNwpLv2OpKAoBK8MJTBhRN5WTdWLZaD0eZPJSLxJkt9D2I1DQKs06uF4PjjocOSeGmMaBDsbi3MuIryl4q5XrqG6-BWRo7jWz6Hkax71I0zRtJ0PSXsI65lhhW7Gqau77nhjC7u+n4VuoP66HMf7LP2CCOLk7ijuk+ZJI4WgpMcMSIDm-juHB-ggcEKJypkKEUaWFCMsyNHHhwZ4fvwghrhpWksq+GAsYobHTHonFgr2ka8ecWgUNsARhCBgSBAEyIyg4aRDhiCR4l4KShSKanXi8pk6TIrCEU0LTtMojbkVFnAxeZqCWV+7EzHZXILH2AGIDBbgUGEarZqkQRiZiUlrO5Q4LhOSrOEkSqOJFaGUDFbIUglvwQKwViwMo-wULgHSsnUAAU9huGiACUrAljefWPlgg2hgV4ZFY5JUIFmSSXIqtzBJKbmpg16yuO1wQ+DkeIinBTjdZRmlMiy-VXttw30sQsBdrAsCYINv77f+1iIG4CKxsimT8uK6bBDK5wVcuKqBPyTjY6J70aRUUg1CenDnkZqEfUTRo1Dl1k-s4Bj2dxUYOPyFXiqk8aBJk+bXacthZIk2NKaKRLxMESoFA8pDoHAlhrWIXGQzxh22IcFyLTs937HOfmhS5WbKn4Qrygi9zkpThPDMTYzK5CqvQ2sGyuCEaRBKJSrY+KfkHPYFCPR1y5yu1oX2ATN40h8ED28VTvZHC4mSiBGL+BdWTSjdBzBO4iYTr4uRZiiEcvNTowsJgACiDRNJAscHU76xhAH6LiY4S6ZHrDWFuVgTiQp5sYkq+Yl+hBr3nRMj11DqyC6FsYdQmSa3Pxk7dwclxYw9y4SfGXUPIrY+YduD70datr2j6zbKNPjurCErnCYcLguK1XhpvKFBONO+bCn4aLBFHlRceWFT44RfPhKezMVZRkXK5DIClxRBB2N5NGOYA78XjMubIMFhRAM+tpLKt8oxuERC3CcCk4L8XCH5dIsk04JHbjmJIuRRLIQPsZdaX1WSbTBjXIaxDeKS1knvbyhYEQqUcGjL+KJRIZB5kuSUOZ7gFCAA */
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

        onDone: [{
          target: 'Todos Loaded',
          actions: 'assignTodosToContext',
          guard: "hasTodos"
        }, {
          target: "Creating new todo",
          reenter: true
        }],

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
      // throw new Error('Oh no, could not delete todo!')
      return todos.delete(context.input.todo)
    })
  },
  guards: {
    hasTodos: ({event}) => event.output.length > 0
  },
})