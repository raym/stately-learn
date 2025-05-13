'use client';

import { useActor } from "@xstate/react";
import { todosMachine } from "./machines/todoAppMachine";

export default function Home() {
  const [state, send] = useActor(todosMachine)
  return (
    <div>
      <pre>{JSON.stringify(state.value, null, 2)}</pre>
      <pre>{JSON.stringify(state.context, null, 2)}</pre>
      {state.matches('Todos Loading') && (
        <div>Loading...</div>
      )}
      {state.matches('Todos Loaded') && (
        <div>
          {state.context.todos.map((todo) => (
            <div key={todo}>
              <div>
                {todo}{' '}
                <button onClick={() => send({type: 'Delete todo', todo})}>&times;</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        {state.matches('Todos Loaded') && (
          <>
          <button onClick={() => send({type: 'Create new'})}>
            Create new
          </button>
          </>
        )}
        {state.matches('Delete todo errored') && (
          <div>
            Error deleting todo: {state.context.errorMessage}
            <button onClick={() => send({type: 'Dismiss error'})}>
              Dismiss
            </button>
          </div>
        )}
        {state.matches('Creating new todo.Showing form input') && (
          <form onSubmit={(e) => {
            e.preventDefault()
            send({type: 'Submit'})
          }}>
            <input
              type="text"
              value={state.context.createNewTodoFormInput}
              onChange={(e) => send({
                type: 'Form input changed',
                value: e.target.value,
              })}
            />
          </form>
        )}
      </div>
    </div>
  );
}
