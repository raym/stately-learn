'use client';

import { useMachine } from "@xstate/react";
import { todosMachine } from "./machines/todoAppMachine";

export default function Home() {
  const [state, send] = useMachine(todosMachine)
  return (
    <div>
      <pre>{JSON.stringify(state.value, null, 2)}</pre>
      <div>
        <button onClick={() => send({ type: 'Load Todos' })}>Load Todos</button>
      </div>
      <div>
        <button onClick={() => send({ type: 'Fail Loading Todos' })}>Fail Loading Todos</button>
      </div>
    </div>
  );
}
