'use client';

import { useActor } from "@xstate/react";
import { todosMachine } from "./machines/todoAppMachine";

export default function Home() {
  const [state, send] = useActor(todosMachine)
  return (
    <div>
      <pre>{JSON.stringify(state.value, null, 2)}</pre>
      <div>
        <button onClick={() => send({ type: 'Load Todos', todos: ['Take bins out', 'Buy groceries'] })}>Load Todos</button>
      </div>
      <div>
        <button onClick={() => send({ type: 'Fail Loading Todos', errorMessage: 'Oh no!' })}>Fail Loading Todos</button>
      </div>
    </div>
  );
}
