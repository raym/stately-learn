import { createMachine } from "xstate";

export const todosMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxDXU+qrANoAMAXUSgADj2IAXYqlIiQAD0QBaAMwBOACwV+AVgAcu9aoDsugDQgAnioCM-CgCYTqzad0BfD5eZY8RMkoOelJGXzYAMVxiABtMYIYuFgFhJBBxWCkZOTSlBGVHXVUnTQA2fmMzSxt821tSijqTW30zL28QUnQ4eV8cAhJyeQys2Xk85TLdChNHR1LdUsLqlUd+Yv1S5tbPDr7-QaDaELDueDSR6THclU1bExm5haWLazt7ilUtlra97n6AuQKOF4sdIMMJFccqAJqo9CVHD9XjVWhR1Iidl4fP8DoFqMdEiCAKIAJxJqBJ4IukOy4zsjlUK3yqmK6lKmPaQA */
  id: "Todo Machine",
  initial: "Loading Todos",
  states: {
    "Loading Todos": {
      on: {
        "Load Todos": "Todos Loaded",
        "Fail Loading Todos": "Loading Todos Errored"
      }
    },

    "Todos Loaded": {},
    "Loading Todos Errored": {}
  }
})